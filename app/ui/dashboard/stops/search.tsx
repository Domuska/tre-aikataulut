import { useDebouncedCallback } from "use-debounce";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";

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
    <div className="">
      <TextField
        id="search"
        variant="outlined"
        label="Search for a stop"
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <DepartureBoardIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
