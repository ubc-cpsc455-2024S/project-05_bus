import './CreateGroupForm.css';
import { Button, Box, Input, Tag, TagLabel, TagCloseButton, VStack, Text, HStack, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function CreateGroupForm() {
  const users = useSelector((state) => state.users.users);
  const [groupName, setGroupName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
    setError('');
  };

  const handleAddUser = () => {
    const user = users.find((user) => user.email === emailInput);
    if (user) {
      if (!selectedUsers.find((u) => u.id === user.id)) {
        setSelectedUsers([...selectedUsers, user]);
        setEmailInput('');
      } else {
        setError('User is already added');
      }
    } else {
      setError('User not found');
    }
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  return (
    <Box width="400px" margin="auto" mt="20px">
      <FormControl isRequired>
        <FormLabel>Group Name</FormLabel>
        <Input
          placeholder="Roommates"
          mb="10px"
          value={groupName}
          onChange={handleGroupNameChange}
        />
      </FormControl>
      <FormLabel>Add Members</FormLabel>
      <HStack mb="10px">
        <Input
          value={emailInput}
          onChange={handleEmailChange}
          placeholder="janedoe@gmail.com"
        />
        <Button onClick={handleAddUser} className="material-symbols-outlined">
          add
        </Button>
      </HStack>
      {error && (
        <Text color="red.500" mb="10px">
          {error}
        </Text>
      )}
      <VStack align="start" mt="10px">
        {selectedUsers.map((user) => (
          <Tag key={user.id} size="lg" variant="solid" colorScheme="blue">
            <TagLabel>{user.email}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveUser(user.id)} />
          </Tag>
        ))}
      </VStack>
      <Button type="submit" mt="20px" isDisabled={!groupName}>
        Create Group
      </Button>
    </Box>
  );
}

