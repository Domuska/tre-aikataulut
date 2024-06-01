"use server";

import { revalidatePath } from "next/cache";
import { xml2js } from "xml-js";
import { z } from "zod";

// example xml request
const xmlSchema = `<?xml version="1.0" encoding="UTF-8"?>
<Siri xmlns="http://www.siri.org.uk/siri" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.3" xsi:schemaLocation="http://www.kizoom.com/standards/siri/schema/1.3/siri.xsd">
	<ServiceRequest>
		<StopMonitoringRequest version="1.3">
			<PreviewInterval>PT30M00S</PreviewInterval>
			<MonitoringRef>0015</MonitoringRef>
		</StopMonitoringRequest>
		<StopMonitoringRequest version="1.3">
			<PreviewInterval>PT30M00S</PreviewInterval>
			<MonitoringRef>0504</MonitoringRef>
		</StopMonitoringRequest>
	</ServiceRequest>
</Siri>`;

const createStopsRequestBody = (stopIds: string[]) => {
  const stopMonitoringRequests = stopIds.map(
    (stopId) => `<StopMonitoringRequest version="1.3">
      <PreviewInterval>PT30M00S</PreviewInterval>
      <MonitoringRef>${stopId}</MonitoringRef>
    </StopMonitoringRequest>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?><Siri xmlns="http://www.siri.org.uk/siri" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.3" xsi:schemaLocation="http://www.kizoom.com/standards/siri/schema/1.3/siri.xsd">
      <ServiceRequest>
        ${stopMonitoringRequests.join("")}
      </ServiceRequest>
    </Siri>
  `;
};

type Coordinates = {
  longitude: string;
  latitude: string;
};

type StopInfo = {
  location: string;
  name: string;
  shortName: string; // same as id?
  tariffZone: string;
};
export type MonitoredStopVisitResponse = z.infer<
  typeof MonitoredStopVisitSchema
>;

const MonitoredStopVisitSchema = z.object({
  MonitoringRef: z.object({ _text: z.string() }),
  MonitoredVehicleJourney: z.object({
    VehicleLocation: z
      .object({
        longitude: z.object({ _text: z.string() }).optional(),
        latitude: z.object({ _text: z.string() }).optional(),
      })
      .optional(),
    LineRef: z.object({ _text: z.string() }),
    VehicleRef: z.object({ _text: z.string() }).optional(),
    MonitoredCall: z.object({
      ExpectedArrivalTime: z.object({ _text: z.string() }),
      ExpectedDepartureTime: z.object({ _text: z.string() }),
      VehicleAtStop: z.object({ _text: z.string() }),
      ArrivalStatus: z.object({ _text: z.string() }),
    }),
    OnwardCalls: z.any(),
  }),
  StopVisitNote: z.object({ _text: z.string() }), // name of the stop
});
const ServiceDeliverySchema = z.object({
  StopMonitoringDelivery: z.object({
    // multiple incoming vehicles
    MonitoredStopVisit: z.array(MonitoredStopVisitSchema),
  }),
});

export async function fetchStopTimetableXML(stopIds: string[]) {
  const url = "https://data.waltti.fi/tampere/api/sirirealtime/v1.3/ws";
  const body = createStopsRequestBody(stopIds);
  console.log("body", body);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
      Authorization: `Basic ${process.env.nysse_gtfs_realtime_base64_token}`,
    },
    body,
  });

  if (!response.ok) {
    console.log("request failed", response.status, response.statusText);
  }

  const data = await response.text();
  const json = xml2js(data, {
    compact: true,
    // nativeType: true,
    ignoreAttributes: true,
  }) as any;
  try {
    const validatedData = ServiceDeliverySchema.parse(
      json.Siri.ServiceDelivery
    );
    return validatedData.StopMonitoringDelivery.MonitoredStopVisit;
  } catch (error) {
    console.log("error", error);
    throw new Error("Received invalid data");
  }
}

export async function fetchStopInfo(stopId: string): Promise<StopInfo> {
  // https://wiki.itsfactory.fi/index.php/Journeys_API
  const response = await fetch(
    `https://data.itsfactory.fi/journeys/api/1/stop-points/${stopId}`
  );

  const data = await response.json();

  revalidatePath("/");
  return data.body[0];
}
