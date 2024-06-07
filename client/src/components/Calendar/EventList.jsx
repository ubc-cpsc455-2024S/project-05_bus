import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Circle,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import moment from "moment";

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

  const groupAndSortByDate = (chores) => {
    return chores
      .sort((a, b) => moment(a.start).diff(moment(b.start)))
      .reduce((acc, chore) => {
        const date = moment(chore.start).format("MMMM D, YYYY");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(chore);
        return acc;
      }, {});
  };

  return (
    <Box
      p={5}
      flex="1"
      borderRadius="md"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
    >
      <Heading size="lg" my={2} color="white">
        Chores by Member
      </Heading>
      <Accordion
        allowMultiple
        defaultIndex={Array.from({ length: members.length }, (x, i) => i)}
      >
        {Object.entries(groupedChores).map(([memberId, chores]) => {
          const choresByDate = groupAndSortByDate(chores);
          return (
            <AccordionItem key={memberId}>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "cyan.600", color: "white" }}
                  bg="cyan.700"
                  color="white"
                  _hover={{ bg: "cyan.500" }}
                  borderRadius="md"
                  px={4}
                  py={2}
                  my={2}
                  boxShadow="md"
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    fontSize="xl"
                    fontWeight="bold"
                  >
                    {
                      members.find(
                        (member) => Number(member.id) === Number(memberId)
                      )?.name
                    }
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Accordion allowMultiple>
                  {Object.entries(choresByDate).map(([date, choresOnDate]) => (
                    <AccordionItem key={date}>
                      <h2>
                        <AccordionButton>
                          <Box
                            flex="1"
                            textAlign="left"
                            fontSize="lg"
                            fontWeight="semibold"
                            color="white"
                          >
                            {date}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <List spacing={4}>
                          {choresOnDate.map((chore) => (
                            <ListItem
                              key={chore.id}
                              display="flex"
                              alignItems="center"
                              bg="teal.100"
                              p={2}
                              borderRadius="md"
                              boxShadow="xs"
                            >
                              {chore.extendedProps.done ? (
                                <ListIcon
                                  as={CheckCircleIcon}
                                  color="green.500"
                                />
                              ) : (
                                <Circle
                                  size="16px"
                                  border="2px"
                                  mr={2}
                                  borderColor="teal.400"
                                />
                              )}
                              <Box flex="1" ml={3}>
                                <Text fontSize="md">{chore.title}</Text>
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
}
