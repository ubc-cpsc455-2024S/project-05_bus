import './GroupSettings.css';
import { Box, Avatar } from '@chakra-ui/react';
import useCurrentGroupMembers from '../../../hooks/useCurrentGroupMembers';

export default function MembersSettings() {
  const members = useCurrentGroupMembers();

  return (
    <Box className="members-settings-container">
      <h1 className="members-settings-heading">Members</h1>
      <ul>
        {members.map(member => (
          <div key={member._id} className="group-member-container">
            <Avatar className="group-member-avatar" size="sm" />
            <p>{`${member.firstName} ${member.lastName}`}</p>
          </div>
        ))}
      </ul>
    </Box>
  )
}
