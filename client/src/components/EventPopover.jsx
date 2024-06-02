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
  Select,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

function EventPopover({ event, onClose, onDelete, onEdit, coordinates }) {
  const [eventDetails, setEventDetails] = useState({
    title: event.title,
    start: event.start.toISOString().slice(0, 16),
    end: event.end ? event.end.toISOString().slice(0, 16) : "",
    choreId: event.extendedProps.choreId,
    memberId: event.extendedProps.memberId,
  });
  const chores = useSelector((state) => state.chores.chores);
  const members = useSelector((state) => state.members.members);
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
      <PopoverContent shadow="md" borderWidth="1px" ref={popoverRef}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Edit Chore</PopoverHeader>
        <PopoverBody>
          <FormControl pb={2}>
            <FormLabel>Person</FormLabel>
            <Select
              name="memberId"
              value={eventDetails.memberId}
              onChange={handleChange}
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl pb={2}>
            <FormLabel>Type of Chore</FormLabel>
            <Select
              name="title"
              value={eventDetails.title}
              onChange={handleChange}
            >
              {chores.map((chore) => (
                <option key={chore.id} value={chore.title}>
                  {chore.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="datetime-local"
              name="start"
              value={eventDetails.start}
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
