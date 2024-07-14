import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import GroceryRow from "./ScannedGroceryRow";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";
import { addGroceriesAsync } from "../../../redux/groceries/thunks";
import useCurrentGroup from "../../../hooks/useCurrentGroup";

export default function ScannedGroceriesList({
  croppedImageBlob,
  clearCroppedImage,
  type,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const dispatch = useDispatch();
  const groupID = useCurrentGroup()._id;

  const handleGroceries = (items) => {
    setGroceries(items);
    setIsOpen(true);
  };

  const handleSubmit = () => {
    const updatedGroceries = groceries.map(grocery => ({
      ...grocery,
      groupID
    }));
    dispatch(addGroceriesAsync(updatedGroceries));
    setIsOpen(false);
  };

  return (
    <>
      <SubmitButton
        croppedImageBlob={croppedImageBlob}
        clearCroppedImage={clearCroppedImage}
        type={type}
        setGroceries={handleGroceries}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scanned Groceries</ModalHeader>
          <ModalBody>
            {groceries.map((grocery, index) => (
              <GroceryRow
                key={index}
                index={index}
                grocery={grocery}
                allGroceries={groceries}
                setAllGroceries={setGroceries}
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="red" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
