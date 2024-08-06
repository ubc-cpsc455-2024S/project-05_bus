import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from '../components/Auth/PageLoader';
import {
  Box, Button, Stack, Text, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input,
  Card
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateUserNameAsync } from '../redux/users/thunks';

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const currentUserName = useSelector(state => state.users.currentUserName);
  const currentUserID = useSelector(state => state.users.currentUserID);
  const currentFirstName = useSelector(state => state.users.users.find(user => user._id === currentUserID).firstName);
  const currentLastName = useSelector(state => state.users.users.find(user => user._id === currentUserID).lastName);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstName, setFirstName] = useState(currentFirstName);
  const [lastName, setLastName] = useState(currentLastName);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleSave = async () => {
    setError('');

    try {
      await dispatch(updateUserNameAsync({id: currentUserID, firstName: firstName, lastName: lastName})).unwrap();
    } catch (error) {
      setError('Could not save changes');
    }
    onClose();
  };

  return (
    <Box padding="50px" minHeight="100vh">
      <Box display="flex" alignItems="center">
        <span className='material-symbols-outlined settings-group-icon icon'>person</span>
        <Text fontSize="xx-large" color="teal.600" as='b'>Profile</Text>
      </Box>
      {isAuthenticated && (
        <Stack spacing='20px' paddingY='30px'>
          <Box borderWidth='1px' borderRadius='lg' padding='10px' display="flex" justifyContent="space-between" alignItems="center" p={2}> 
            <Text fontSize='large'><strong>Name:</strong> {currentUserName}</Text>
            <Button className='group-settings-edit-button' onClick={onOpen}>
              <span className='material-symbols-outlined group-settings-edit-icon'>edit_square</span>
            </Button>
          </Box>
          <Box borderWidth='1px' borderRadius='lg' p={3.5}>
            <Text fontSize='large'><strong>Email:</strong> {user.email}</Text>
          </Box>

        </Stack>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderColor="brand.lightGrey" borderWidth='1px' borderRadius='lg' padding="5px" mb={5}>
              <Text as="b">First Name:</Text>
              <Input 
                borderColor="brand.lightGrey" 
                focusBorderColor="brand.grey" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              ></Input>
            </Box>
            <Box borderColor="brand.lightGrey" borderWidth='1px' borderRadius='lg' padding="5px">
              <Text as="b">Last Name:</Text>
              <Input 
                borderColor="brand.lightGrey" 
                focusBorderColor="brand.grey" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              ></Input>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" _hover={{ bg:'teal.700' }} mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
}