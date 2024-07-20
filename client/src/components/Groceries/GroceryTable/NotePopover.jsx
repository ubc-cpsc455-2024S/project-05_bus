import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";

export default function NotePopover({ groceryItem }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="material-symbols-outlined" bg="transparent">
          sticky_note_2
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Note</PopoverHeader>
        <PopoverBody>{groceryItem.note}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
