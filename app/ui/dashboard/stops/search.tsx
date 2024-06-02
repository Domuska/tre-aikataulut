import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Stop = {
  location: string;
  name: string;
  tariffZone: string;
  id: string;
};

export const Search = ({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) => {
  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    {
      onSearch(searchTerm);
    }
  }, 150);

  return (
    <div className="flex flex-col rounded-lg w-100 content-center">
      <input
        id="search"
        name="search"
        placeholder="Enter stop name"
        className="p-3"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
