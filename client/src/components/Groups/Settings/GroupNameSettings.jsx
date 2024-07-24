import './GroupSettings.css';
import { Box, Button, Input } from '@chakra-ui/react';

export default function GroupNameSettings({ group, isEditMode, groupName, setGroupName }) {
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleCopyGroupID = () => {
    navigator.clipboard.writeText(group._id);
  };

  return (
    <Box className="group-name-container">
      <div className="group-name-header">
        {isEditMode ? 
          <div className="group-name-edit-container">
            <Input
              className="group-name-edit-input"
              placeholder={group.name}
              mb="10px"
              value={groupName}
              onChange={handleGroupNameChange}
            />
          </div>
          :
          <h1 className="group-name-heading">{group.name}</h1>
        }
      </div>
      <div className="group-id-container">
        Group ID: {group._id}
        <Button className="copy-button" onClick={handleCopyGroupID} ml={2} size="sm" colorScheme="blue">
          <span className="material-symbols-outlined copy-icon">content_copy</span>
        </Button>
      </div>
    </Box>
  )
}
