import { Box, List, ListItem, ListIcon, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export default function ChoresList() {
  const events = useSelector((state) => state.events.events);
  const members = useSelector((state) => state.members.members);

  const groupedChores = events.reduce((acc, event) => {
    const memberId = event.extendedProps.memberId;
    if (!acc[memberId]) {
      acc[memberId] = [];
    }
    acc[memberId].push(event);
    return acc;
  }, {});

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Heading size="md" my="2">
        Chores by Member
      </Heading>
      {Object.entries(groupedChores).map(([memberId, chores]) => (
        <Box key={memberId} mb={5}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {members.find((member) => Number(member.id) === Number(memberId))?.name}
          </Text>
          <List spacing={3}>
            {chores.sort((a, b) => new Date(a.start) - new Date(b.start)).map((chore) => (
              <ListItem key={chore.id} display="flex" alignItems="center">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Box flex="1">
                  <Text fontWeight="bold">
                    {new Date(chore.start).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Text fontStyle="italic">{chore.title}</Text>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
