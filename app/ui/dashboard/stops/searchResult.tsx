import { TagIcon } from "@heroicons/react/24/outline";

type Stop = {
  location: string;
  name: string;
  tariffZone: string;
  id: string;
};

type Props = {
  stopsData: Stop[];
  onTagClick: (stopId: string) => void;
};

export const SearchResult = ({ stopsData, onTagClick }: Props) => {
  return (
    <div className="flex flex-col rounded-lg gap-y-5 min-w-80">
      {stopsData.map((stop) => {
        return (
          <div
            key={stop.id}
            className="p-3 pl-5 rounded-xl shadow-sm bg-teal-100 flex justify-between items-center"
          >
            <span>{stop.name}</span>
            <button
              onClick={() => {
                onTagClick(stop.id);
              }}
            >
              <TagIcon className="h-4 w-4 text-gray-700 inline" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
