import { revalidatePath } from "next/cache";

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

type MonitoredVehicleJourney = {
  VehicleLocation: Coordinates;
  LineRef: { _text: string };
  VehicleRef: { _text: string };
  MonitoredCall: {
    ExpectedArrivalTime: { _text: string };
    ExpectedDepartureTime: string;
    VehicleAtStop: boolean;
    ArrivalStatus: string;
  };
  OnwardCalls: any; // todo typing?
};

type MonitoredStopVisit = {
  MonitoringRef: { _text: string }; // id of the stop
  MonitoredVehicleJourney: MonitoredVehicleJourney;
  StopVisitNote: string; // name of the stop?
};

type StopMonitoringDelivery = {
  StopMonitoringDelivery: {
    MonitoredStopVisit: Array<MonitoredStopVisit>;
  };
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
  const queryParam = stopIds.join(",");
  const response = await fetch(
    `https://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops=${queryParam}`
  );

  const data = await response.json();

  revalidatePath("/");
  return data;
}
