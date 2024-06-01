import { StopObject, fetchStopTimetable } from "../../lib/initial-test-actions";
import { lusitana } from "../fonts";
import { PrettyDate } from "../pretty-date";

export const StopInfo = async ({
  stopId,
  stopName,
}: {
  stopId: string;
  stopName: string;
}) => {
  if (!stopId) {
    throw new Error("Stop id is required");
  }
  const responseBody = (await fetchStopTimetable(stopId)).body;
  const incomingVehicles = responseBody[stopId] as StopObject[];

  console.log("response body", responseBody);
  return (
    <>
      <h1 className={`${lusitana.className}`}>{stopName}</h1>
      <h2 className={`${lusitana.className}`}>Incoming vehicles</h2>
      {incomingVehicles.map((vehicle) => {
        return (
          <>
            <p>Line number: {vehicle.lineRef}</p>
            <p>
              Arrival time:{" "}
              {<PrettyDate date={vehicle.call.expectedArrivalTime} />}
            </p>
          </>
        );
      })}
    </>
  );
};
