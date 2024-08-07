import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  SkeletonText,
  useToast
} from '@chakra-ui/react';
import GroceryRow from './ScannedGroceryRow';
import SubmitButton from './SubmitButton';
import { useDispatch } from 'react-redux';
import { addGroceriesAsync } from '../../../redux/groceries/thunks';
import useCurrentGroup from '../../../hooks/useCurrentGroup';

export default function ScannedGroceriesList({
  croppedImageBlob,
  clearCroppedImage,
  type,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const dispatch = useDispatch();
  const groupID = useCurrentGroup()._id;
  const toast = useToast();

  const handleGroceries = (items) => {
    setGroceries(items);
  };

  const validateGroceries = (groceries) => {
    let isValid = true;
    let errorMessages = [];

    groceries.forEach((grocery, index) => {
      if (!grocery.name) {
        isValid = false;
        errorMessages.push(`Grocery item ${index + 1}: Name is required.`);
      }
      if (!grocery.quantity || grocery.quantity <= 0) {
        isValid = false;
        errorMessages.push(`Grocery item ${index + 1}: Quantity must be greater than 0.`);
      }
    });

    return { isValid, errorMessages };
  };

  const handleSubmit = () => {
    const validation = validateGroceries(groceries);
  
    if (validation.isValid) {
      const groceriesToSubmit = groceries.map((grocery) => {
        const sanitizedGrocery = { ...grocery };
  
        Object.keys(sanitizedGrocery).forEach((key) => {
          if (sanitizedGrocery[key] === '') {
            sanitizedGrocery[key] = null;
          }
        });
  
        return {
          ...sanitizedGrocery,
          groupID,
        };
      });
  
      dispatch(addGroceriesAsync(groceriesToSubmit));
      toast({
        title: `${groceries.length} Groceries added`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      setIsOpen(false);
    } else {
      validation.errorMessages.forEach((message) => {
        toast({
          title: 'Validation Error',
          description: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
    }
  };

  const handleDelete = (index) => {
    setGroceries((prevGroceries) =>
      prevGroceries.filter((_, i) => i !== index)
    );
  };

  const handleClose = () => {
    setIsOpen(false);
    setGroceries([]);
  };

  return (
    <>
      <SubmitButton
        croppedImageBlob={croppedImageBlob}
        clearCroppedImage={clearCroppedImage}
        type={type}
        setGroceries={handleGroceries}
        setLoading={setLoading}
        setModalOpen={setIsOpen}
      />
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => setIsOpen(false)} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scanned Groceries</ModalHeader>
          <SkeletonText
            isLoaded={!loading}
            m='3'
            noOfLines={4}
            spacing='4'
            skeletonHeight='2'
          >
            <ModalBody>
              {groceries.map((grocery, index) => (
                <GroceryRow
                  key={index}
                  index={index}
                  grocery={grocery}
                  setUpdatedGrocery={(updatedGrocery) => {
                    const newUpdatedGroceries = [...groceries];
                    newUpdatedGroceries[index] = updatedGrocery;
                    setGroceries(newUpdatedGroceries);
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </ModalBody>
          </SkeletonText>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme='red' mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}