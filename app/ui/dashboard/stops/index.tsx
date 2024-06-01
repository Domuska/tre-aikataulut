import { fetchAllStops } from "@/app/lib/actions";
import { SearchDropDown } from "./search-drop-down";

export const AllStops = async () => {
  console.log("all stops off");
  const data = await fetchAllStops();

  const updatedData = data.map(({ shortName, ...rest }) => ({
    id: shortName,
    ...rest,
  }));

  console.log(updatedData);

  return (
    <div style={{ width: 400 }}>
      {/* <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
      /> */}
      <SearchDropDown stopsData={updatedData} />
    </div>
  );
};
