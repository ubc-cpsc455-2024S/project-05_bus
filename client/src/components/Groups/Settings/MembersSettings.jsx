import './GroupSettings.css';
import { Box, Avatar, Button } from '@chakra-ui/react';
import useCurrentGroupMembers from '../../../hooks/useCurrentGroupMembers';
import { useDispatch } from 'react-redux';
import { removeMemberAsync } from '../../../redux/groups/thunks';

export default function MembersSettings({ isEditMode, currentUserID, currentGroup, openLeaveGroupModal, setError }) {
  const dispatch = useDispatch();
  const members = useCurrentGroupMembers();

  const handleRemoveMember = async (id) => {
    setError('');
    
    if(id === currentUserID) {
      openLeaveGroupModal();
    } else {
      try {
        await dispatch(removeMemberAsync({ groupID: currentGroup._id, userID: id })).unwrap();
      } catch (error) {
        setError('Could not remove user from group');
      }
    }
  }

  const avatarSize = { base: "xs", sm: "sm"};

  return (
    <Box className="members-settings-container">
      <h1 className="members-settings-heading">Members</h1>
      <ul>
        {members.map(member => (
          <div key={member._id} className="group-member-container">
            {isEditMode &&
              <Button className="remove-button" onClick={() => handleRemoveMember(member._id)} ml={2} size="sm" colorScheme="blue">
                <span className="material-symbols-outlined remove-icon">do_not_disturb_on</span>
              </Button>
            }
            <Avatar className="group-member-avatar" size={avatarSize} />
            <p>{`${member.firstName} ${member.lastName}`}</p>
          </div>
        ))}
      </ul>
    </Box>
  )
}
