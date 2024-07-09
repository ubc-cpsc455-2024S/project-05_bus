import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Box,
  HStack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Circle,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import useCurrentGroupMembers from "../../hooks/useCurrentGroupMembers";
import { updateEventAsync } from "../../redux/events/thunks";

export default function ChoresList() {
  const [dailyMode, setDailyMode] = useState(true);
  const [showDone, setShowDone] = useState(true);
  const events = useSelector((state) => state.events.events);
  const currentStart = useSelector((state) => state.events.currentStart);
  const currentEnd = useSelector((state) => state.events.currentEnd);
  const members = useCurrentGroupMembers();
  const dispatch = useDispatch();

  const toggleDailyMode = () => {
    setDailyMode(!dailyMode);
  };

  const toggleShowDone = () => {
    setShowDone(!showDone);
  };

  const filteredEvents = events.filter((event) => {
    const eventStart = moment(event.start);
    return (
      eventStart.isBetween(currentStart, currentEnd, null, "[]") &&
      (showDone || !event.extendedProps.done)
    );
  });

  const groupedChores = filteredEvents.reduce((acc, event) => {
    const memberId = event.extendedProps.memberId;
    if (!acc[memberId]) {
      acc[memberId] = [];
    }
    acc[memberId].push(event);
    return acc;
  }, {});

  const groupAndSortByDate = (chores) => {
    const sortedChores = chores.sort((a, b) =>
      moment(a.start).diff(moment(b.start))
    );
    if (dailyMode) {
      return sortedChores.reduce((acc, chore) => {
        const date = moment(chore.start).format("MMMM D, YYYY");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(chore);
        return acc;
      }, {});
    } else {
      return sortedChores.reduce((acc, chore) => {
        const startOfWeek = moment(chore.start).startOf("week");
        const endOfWeek = moment(chore.start).endOf("week");
        const weekRange = `${startOfWeek.format("MMMM D")} - ${endOfWeek.format(
          "MMMM D, YYYY"
        )}`;

        if (!acc[weekRange]) {
          acc[weekRange] = [];
        }
        acc[weekRange].push(chore);

        return acc;
      }, {});
    }
  };

  const markAsDone = (chore) => {
    dispatch(
      updateEventAsync({
        ...chore,
        extendedProps: {
          ...chore.extendedProps,
          done: !chore.extendedProps.done,
        },
      })
    );
  };

  return (
    <Box
      p={5}
      flex="1"
      borderRadius="md"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
    >
      <HStack>
        <Heading size="lg" my={2} color="black">
          Chores by Member
        </Heading>
        <Spacer />
        <Tooltip
          label={dailyMode ? "Group Chores by Week" : "Group Chores by Day"}
        >
          <Button
            className="material-symbols-outlined"
            variant={dailyMode ? "solid" : "outline"}
            colorScheme={dailyMode ? "teal" : "gray"}
            size="sm"
            onClick={toggleDailyMode}
          >
            {dailyMode ? "today" : "date_range"}
          </Button>
        </Tooltip>
        <Tooltip label={showDone ? "Hide Done Chores" : "Show Done Chores"}>
          <Button
            className="material-symbols-outlined"
            variant={showDone ? "solid" : "outline"}
            colorScheme={showDone ? "teal" : "gray"}
            size="sm"
            onClick={toggleShowDone}
          >
            {showDone ? "done_all" : "remove_done"}
          </Button>
        </Tooltip>
      </HStack>
      <Accordion
        allowMultiple
        defaultIndex={Array.from({ length: members.length }, (x, i) => i)}
      >
        {Object.entries(groupedChores).length !== 0 ? (
          Object.entries(groupedChores).map(([memberId, chores]) => {
            const choresByDate = groupAndSortByDate(chores);
            return (
              <AccordionItem key={memberId}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "teal.700", color: "white" }}
                    bg="teal.600"
                    color="white"
                    _hover={{ bg: "teal.500" }}
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
                      {(() => {
                        const member = members.find(
                          (member) => member.id === memberId
                        );
                        return `${member.firstName} ${member.lastName}`;
                      })()}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Accordion allowMultiple>
                    {Object.entries(choresByDate).map(
                      ([date, choresOnDate]) => (
                        <AccordionItem key={date}>
                          <h2>
                            <AccordionButton>
                              <Box
                                flex="1"
                                textAlign="left"
                                fontSize="lg"
                                fontWeight="semibold"
                                color="black"
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
                                  bg="teal.50"
                                  p={2}
                                  borderRadius="md"
                                  boxShadow="xs"
                                  cursor="pointer"
                                  onClick={() => markAsDone(chore)}
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
                      )
                    )}
                  </Accordion>
                </AccordionPanel>
              </AccordionItem>
            );
          })
        ) : (
          <Text fontSize="md" color="gray.500" textAlign="center">
            No chores found
          </Text>
        )}
      </Accordion>
    </Box>
  );
}
