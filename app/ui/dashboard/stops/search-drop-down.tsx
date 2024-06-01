"use client";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

type Stop = {
  location: string;
  name: string;
  tariffZone: string;
  id: string;
};

type Props = {
  stopsData: Stop[];
};

// https://www.npmjs.com/package/react-search-autocomplete
export const SearchDropDown = async ({ stopsData }: Props) => {
  const formatResult = (item: Stop) => {
    // todo style this better
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
      </>
    );
  };

  const handleOnFocus = () => {
    console.log("Focused");
    // todo open the stop's info
  };

  return (
    <ReactSearchAutocomplete<Stop>
      items={stopsData}
      formatResult={formatResult}
      onFocus={handleOnFocus}
      showClear
      showNoResults={false}
    />
  );
};
