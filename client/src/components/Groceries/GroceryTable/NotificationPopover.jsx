import { useState, useRef } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  IconButton,
  Button,
  Box,
  Text,
  Stack,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  NumberInput,
  NumberInputField,
  Select,
  useDisclosure,
  useOutsideClick,
  ButtonGroup,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import useCurrentGroupMembers from '../../../hooks/useCurrentGroupMembers';
import useCurrentGroup from '../../../hooks/useCurrentGroup';
import { updateGroceryAsync } from '../../../redux/groceries/thunks';
import { addEventAsync } from '../../../redux/events/thunks';

export default function NotificationPopover({ groceryItem }) {
  const [selectedNotifications, setSelectedNotifications] = useState(() => {
    const initialNotifications = [];
    if (groceryItem.expiryNotificationDate) initialNotifications.push('expiry');
    if (groceryItem.restockThreshold) initialNotifications.push('restock');
    return initialNotifications;
  });
  const [expiryNotificationTime, setExpiryNotificationTime] = useState('7');
  const [restockQuantity, setRestockQuantity] = useState(
    groceryItem.restockThreshold
  );
  const [assignedUser, setAssignedUser] = useState(groceryItem.restockerId);
  const currentUserID = useSelector((state) => state.users.currentUserID);
  const members = useCurrentGroupMembers();
  const group = useCurrentGroup();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();
  const toast = useToast();

  const dispatch = useDispatch();

  useOutsideClick({
    ref: ref,
    handler: () => {
      onClose();
    }
  });

  const handleSave = async () => {
    try {
      const updates = { _id: groceryItem._id };

      if (selectedNotifications.includes('expiry')) {
        const expiryDate = new Date(groceryItem.expiryDate);
        const notificationDate = moment(expiryDate)
          .subtract(expiryNotificationTime, 'days')
          .format();

        if (groceryItem.expiryNotificationDate !== notificationDate) {
          dispatch(
            addEventAsync({
              title: `${groceryItem.name} will expire on ${moment(
                groceryItem.expiryDate
              ).format('MMMM Do YYYY')}`,
              start: notificationDate,
              allDay: true,
              backgroundColor: '#c49bad',
              borderColor: '#c49bad',
              groupID: group._id,
              extendedProps: {
                groceryId: groceryItem._id,
                type: 'expiry',
                memberId: currentUserID,
                done: false,
              },
            })
          );
          updates.expiryNotificationDate = notificationDate;
        }
      } else {
        updates.expiryNotificationDate = null;
      }

      if (selectedNotifications.includes('restock')) {
        updates.restockThreshold = restockQuantity;
        updates.restockerId = assignedUser;
      } else {
        updates.restockNotificationDate = null;
        updates.restockThreshold = null;
        updates.restockerId = null;
      }

      dispatch(updateGroceryAsync(updates));

      toast({
        title: 'Notifications updated.',
        description: 'Your notifications have been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to update notifications.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={false}>
      <PopoverTrigger>
        <Tooltip label="Set Notifications" aria-label="Set Notifications" placement="auto">
          <IconButton
            aria-label='Notifications'
            icon={
              <span className='material-symbols-outlined'>notifications</span>
            }
            bg='transparent'
            onClick={onOpen}
            color={selectedNotifications.length > 0 ? 'yellow.500' : 'gray.600'}
            _hover={{ color: 'yellow.300' }}
            _active={{ color: 'yellow.700' }}
          />
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent shadow='lg' pt={0} pb={2} position='relative'>
        <PopoverArrow />
        <PopoverHeader>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Text>Notifications</Text>
            <ButtonGroup>
              <Button
                className='material-symbols-outlined'
                size='sm'
                onClick={handleSave}
              >
                Save
              </Button>
              <PopoverCloseButton position='static' size='md' />
            </ButtonGroup>
          </Box>
        </PopoverHeader>
        <PopoverBody ref={ref}>
          <Stack spacing={4}>
            <Text>
              Expiry Date:{' '}
              {moment(groceryItem.expiryDate).format('MMMM Do YYYY')}
            </Text>
            <CheckboxGroup
              colorScheme='green'
              onChange={setSelectedNotifications}
              value={selectedNotifications}
            >
              <Stack direction='column'>
                <Checkbox value='expiry'>Expiry Date Notification</Checkbox>
                {groceryItem.expiryNotificationDate && (
                  <Text>
                    Expiry Notification Date:{' '}
                    {moment(groceryItem.expiryNotificationDate).format(
                      'MMMM Do YYYY'
                    )}
                  </Text>
                )}
                {selectedNotifications.includes('expiry') && (
                  <RadioGroup
                    colorScheme='green'
                    onChange={setExpiryNotificationTime}
                    value={expiryNotificationTime}
                  >
                    <Stack direction='column'>
                      <Radio value='7'>1 Week Before</Radio>
                      <Radio value='3'>3 Days Before</Radio>
                      <Radio value='1'>1 Day Before</Radio>
                    </Stack>
                  </RadioGroup>
                )}
                <Checkbox value='restock'>Restock Notification</Checkbox>
                {groceryItem.restockNotificationDate && (
                  <Text>
                    Restock Notification Date:{' '}
                    {moment(groceryItem.restockNotificationDate).format(
                      'MMMM Do YYYY'
                    )}
                  </Text>
                )}
              </Stack>
            </CheckboxGroup>
            {selectedNotifications.includes('restock') && (
              <NumberInput
                min={0}
                onChange={(valueString) =>
                  setRestockQuantity(Number(valueString))
                }
                value={Number(restockQuantity)}
              >
                <NumberInputField placeholder='Restock Quantity' />
              </NumberInput>
            )}
            {selectedNotifications.includes('restock') && (
              <Select
                placeholder='Assign Restocker'
                onChange={(e) => setAssignedUser(e.target.value)}
                value={assignedUser}
              >
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {`${member.firstName} ${member.lastName}`}
                  </option>
                ))}
              </Select>
            )}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
