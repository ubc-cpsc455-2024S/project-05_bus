import './CreateGroupForm.css';
import { Button, Box, Input, Tag, TagLabel, TagCloseButton, VStack, Text, HStack, FormControl, FormLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useCurrentUser from '../../hooks/useCurrentUser';
import { createGroupAsync } from '../../redux/groups/thunks';
import { getUsersAsync } from '../../redux/users/thunks';
import { getGroupsAsync } from '../../redux/groups/thunks';
import { getEventsAsync } from '../../redux/events/thunks';
import useCurrentGroup from '../../hooks/useCurrentGroup';
import { getChoresAsync } from '../../redux/chores/thunks';

export default function CreateGroupForm() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const currentUser = useCurrentUser();
  const currentGroup = useCurrentGroup();
  const [groupName, setGroupName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentGroup) {
      dispatch(getEventsAsync(currentGroup._id));
      dispatch(getChoresAsync(currentGroup._id));
    }
  }, [currentGroup, dispatch]);

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
      if (!selectedUsers.find((u) => u._id === user._id)) {
        if (user._id === currentUser._id) {
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
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
  };

  const handleCreateGroup = async () => {
    const members = [currentUser, ...selectedUsers];
    const memberIDs = members.map(member => member._id);
    const group = {
      name: groupName,
      memberIDs,
      adminIDs: [currentUser._id]
    };
     
    try {
      await dispatch(createGroupAsync(group)).unwrap();
      await dispatch(getUsersAsync()).unwrap();
      await dispatch(getGroupsAsync()).unwrap();
    } catch (error) {
      setError('Could not create group.');
    }
  };

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
          borderColor="brand.lightGrey" focusBorderColor="brand.grey"
          value={groupName}
          onChange={handleGroupNameChange}
        />
      </FormControl>
      <FormLabel>Add Members</FormLabel>
      <HStack mb="10px">
        <Input
          value={emailInput}
          borderColor="brand.lightGrey" focusBorderColor="brand.grey"
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
          <Tag key={user._id} size="lg" variant="solid" bg="brand.forestGreen">
            <TagLabel>{user.email}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveUser(user._id)} />
          </Tag>
        ))}
      </VStack>
      <Button mt="20px" isDisabled={!groupName} bg="brand.midGreen" color="white" size="md" _hover={{ bg: 'brand.forestGreen' }} onClick={handleCreateGroup}>
        Create
      </Button>
    </Box>
  );
}