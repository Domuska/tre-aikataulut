import { PushPin } from "@mui/icons-material";
import { IconButton, ListItem, ListItemText, styled } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";

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

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;
  const { stopsData, onTagClick } = data;
  return (
    <ListItem
      key={index}
      style={style}
      component="div"
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="tag stop"
          onClick={() => onTagClick(stopsData[index].id)}
        >
          <PushPin />
        </IconButton>
      }
    >
      <ListItemText primary={stopsData[index].name}></ListItemText>
    </ListItem>
  );
}

const Styling = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const SearchResult = ({ stopsData, onTagClick }: Props) => {
  // wrap the onclick function too to pas inside the rendered row
  const rowProps = {
    stopsData,
    onTagClick,
  };

  return (
    <Styling>
      {/* the list can have over 3000 elements */}
      <FixedSizeList
        height={400}
        width={600}
        itemSize={46}
        itemCount={stopsData.length}
        overscanCount={5}
        itemData={rowProps}
      >
        {renderRow}
      </FixedSizeList>
    </Styling>
  );
};
