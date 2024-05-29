"use client";
import { StopObject } from "@/app/lib/actions";
import { PrettyDate } from "../../pretty-date";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export function Card({
  title,
  stopId,
  stopData,
}: {
  title: string;
  stopId: number | string;
  stopData: StopObject[];
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex justify-between p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
        <BookmarkIcon className="h-4 w-4 text-gray-700" />
      </div>

      {/* some times randomly the endpoint either returns 0 entries or undefined */}
      {(!stopData || stopData.length == 0) && (
        <p className="p-6">Failed to fetch data for stop</p>
      )}

      {stopData &&
        stopData.map((incomingVehicle) => {
          return (
            <div key={incomingVehicle.vehicleRef} className="flex p-4">
              <p className="flex-auto ml-2">{incomingVehicle.lineRef}</p>
              <p className="flex-auto ml-2">
                Arrival:{" "}
                {<PrettyDate date={incomingVehicle.call.expectedArrivalTime} />}
              </p>
            </div>
          );
        })}
    </div>
  );
}