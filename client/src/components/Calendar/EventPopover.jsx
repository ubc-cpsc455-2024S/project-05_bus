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
  Checkbox,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import moment from "moment";
import useCurrentGroupMembers from "../../hooks/useCurrentGroupMembers";

function EventPopover({ event, onClose, onDelete, onEdit, coordinates }) {
  const [eventDetails, setEventDetails] = useState({
    title: event.title,
    start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
    choreId: event.extendedProps.choreId,
    memberId: event.extendedProps.memberId,
    done: event.extendedProps.done,
    type: event.extendedProps.type,
  });
  const chores = useSelector((state) => state.chores.chores);
  const members = useCurrentGroupMembers();
  const popoverRef = useRef();

  useEffect(() => {
    if (popoverRef.current) {
      popoverRef.current.style.position = "absolute";
      popoverRef.current.style.top = `${coordinates.y}px`;
      popoverRef.current.style.left = `${coordinates.x}px`;
    }
  }, [coordinates]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setEventDetails({ ...eventDetails, [name]: updatedValue });
  };

  const handleSubmit = () => {
    const selectedChore = chores.find(
      (chore) => chore._id === eventDetails.choreId
    );
    onEdit({
      ...eventDetails,
      title: selectedChore ? selectedChore.title : eventDetails.title,
    });
  };

  return (
    <Popover isOpen onClose={onClose}>
      <PopoverContent
        bg="gray.100"
        border="none"
        ref={popoverRef}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
      >
        <PopoverArrow />
        <PopoverCloseButton color="black" />
        <PopoverHeader color="black">Edit Chore</PopoverHeader>
        <PopoverBody>
          <FormControl pb={2}>
            <FormLabel color="black">Person</FormLabel>
            <Select
              variant="filled"
              border="none"
              bg="white"
              name="memberId"
              value={eventDetails.memberId}
              onChange={handleChange}
            >
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {`${member.firstName} ${member.lastName}`}
                </option>
              ))}
            </Select>
          </FormControl>
          {eventDetails.type === "chore" && (
            <FormControl pb={2}>
              <FormLabel color="black">Type of Chore</FormLabel>
              <Select
                variant="filled"
                border="none"
                bg="white"
                name="choreId"
                value={eventDetails.choreId}
                onChange={handleChange}
              >
                {chores.map((chore) => (
                  <option key={chore._id} value={chore._id}>
                    {chore.title}
                  </option>
                ))}
              </Select>
              <FormLabel color="black">Date</FormLabel>
              <Input
                type="date"
                name="start"
                bg="white"
                value={eventDetails.start.split("T")[0]}
                onChange={handleChange}
              />
            </FormControl>
          )}
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
              colorScheme="teal"
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Checkbox
              name="done"
              color="black"
              isChecked={eventDetails.done}
              onChange={handleChange}
            >
              Done
            </Checkbox>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default EventPopover;
