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
import getTextColour from "./utils/getTextColour";

export default function ChorePopover({ chore }) {
  const [eventType, setEventType] = useState("one-time");
  const [assignee, setAssignee] = useState("");
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
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
      dispatchEvent(moment(startDate).format());
    } else if (eventType === "daily") {
      for (let i = 0; i < repeatInterval; i++) {
        dispatchEvent(moment(startDate).add(i, "days").format());
      }
    } else if (eventType === "weekly") {
      for (let i = 0; i < repeatInterval; i++) {
        dispatchEvent(moment(startDate).add(i, "weeks").format());
      }
    } else if (eventType === "monthly") {
      for (let i = 0; i < repeatInterval; i++) {
        dispatchEvent(moment(startDate).add(i, "months").format());
      }
    }
    onClose();
  };

  const calculateEndDate = () => {
    if (eventType === "one-time") {
      return startDate;
    } else if (eventType === "daily") {
      return moment(startDate)
        .add(repeatInterval - 1, "days")
        .format("YYYY-MM-DD");
    } else if (eventType === "weekly") {
      return moment(startDate)
        .add(repeatInterval - 1, "weeks")
        .format("YYYY-MM-DD");
    } else if (eventType === "monthly") {
      return moment(startDate)
        .add(repeatInterval - 1, "months")
        .format("YYYY-MM-DD");
    }
  };

  const dispatchEvent = (date) => {
    dispatch(
      addEventAsync({
        title: chore.title,
        start: date,
        allDay: true,
        backgroundColor: chore.colour,
        borderColor: chore.colour,
        textColor: getTextColour(chore.colour),
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
    <Popover isOpen={isOpen} onClose={onClose} placement="left" boxShadow="md">
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
        <PopoverContent boxShadow="lg" bg="brand.lightGray">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{chore.title}</PopoverHeader>
          <PopoverBody>
            <FormControl as="fieldset" mb="4">
              <FormLabel as="legend">Event Frequency</FormLabel>
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
                <FormLabel>Interval (Number of Times)</FormLabel>
                <Input
                  type="number"
                  min={1}
                  value={repeatInterval}
                  onChange={(e) => setRepeatInterval(Number(e.target.value))}
                />
              </FormControl>
            )}
            <FormControl mb="4">
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>End Date</FormLabel>
              <Input type="date" value={calculateEndDate()} readOnly />
            </FormControl>
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
