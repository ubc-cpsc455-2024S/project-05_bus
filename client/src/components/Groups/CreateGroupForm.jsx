import './CreateGroupForm.css'
import { Box, Input, Tag, TagLabel, TagCloseButton, VStack, List, ListItem } from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function CreateGroupForm() {
  const users = useSelector(state => state.users.users);
  const [searchInput, setSearchInput] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleUserClick = (user) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchInput('');
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
  };

  const filteredUsers = searchInput.length > 2 
    ? users.filter(user =>
        user.email.toLowerCase().split('@')[0].includes(searchInput.toLowerCase())
      )
    : [];

  return (
    <Box width="400px" margin="auto" mt="20px">
      <Input
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search for users by email or username"
        mb="10px"
      />
      {searchInput && (
        <List border="1px" borderColor="gray.200" borderRadius="md" maxHeight="150px" overflowY="auto">
          {filteredUsers.map(user => (
            <ListItem
              key={user.id}
              p="10px"
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              onClick={() => handleUserClick(user)}
            >
              {user.email}
            </ListItem>
          ))}
        </List>
      )}
      <VStack align="start" mt="10px">
        {selectedUsers.map(user => (
          <Tag key={user.id} size="lg" variant="solid" colorScheme="blue">
            <TagLabel>{user.email} ({user.username})</TagLabel>
            <TagCloseButton onClick={() => handleRemoveUser(user.id)} />
          </Tag>
        ))}
      </VStack>
    </Box>
  );
}