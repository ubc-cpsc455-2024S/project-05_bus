import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../redux/slices/calendarSlice";
import { updateGroceryExpiryNotification, updateGroceryRestockNotification } from "../../redux/slices/groceriesSlice";
import moment from "moment";

export default function NotificationPopover({ groceryItem }) {
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [expiryNotificationTime, setExpiryNotificationTime] = useState(7);
  const [restockQuantity, setRestockQuantity] = useState(groceryItem.restockThreshold);
  const [assignedUser, setAssignedUser] = useState(groceryItem.restockerId);
  const members = useSelector((state) => state.members.members);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  useEffect(() => {
    const initialNotifications = [];
    if (groceryItem.expiryNotification) initialNotifications.push("expiry");
    if (groceryItem.restockNotification) initialNotifications.push("restock");
    setSelectedNotifications(initialNotifications);
  }, [groceryItem]);

  const handleSave = () => {
    if (selectedNotifications.includes("expiry")) {
      const expiryDate = new Date(groceryItem.expiryDate);
      const notificationDate = new Date(expiryDate);
      notificationDate.setDate(
        notificationDate.getDate() - expiryNotificationTime
      );
      dispatch(
        addEvent({
          title: `${groceryItem.name} will expire on ${moment(
            groceryItem.expiryDate
          ).format("MMMM Do YYYY")}`,
          start: notificationDate,
          allDay: true,
          backgroundColor: "#c49bad",
          borderColor: "#c49bad",
          extendedProps: {
            groceryId: groceryItem.id,
            choreId: 5,
            memberId: 0,
            done: false,
          },
        })
      );
      dispatch(
        updateGroceryExpiryNotification({
          id: groceryItem.id,
          expiryNotification: true,
        })
      );
    }

    if (selectedNotifications.includes("restock")) {
      dispatch(
        updateGroceryRestockNotification({
          id: groceryItem.id,
          restockNotification: true,
          restockThreshold: restockQuantity,
          restockerId: Number(assignedUser),
        })
      );
    }

    onClose();
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          bg="transparent"
          onClick={onOpen}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Notifications</Text>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </PopoverHeader>
        <PopoverBody>
          <Stack spacing={4}>
            <Text>
              Expiry Date:{" "}
              {moment(groceryItem.expiryDate).format("MMMM Do YYYY")}
            </Text>
            <CheckboxGroup
              colorScheme="green"
              onChange={setSelectedNotifications}
              value={selectedNotifications}
            >
              <Stack direction="column">
                <Checkbox value="expiry">Expiry Date Notification</Checkbox>
                <Checkbox value="restock">Restock Notification</Checkbox>
              </Stack>
            </CheckboxGroup>
            {selectedNotifications.includes("expiry") && (
              <RadioGroup
                colorScheme="green"
                onChange={setExpiryNotificationTime}
                value={expiryNotificationTime}
              >
                <Stack direction="column">
                  <Radio value="7">1 Week Before</Radio>
                  <Radio value="3">3 Days Before</Radio>
                  <Radio value="1">1 Day Before</Radio>
                </Stack>
              </RadioGroup>
            )}
            {selectedNotifications.includes("restock") && (
              <NumberInput
                min={0}
                onChange={(valueString) =>
                  setRestockQuantity(Number(valueString))
                }
                value={restockQuantity}
              >
                <NumberInputField placeholder="Restock Quantity" />
              </NumberInput>
            )}
            {selectedNotifications.includes("restock") && (
              <Select
                placeholder="Assign Restocker"
                onChange={(e) => setAssignedUser(e.target.value)}
                value={assignedUser}
              >
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
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
