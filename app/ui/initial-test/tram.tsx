import {
  StopObject,
  fetchStopTimetables,
} from "../../lib/initial-test-actions";
import { lusitana } from "../fonts";
import { PrettyDate } from "../pretty-date";

export const IncomingVehicles = async () => {
  const stopIds = ["0835", "0836"];
  const responseBody = (await fetchStopTimetables(stopIds)).body;
  console.log("data is", responseBody);

  return (
    <div>
      <h1 className={`${lusitana.className}`}>Tram stop</h1>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {stopIds.map((stopId) => {
        const stopObject = responseBody[stopId] as StopObject[];
        console.log("stopobject", stopObject);
        if (!stopObject || stopObject.length === 0) {
          return <p key={stopId}>Failed to fetch data</p>;
        }

        return stopObject.map((stop) => {
          return (
            <div key={stopId} className="bg-sky-500/100 mt-2">
              <h2>Arrival information</h2>

              <p>
                Arrival time:
                <PrettyDate date={stop.call.expectedArrivalTime} />
              </p>
              <p>Status: {stop.call.arrivalStatus}</p>
            </div>
          );
        });
      })}
    </div>
  );
};
