import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useCurrentGroupMembers from '../../hooks/useCurrentGroupMembers';
import { updateEventAsync } from '../../redux/events/thunks';
import useCurrentUser from '../../hooks/useCurrentUser';

const ReminderCard = ({ dismissedEvents }) => {
  const members = useCurrentGroupMembers();
  const user = useCurrentUser();
  const dispatch = useDispatch();

  const handlePing = (event) => {
    dispatch(
      updateEventAsync({
        ...event,
        extendedProps: {
          ...event.extendedProps,
          reminder: {
            senderId: user._id,
            sendDate: moment().format(),
          },
          reminded: true,
        },
      })
    );
  };

  return (
    <Box
      p={4}
      w='100%'
      bg='white'
      overflowX='auto'
      borderTop='2px solid'
      borderColor='gray.200'
    >
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        Reminders
      </Text>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th whiteSpace='nowrap' fontSize='sm'>
              Name
            </Th>
            <Th whiteSpace='nowrap' fontSize='sm'>
              Date
            </Th>
            <Th whiteSpace='nowrap' fontSize='sm'>
              Assigned To
            </Th>
            <Th whiteSpace='nowrap' fontSize='sm'>
              Last Reminded
            </Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {dismissedEvents.length === 0 && (
            <Tr>
              <Td colSpan={5} textAlign='center'>
                No reminders yet
              </Td>
            </Tr>
          )}
          {dismissedEvents.map((event, index) => (
            <Tr key={index}>
              <Td
                maxW='200px'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
                fontSize='sm'
              >
                <Tooltip label={event.title} fontSize='md'>
                  <Text fontWeight='semibold' isTruncated>
                    {event.title}
                  </Text>
                </Tooltip>
              </Td>
              <Td whiteSpace='nowrap' fontSize='sm'>
                {event.start
                  ? moment(event.start).format('MMM D, YYYY')
                  : 'N/A'}
              </Td>
              <Td whiteSpace='nowrap' fontSize='sm'>
                {event.extendedProps.memberId
                  ? members.find(
                    (member) => member._id === event.extendedProps.memberId
                  )?.firstName
                  : null}
              </Td>
              <Td whiteSpace='nowrap' fontSize='sm'>
                {event.extendedProps.reminder?.sendDate
                  ? moment(event.extendedProps.reminder.sendDate).fromNow()
                  : 'N/A'}
              </Td>
              <Td whiteSpace='nowrap'>
                <IconButton
                  icon={<BellIcon />}
                  onClick={() => handlePing(event)}
                  size='sm'
                  aria-label='Ping'
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReminderCard;
