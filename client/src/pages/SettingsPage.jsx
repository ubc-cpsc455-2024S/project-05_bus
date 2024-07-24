import './SettingsPage.css';
import { Box, Card, CardHeader, CardBody, CardFooter, Button, Tooltip, Divider, Text } from '@chakra-ui/react';
import GroupNameSettings from '../components/Groups/Settings/GroupNameSettings';
import MembersSettings from '../components/Groups/Settings/MembersSettings';
import AdminsSettings from '../components/Groups/Settings/AdminsSettings';
import useCurrentGroup from '../hooks/useCurrentGroup';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsCurrentUserAdmin } from '../selectors/groupsSelectors';
import { deleteGroupAsync, removeMemberAsync } from '../redux/groups/thunks';

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentGroup = useCurrentGroup();
  const currentUserID = useSelector((state) => state.users.currentUserID);
  const isAdmin = useSelector((state) => selectIsCurrentUserAdmin(state, currentGroup));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentGroup) {
      navigate('/groups');
    }
  }, [currentGroup, navigate]);

  const handleLeaveGroup = async () => {
    try {
      await dispatch(removeMemberAsync({groupID: currentGroup._id, userID: currentUserID})).unwrap();
    } catch (error) {
      setError('Could not remove user from group');
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await dispatch(deleteGroupAsync({groupID: currentGroup._id, currentUserID})).unwrap();
    } catch (error) {
      setError('Could not delete group');
    }
  };

  return (
    <Box className="settings-container">
      {currentGroup && 
        <Card className="group-settings-card">
          <CardHeader>
            <div className="group-settings-header">
              <div className="group-settings-heading">
                <span className="material-symbols-outlined settings-group-icon icon">house</span>
                <h1 className="group-settings-heading-text">Group Settings</h1>
              </div>
              <div className="group-settings-edit-container">
                <Tooltip label="Only admins can edit groups." isDisabled={isAdmin}>
                  <Button className="group-settings-edit-button" isDisabled={!isAdmin}>
                    <span className="material-symbols-outlined group-settings-edit-icon">edit_square</span>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardHeader>
          <CardBody className="home-card-body">
            <GroupNameSettings group={currentGroup}/>
            <Divider borderColor="rgba(0, 128, 128, 0.631)" borderRadius="5px"/>
            <MembersSettings />
            <Divider borderColor="rgba(0, 128, 128, 0.631)" borderRadius="5px"/>
            <AdminsSettings group={currentGroup}/>
          </CardBody>
          <CardFooter className="group-settings-footer">
            <Button className="group-settings-leave-button" onClick={handleLeaveGroup}>
              Leave Group
            </Button>
            <Tooltip label="Only admins can delete groups." isDisabled={isAdmin}>
              <Button 
                className="group-settings-delete-button" 
                isDisabled={!isAdmin} 
                bgColor={"rgba(253, 163, 163, 0.631)"} 
                _hover={{background: "rgba(246, 134, 134, 0.631)"}}
                onClick={handleDeleteGroup}
              >
                Delete Group
              </Button>
            </Tooltip>
            {error && (
              <Text color="red.500" mb="10px">
                {error}
              </Text>
            )}
          </CardFooter>
        </Card>
      }
    </Box>
  )
}