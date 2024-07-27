import { HStack, Text, Tooltip, ButtonGroup } from "@chakra-ui/react";
import DeleteAlert from "../DeleteAlert";
import ChorePopover from "./ChorePopover";

export default function Chore({ chore, handleDelete }) {
  return (
    <HStack
      className="event"
      data-chore-id={chore._id}
      style={{
        backgroundColor: chore.colour,
        padding: "8px",
        borderRadius: "4px",
        width: "100%",
        justifyContent: "space-between",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Tooltip label={chore.title}>
        <Text
          fontSize="md"
          className="event-title"
          style={{
            color: "white",
            mixBlendMode: "difference",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {chore.title}
        </Text>
      </Tooltip>
      <ButtonGroup>
        <ChorePopover chore={chore} />
        <DeleteAlert
          handleDelete={() => handleDelete(chore)}
          type={"chore"}
          style={{ backgroundColor: "whiteAlpha.500" }}
        />
      </ButtonGroup>
    </HStack>
  );
}
