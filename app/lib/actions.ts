"use server";

import { revalidatePath } from "next/cache";

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

type Coordinates = {
  longitude: string;
  latitude: string;
};

export type StopObject = {
  vehicleLocation: Coordinates;
  lineRef: string;
  vehicleRef: string;
  call: {
    vehicleAtStop: boolean;
    expectedArrivalTime: string;
    expectedDepartureTime: string;
    arrivalStatus: string;
  };
};

export type StopInfo = {
  location: string;
  name: string;
  shortName: string; // same as id?
  tariffZone: string;
};

export async function fetchStopTimetable(stopId: string): Promise<any> {
  if (!stopId) {
    throw new Error("Stop id is required");
  }
  // https://wiki.itsfactory.fi/index.php/Journeys_API
  const response = await fetch(
    `https://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops=${stopId}`
  );

  const data = await response.json();

  revalidatePath("/");
  return data;
}

export async function fetchStopTimetables(stopIds: string[]): Promise<any> {
  // https://wiki.itsfactory.fi/index.php/Journeys_API
  const response = await fetch(
    "https://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops=0835,0836"
  );

  const data = await response.json();

  revalidatePath("/");
  return data;
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
