import { useState } from "react";
import {
  Input,
  Button,
  Box,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
} from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import { addChore } from "../redux/choresSlice";
import { useDispatch } from "react-redux";
import { EditIcon } from "@chakra-ui/icons";

export default function CreateChore() {
  const [newChore, setNewChore] = useState("");
  const [newColor, setNewColor] = useState("#aabbcc");
  const { onOpen, onClose, isOpen } = useDisclosure();

  const dispatch = useDispatch();

  const addNewChore = () => {
    if (newChore.trim() !== "") {
      dispatch(addChore({ title: newChore, color: newColor }));
      setNewChore("");
    }
  };

  return (
    <Box mt={4} position="relative">
      <Input
        value={newChore}
        onChange={(e) => setNewChore(e.target.value)}
        placeholder="New Chore"
        width="auto"
        marginRight={2}
      />
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
      >
        <PopoverTrigger>
          <IconButton size="sm" icon={<EditIcon />} bg={newColor}/>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverHeader pt={0} fontWeight="bold" border="0">
            Pick the colour for this new chore
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <HexColorPicker color={newColor} onChange={setNewColor} />
        </PopoverContent>
      </Popover>
      <Button onClick={addNewChore} colorScheme="teal" ml={2}>
        Add Chore
      </Button>
    </Box>
  );
}
