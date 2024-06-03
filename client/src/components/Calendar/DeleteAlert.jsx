import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeChore } from "../../redux/choresSlice";
import { removeEvent } from "../../redux/calendarSlice";

export default function DeleteAlert({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  const handleDelete = () => {
    events.filter((event) => event.extendedProps.choreId === id).forEach((event) => {
        dispatch(removeEvent(event.id));
    });
    dispatch(removeChore(id));
    onClose();
  };

  return (
    <>
      <IconButton
        size="xs"
        colorScheme="red"
        onClick={onOpen}
        icon={<DeleteIcon />}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete this chore?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this chore? All related events will
            be deleted as well.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
