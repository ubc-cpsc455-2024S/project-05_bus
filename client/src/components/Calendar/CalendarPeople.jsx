import { useSelector, useDispatch } from "react-redux";
import { Radio, RadioGroup, VStack, Heading, Box, FormControl, Switch, FormLabel } from "@chakra-ui/react";
import { setSelectedMember } from "../../redux/membersSlice";
import { toggleFilter } from "../../redux/calendarSlice";

export default function CalendarPeople() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const selectedMember = useSelector((state) => state.members.selectedMember);
  const isFiltered = useSelector((state) => state.events.filter);

  const handleRadioChange = (value) => {
    const selectedMemberId = value !== "" ? value : null;
    dispatch(setSelectedMember(selectedMemberId));
  };

  const handleToggleChange = () => {
    dispatch(toggleFilter());
  };

  return (
    <Box p={0}>
      <Heading mb={4} size="lg">
        Roommates
      </Heading>
      <RadioGroup
        onChange={handleRadioChange}
        value={selectedMember ? Number(selectedMember.id) : ""}
      >
        <VStack align="start" spacing={3}>
          {members.map((member) => (
            <Radio
              key={member.id}
              value={Number(member.id)}
              size="lg"
              colorScheme="purple"
              _hover={{ bg: "purple.100" }}
            >
              {member.name}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
      <FormControl display="flex" alignItems="center" mt={4}>
        <FormLabel htmlFor="calendar-filter" mb="0">
          Filter Calendar
        </FormLabel>
        <Switch
          id="calendar-filter"
          colorScheme="purple"
          size="lg"
          isChecked={isFiltered}
          onChange={handleToggleChange}
        />
      </FormControl>
    </Box>
  );
}
