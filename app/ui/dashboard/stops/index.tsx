"use client";

import { Search } from "./search";
import { SearchResult } from "./searchResult";
import { useState } from "react";

type Stop = {
  location: string;
  name: string;
  tariffZone: string;
  id: string;
};

type Props = {
  stopsData: Stop[];
};

export const AllStops = ({ stopsData }: Props) => {
  const [filteredData, setFilteredData] = useState<Stop[]>(stopsData);

  const onSearch = (searchTerm: string) => {
    setFilteredData(
      stopsData.filter((stop) =>
        stop.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const onTagClick = (stopId: string) => {
    console.log("ontag", stopId);
    // todo use local storage
  };

  return (
    <>
      <div className="m-5">
        <Search onSearch={onSearch} />
      </div>
      <SearchResult stopsData={filteredData} onTagClick={onTagClick} />
    </>
  );
};
