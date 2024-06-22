import { Button, Box, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGroupMember } from '../../redux/thunks';

export default function JoinGroupForm() {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups.groups);
  const currentUserID = useSelector(state => state.users.currentUserID);
  const [groupInput, setGroupInput] = useState('');
  const [error, setError] = useState('');

  const handleGroupChange = (e) => {
    setGroupInput(e.target.value);
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinGroup();
    }
  };

  const handleJoinGroup = async () => {
    const group = groups.find(group => group.id === groupInput);
    if (group) {
      try {
        await dispatch(addGroupMember({groupID: group.id, userID: currentUserID}));
      } catch (error) {
        setError('Could not add user to group');
      }
    } else {
      setError('Group not found');
    }
  };

  return (
    <Box width="400px" mt="20px" className="create-group-container">
      <div className="create-group-heading-container">
        <h1 className="create-group-heading">Join a Group</h1>
        <span className="material-symbols-outlined icon">group_add</span>
      </div>
      <Input
          value={groupInput}
          onChange={handleGroupChange}
          onKeyDown={handleKeyPress}
          placeholder="Group ID (e.g. GTCqAx1EblTelfU0CJACa)"
        />
      {error && (
        <Text color="red.500" mb="10px">
          {error}
        </Text>
      )}
      <Button mt="20px" isDisabled={!groupInput} onClick={handleJoinGroup}>
        Join
      </Button>
    </Box>
  )
}