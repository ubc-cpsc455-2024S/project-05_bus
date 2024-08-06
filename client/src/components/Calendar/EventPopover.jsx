import { useState } from 'react';
import {
  Box,
  Popover,
  PopoverTrigger,
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
  Tooltip,
  Portal,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import moment from 'moment';
import useCurrentGroupMembers from '../../hooks/useCurrentGroupMembers';

function EventPopover({ isOpen, event, onClose, onDelete, onEdit }) {
  const [eventDetails, setEventDetails] = useState({
    _id: event.id,
    title: event.title,
    start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
    choreId: event.extendedProps.choreId,
    memberId: event.extendedProps.memberId,
    restockerId: event.extendedProps.restockerId,
    backgroundColor: event.backgroundColor,
    borderColor: event.borderColor,
    textColor: event.textColor,
    done: event.extendedProps.done,
    type: event.extendedProps.type,
  });
  const chores = useSelector((state) => state.chores.chores);
  const members = useCurrentGroupMembers();
  const member = members.find((member) => member._id === eventDetails.memberId);
  const memberName = member ? member.firstName : 'Unassigned Chore';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    if (name === 'start' && type === 'date') {
      const formattedDate = moment(updatedValue).format();
      setEventDetails({ ...eventDetails, [name]: formattedDate });
    } else {
      setEventDetails({ ...eventDetails, [name]: updatedValue });
    }
  };

  const handleSubmit = () => {
    const selectedChore = chores.find(
      (chore) => chore._id === eventDetails.choreId
    );
    const updatedEventDetails = {
      ...eventDetails,
      title: selectedChore ? selectedChore.title : eventDetails.title,
      extendedProps: {
        ...event.extendedProps,
        memberId: eventDetails.memberId,
        done: eventDetails.done,
        type: eventDetails.type,
      },
    };
    if (eventDetails.type === 'restock') {
      updatedEventDetails.extendedProps.restockerId = eventDetails.memberId;
    }
    onEdit(updatedEventDetails);
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box
          position="relative"
          width="100%"
          height="100%"
          borderRadius="md"
          backgroundColor={eventDetails.backgroundColor}
          boxShadow="0 1px 2px rgba(0, 0, 0, 0.3)"
          overflow="hidden"
        >
          <Tooltip label={event.title} placement="bottom">
            <Box
              color={eventDetails.textColor}
              padding="2px 4px 0px 4px"
              textDecoration={eventDetails.done ? 'line-through' : 'none'}
              position="relative"
              isTruncated
            >
              {`${memberName} - ${eventDetails.title}`}
            </Box>
          </Tooltip>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          bg='gray.100'
          border='none'
          boxShadow='0 4px 8px rgba(0, 0, 0, 0.3)'
        >
          <PopoverArrow />
          <PopoverCloseButton color='black' onClick={onClose} />
          <PopoverHeader color='black'>Edit Chore</PopoverHeader>
          <PopoverBody>
            <FormControl pb={2}>
              <FormLabel color='black'>Person</FormLabel>
              <Select
                variant='filled'
                border='none'
                bg='white'
                name='memberId'
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
            {eventDetails.type === 'chore' && (
              <FormControl pb={2}>
                <FormLabel color='black'>Type of Chore</FormLabel>
                <Select
                  variant='filled'
                  border='none'
                  bg='white'
                  name='choreId'
                  value={eventDetails.choreId}
                  onChange={handleChange}
                >
                  {chores.map((chore) => (
                    <option key={chore._id} value={chore._id}>
                      {chore.title}
                    </option>
                  ))}
                </Select>
                <FormLabel color='black'>Date</FormLabel>
                <Input
                  type='date'
                  name='start'
                  bg='white'
                  value={moment(eventDetails.start).format('YYYY-MM-DD')}
                  onChange={handleChange}
                />
              </FormControl>
            )}
          </PopoverBody>
          <PopoverFooter>
            <ButtonGroup spacing={4}>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme='red'
                onClick={() => onDelete(event)}
              >
                Delete
              </Button>
              <Button
                rightIcon={<CheckIcon />}
                colorScheme='teal'
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Checkbox
                name='done'
                color='black'
                isChecked={eventDetails.done}
                onChange={handleChange}
              >
                Done
              </Checkbox>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default EventPopover;
