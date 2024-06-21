import './CreateGroupForm.css';
import { Button, Box, Input, Tag, TagLabel, TagCloseButton, VStack, Text, HStack, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createGroupAndAssignMembers } from '../../redux/thunks';

export default function CreateGroupForm() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const currentUserID = useSelector(state => state.users.currentUserID);
  const currentUser = useSelector(state => state.users.users.find(user => user.id == currentUserID));
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddUser();
    }
  };

  const handleAddUser = () => {
    const user = users.find((user) => user.email === emailInput);
    if (user) {
      if (!selectedUsers.find((u) => u.id === user.id)) {
        if (user.id === currentUser.id) {
          setError('You do not need to add yourself when creating a group');
        } else if (user.groupID) {
          setError('User already belongs to a group');
        } else {
          setSelectedUsers([...selectedUsers, user]);
          setEmailInput('');
        }
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

  const handleCreateGroup = async () => {
    const members = [currentUser, ...selectedUsers];
    const memberIDs = members.map(member => member.id);
    const group = {
      name: groupName,
      memberIDs
    }
     
    try {
      await dispatch(createGroupAndAssignMembers(group));
    } catch (error) {
      setError('Could not create group.');
    }
  }

  return (
    <Box width="400px" mt="20px" className="create-group-container">
      <div className="create-group-heading-container">
        <h1 className="create-group-heading">Create a Group</h1>
        <span className="material-symbols-outlined icon">add_business</span>
      </div>
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
          onKeyDown={handleKeyPress}
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
          <Tag key={user.id} size="lg" variant="solid" colorScheme="teal">
            <TagLabel>{user.email}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveUser(user.id)} />
          </Tag>
        ))}
      </VStack>
      <Button mt="20px" isDisabled={!groupName} onClick={handleCreateGroup}>
        Create
      </Button>
    </Box>
  );
}