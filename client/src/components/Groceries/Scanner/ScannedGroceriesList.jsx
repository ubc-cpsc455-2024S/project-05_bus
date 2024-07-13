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

export default function ScannedGroceriesList({ croppedImageBlob, clearCroppedImage, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [groceries, setGroceries] = useState([]);

  const handleGroceries = (items) => {
    setGroceries(items);
    setIsOpen(true);
  }

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
                name={grocery.name}
                location={grocery.locationId}
                category={grocery.categoryId}
                quantity={grocery.quantity}
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
