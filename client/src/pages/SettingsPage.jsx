import './SettingsPage.css';
import { Box, Card, CardHeader, CardBody, CardFooter, Button, Tooltip, Divider } from '@chakra-ui/react';
import GroupNameSettings from '../components/Groups/Settings/GroupNameSettings';
import MembersSettings from '../components/Groups/Settings/MembersSettings';
import AdminsSettings from '../components/Groups/Settings/AdminsSettings';
import useCurrentGroup from '../hooks/useCurrentGroup';
import { useSelector } from 'react-redux';
import { selectIsCurrentUserAdmin } from '../selectors/groupsSelectors';

export default function Settings() {
  const currentGroup = useCurrentGroup();
  const isAdmin = useSelector((state) => selectIsCurrentUserAdmin(state, currentGroup));

  const handleLeaveGroup = () => {

  };

  const handleDeleteGroup = () => {

  };

  return (
    <Box className="settings-container">
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
        </CardFooter>
      </Card>
    </Box>
  )
}