"use client";
import { MonitoredStopVisitResponse } from "@/app/lib/actions";
import { PrettyDate } from "../../pretty-date";
import { TagIcon } from "@heroicons/react/24/outline";

export function Card({
  title,
  stopId,
  incomingVisits,
}: {
  title: string;
  stopId: number | string;
  incomingVisits: MonitoredStopVisitResponse[];
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex justify-between p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
        {/* todo add some coloring to this tag */}
        <TagIcon className="h-4 w-4 text-gray-700" />
      </div>

      {/* some times randomly the endpoint either returns 0 entries or undefined */}
      {(!incomingVisits || incomingVisits.length == 0) && (
        <p className="p-6">Failed to fetch data for stop</p>
      )}

      {incomingVisits &&
        incomingVisits.map((incomingVehicle, index) => {
          return (
            <div
              key={
                incomingVehicle.MonitoredVehicleJourney.VehicleRef?._text ||
                index
              }
              className="flex p-4"
            >
              <p className="flex-auto ml-2">
                {incomingVehicle.MonitoredVehicleJourney.LineRef._text}
              </p>
              <p className="flex-auto ml-2">
                Arrival:{" "}
                {
                  <PrettyDate
                    date={
                      incomingVehicle.MonitoredVehicleJourney.MonitoredCall
                        .ExpectedArrivalTime._text
                    }
                  />
                }
              </p>
            </div>
          );
        })}
    </div>
  );
}
