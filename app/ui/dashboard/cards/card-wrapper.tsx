import { fetchStopInfo, fetchStopTimetables } from "@/app/lib/actions";
import { Card } from "./card";

export default async function CardWrapper() {
  const [hervanta1Stop, hervanta2Stop] = await Promise.all([
    fetchStopInfo("0835"), // Hervanta A
    fetchStopInfo("0836"), // Hervanta B
  ]);

  const timeTablesResponse = await fetchStopTimetables([
    hervanta1Stop.shortName,
    hervanta2Stop.shortName,
  ]);

  const timeTablesData = timeTablesResponse.body;

  return (
    <>
      <Card
        title={hervanta1Stop.name}
        stopId={hervanta1Stop.shortName}
        stopData={timeTablesData[hervanta1Stop.shortName]}
      />
      <Card
        title={hervanta2Stop.name}
        stopId={hervanta2Stop.shortName}
        stopData={timeTablesData[hervanta2Stop.shortName]}
      />
    </>
  );
}
