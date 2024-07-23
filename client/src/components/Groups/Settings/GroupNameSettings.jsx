import './GroupSettings.css';
import { Box, Button } from '@chakra-ui/react';

export default function GroupNameSettings({ group }) {
  const handleCopyGroupID = () => {
    navigator.clipboard.writeText(group._id);
  };

  return (
    <Box className="group-name-container">
      <div className="group-name-header">
        <h1 className="group-name-heading">{group ? group.name : "No active group"}</h1>
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
