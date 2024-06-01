import {
  MonitoredStopVisitResponse,
  fetchStopTimetableXML,
} from "@/app/lib/actions";
import { Card } from "./card";

export default async function CardWrapper() {
  const stopIds = [
    "0835", // Hervanta A
    "0836", // Hervanta B
  ];

  const xmlResponse = await fetchStopTimetableXML(stopIds);

  const stopsMap = {} as any;
  // const stopsMap2 = new Map<string, string[]>();
  const stopsMap2 = new Map<string, MonitoredStopVisitResponse[]>();

  xmlResponse.forEach((item) => {
    const key = item.StopVisitNote._text;
    if (!stopsMap[key]) {
      stopsMap[key] = [];
    }

    if (!stopsMap2.has(key)) {
      stopsMap2.set(key, []);
    }

    // limitation of map structure, compiler doesn't understand that we set the value above
    stopsMap2.get(key)!.push(item);

    stopsMap[key].push(item);
  });

  return (
    <>
      {Array.from(stopsMap2).map((entry) => {
        const [key, value] = entry;
        return (
          <Card key={key} title={key} stopId="seppo" incomingVisits={value} />
        );
      })}
    </>
  );
}
