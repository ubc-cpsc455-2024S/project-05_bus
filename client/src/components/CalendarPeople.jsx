import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Radio, RadioGroup, VStack, Heading, Box } from "@chakra-ui/react";

export default function CalendarPeople({ onSelectionChange }) {
  const members = useSelector((state) => state.members.members);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState("");

  useEffect(() => {
    const selectedMemberDetails = selectedMemberIndex !== "" ? members[selectedMemberIndex] : null;
    onSelectionChange(selectedMemberDetails);
  }, [selectedMemberIndex, members, onSelectionChange]);

  const handleRadioChange = (value) => {
    setSelectedMemberIndex(value);
  };

  return (
    <Box mb={4}>
      <Heading mb={2}>
        Roommates
      </Heading>
      <RadioGroup onChange={handleRadioChange} value={selectedMemberIndex}>
        <VStack align="start">
          {members.map((member, index) => (
            <Radio key={member.id} value={index.toString()}>
              {member.name}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
    </Box>
  );
}
