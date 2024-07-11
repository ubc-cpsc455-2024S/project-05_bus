import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Select,
  Input,
  Box,
  useDisclosure,
  Portal,
} from "@chakra-ui/react";
import useCurrentGroupMembers from "../../hooks/useCurrentGroupMembers";
import useCurrentGroup from "../../hooks/useCurrentGroup";
import { useDispatch } from "react-redux";
import moment from "moment";
import { addEventAsync } from "../../redux/events/thunks";

export default function ChorePopover({ chore }) {
  const [eventType, setEventType] = useState("one-time");
  const [assignee, setAssignee] = useState("");
  const [repeatInterval, setRepeatInterval] = useState(1);
  const group = useCurrentGroup();
  const members = useCurrentGroupMembers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  useEffect(() => {
    if (members.length > 0) {
      setAssignee(members[0]._id);
    }
  }, [members]);

  const handleSave = () => {
    if (eventType === "one-time") {
      dispatchEvent(moment().format());
    } else if (eventType === "daily") {
      for (let i = 0; i < repeatInterval; i++) {
        dispatchEvent(moment().add(i, "days").format());
      }
    } else if (eventType === "weekly") {
      for (let i = 0; i < repeatInterval; i++) {
        dispatchEvent(moment().add(i, "weeks").format());
      }
    } else if (eventType === "monthly") {
      for (let i = 0; i < repeatInterval; i++) {
        dispatchEvent(moment().add(i, "months").format());
      }
    }
    onClose();
  };

  const dispatchEvent = (date) => {
    dispatch(
      addEventAsync({
        title: chore.title,
        start: date,
        allDay: true,
        backgroundColor: chore.colour,
        borderColor: chore.colour,
        groupID: group._id,
        extendedProps: {
          type: "chore",
          choreId: chore.id,
          memberId: assignee,
          done: false,
        },
      })
    );
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
    >
      <PopoverTrigger>
        <Button
          onClick={onOpen}
          size="xs"
          backgroundColor="whiteAlpha.500"
          className="material-symbols-outlined"
        >
          calendar_add_on
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent boxShadow="lg">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{chore.title}</PopoverHeader>
          <PopoverBody>
            <FormControl as="fieldset" mb="4">
              <FormLabel as="legend">Event Type</FormLabel>
              <RadioGroup value={eventType} onChange={setEventType}>
                <Stack direction="column">
                  <Radio value="one-time">One-Time</Radio>
                  <Radio value="daily">Daily</Radio>
                  <Radio value="weekly">Weekly</Radio>
                  <Radio value="monthly">Monthly</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            {eventType !== "one-time" && (
              <FormControl mb="4">
                <FormLabel>Repeat Interval</FormLabel>
                <Input
                  type="number"
                  min={1}
                  value={repeatInterval}
                  onChange={(e) => setRepeatInterval(Number(e.target.value))}
                />
              </FormControl>
            )}
            <FormControl mb="4">
              <FormLabel>Assign to</FormLabel>
              <Select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {`${member.firstName} ${member.lastName}`}
                  </option>
                ))}
              </Select>
            </FormControl>
          </PopoverBody>
          <PopoverFooter>
            <Box display="flex" justifyContent="flex-end" w="100%">
              <Button colorScheme="blue" onClick={handleSave} mr="4">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Box>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
