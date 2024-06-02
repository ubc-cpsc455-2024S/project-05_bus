import { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";

function EventPopover({ event, onClose, onDelete, onEdit, coordinates }) {
  const [eventDetails, setEventDetails] = useState({
    title: event.title,
    start: event.start.toISOString().slice(0, 16),
    end: event.end ? event.end.toISOString().slice(0, 16) : "",
  });

  const popoverRef = useRef();

  useEffect(() => {
    if (popoverRef.current) {
      popoverRef.current.style.position = "absolute";
      popoverRef.current.style.top = `${coordinates.y}px`;
      popoverRef.current.style.left = `${coordinates.x}px`;
    }
  }, [coordinates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = () => {
    onEdit(eventDetails);
  };

  return (
    <Popover isOpen onClose={onClose}>
      <PopoverContent ref={popoverRef}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Edit Event</PopoverHeader>
        <PopoverBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={eventDetails.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="datetime-local"
              name="start"
              value={eventDetails.start}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input
              type="datetime-local"
              name="end"
              value={eventDetails.end}
              onChange={handleChange}
            />
          </FormControl>
        </PopoverBody>
        <PopoverFooter>
          <ButtonGroup spacing={4}>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              rightIcon={<CheckIcon />}
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default EventPopover;
