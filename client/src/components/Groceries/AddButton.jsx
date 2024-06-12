import { useState, useRef } from "react";
import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function FloatingAddButton({ onAdd }) {
  const [inputValue, setInputValue] = useState("");
  const initialFocusRef = useRef(null);

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue("");
  };

  return (
    <Popover
      placement="left-start"
      closeOnBlur={false}
      initialFocusRef={initialFocusRef}
    >
      <PopoverTrigger>
        <IconButton
          icon={<AddIcon />}
          isRound
          size="lg"
          colorScheme="teal"
          aria-label="Add item"
          shadow="md"
        />
      </PopoverTrigger>
      <PopoverContent p={0}>
        <InputGroup>
          <Input
            placeholder="Type here..."
            value={inputValue}
            ref={initialFocusRef}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <InputRightElement>
            <Button
              className="material-symbols-outlined"
              bg="transparent"
              size="sm"
              onClick={handleAdd}
              m={0}
              p={0}
            >
              send
            </Button>
          </InputRightElement>
        </InputGroup>
      </PopoverContent>
    </Popover>
  );
}
