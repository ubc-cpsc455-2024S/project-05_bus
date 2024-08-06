import './SettingsPage.css';
import { Box, Card, CardHeader, CardBody, CardFooter, Button, Tooltip, Divider, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import GroupNameSettings from '../components/Groups/Settings/GroupNameSettings';
import MembersSettings from '../components/Groups/Settings/MembersSettings';
import AdminsSettings from '../components/Groups/Settings/AdminsSettings';
import useCurrentGroup from '../hooks/useCurrentGroup';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsCurrentUserAdmin } from '../selectors/groupsSelectors';
import { deleteGroupAsync, removeMemberAsync, updateGroupNameAsync } from '../redux/groups/thunks';

function LeaveGroupModal({ isOnlyMember, isOnlyAdmin, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isOnlyMember ? (
            <Text>You are the only member of this group. Leaving the group will delete it. Are you sure you want to leave?</Text>
          ) : isOnlyAdmin ? (
            <Text>You are the only admin in this group. Please assign another admin before leaving.</Text>
          ) : (
            <Text>Are you sure you want to leave this group?</Text>
          )}
        </ModalBody>
        <ModalFooter>
          {!isOnlyAdmin || isOnlyMember ? (
            <Button 
              bgColor={'rgba(253, 163, 163, 0.631)'}
              _hover={{background: 'rgba(246, 134, 134, 0.631)'}}
              mr={3}
              onClick={onConfirm}
            >
              Confirm
            </Button>
          ) : null}
          <Button variant='outline' onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}


function DeleteGroupAlert({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this group? This action cannot be undone.</Text>
        </ModalBody>
        <ModalFooter>
          <Button 
            bgColor={'rgba(253, 163, 163, 0.631)'}
            _hover={{background: 'rgba(246, 134, 134, 0.631)'}}
            mr={3}
            onClick={onConfirm}
          >
            Delete Group
          </Button>
          <Button variant='outline' onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentGroup = useCurrentGroup();
  const currentUserID = useSelector((state) => state.users.currentUserID);
  const isAdmin = useSelector((state) => selectIsCurrentUserAdmin(state, currentGroup));
  const isOnlyMember = currentGroup ? currentGroup.memberIDs.length === 1 : null;
  const isOnlyAdmin = currentGroup ? isAdmin && currentGroup.adminIDs.length === 1 : null;
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [groupName, setGroupName] = useState(currentGroup ? currentGroup.name : null);

  const { isOpen: isLeaveGroupOpen, onOpen: openLeaveGroupModal, onClose: closeLeaveGroupModal } = useDisclosure();
  const { isOpen: isDeleteGroupOpen, onOpen: openDeleteGroupModal, onClose: closeDeleteGroupModal } = useDisclosure();

  useEffect(() => {
    if (!currentGroup) {
      navigate('/groups');
    }
  }, [currentGroup, navigate]);

  const handleLeaveGroup = async () => {
    setError('');

    if (isOnlyMember) {
      return await handleDeleteGroup();
    } else {
      try {
        await dispatch(removeMemberAsync({ groupID: currentGroup._id, userID: currentUserID })).unwrap();
      } catch (error) {
        setError('Could not remove user from group');
      }
    }
    closeLeaveGroupModal();
  };

  const handleDeleteGroup = async () => {
    setError('');

    try {
      await dispatch(deleteGroupAsync({groupID: currentGroup._id, currentUserID})).unwrap();
    } catch (error) {
      setError('Could not delete group');
    }
  };

  const handleSave = async () => {
    setError('');

    try {
      if (groupName !== currentGroup.name) {
        await dispatch(updateGroupNameAsync({id: currentGroup._id, newName: groupName})).unwrap();
      }
      setIsEditMode(false);
    } catch (error) {
      setError('Could not save changes');
    }
  };

  return (
    <Box className='settings-container'>
      {currentGroup && 
        <div>
          <Card className='group-settings-card'>
            <CardHeader>
              <div className='group-settings-header'>
                <div className='group-settings-heading'>
                  <span className='material-symbols-outlined settings-group-icon icon'>house</span>
                  <h1 className='group-settings-heading-text'>Group Settings</h1>
                </div>
                <div className='group-settings-edit-container'>
                  {isEditMode ? 
                    <Button className='group-settings-edit-button' onClick={handleSave}>
                      <span className='material-symbols-outlined group-settings-done-icon'>priority</span>
                    </Button>
                    :
                    <Tooltip label='Only admins can edit groups.' isDisabled={isAdmin}>
                      <Button className='group-settings-edit-button' isDisabled={!isAdmin} onClick={() => setIsEditMode(true)}>
                        <span className='material-symbols-outlined group-settings-edit-icon'>edit_square</span>
                      </Button>
                    </Tooltip>
                  }
                </div>
              </div>
            </CardHeader>
            <CardBody className='home-card-body'>
              <GroupNameSettings 
                group={currentGroup}
                isEditMode={isEditMode}
                groupName={groupName}
                setGroupName={setGroupName}
              />
              <Divider borderColor='rgba(0, 128, 128, 0.631)' borderRadius='5px'/>
              <MembersSettings 
                isEditMode={isEditMode}
                currentUserID={currentUserID}
                currentGroup={currentGroup}
                openLeaveGroupModal={openLeaveGroupModal} 
                setError={setError}
              />
              <Divider borderColor='rgba(0, 128, 128, 0.631)' borderRadius='5px'/>
              <AdminsSettings 
                group={currentGroup}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                currentUserID={currentUserID}
                currentGroup={currentGroup}
                setError={setError}
              />
            </CardBody>
            <CardFooter className='group-settings-footer'>
              <Button borderColor="teal.600" color="teal.600" variant="outline" _hover={{ bg: 'teal.700', borderColor: 'teal.700', color: 'white' }} onClick={openLeaveGroupModal}>
                Leave Group
              </Button>
              <Tooltip label='Only admins can delete groups.' isDisabled={isAdmin}>
                <Button 
                  isDisabled={!isAdmin} 
                  bg="brand.red" color="white" _hover={({ bg: 'brand.pink' })}
                  onClick={openDeleteGroupModal}
                >
                  Delete Group
                </Button>
              </Tooltip>
              {error && (
                <Text color='brand.red' mb='10px'>
                  {error}
                </Text>
              )}
            </CardFooter>
          </Card>

          <LeaveGroupModal 
            isOpen={isLeaveGroupOpen} 
            onClose={closeLeaveGroupModal}
            onConfirm={async () => {
              closeLeaveGroupModal();
              await handleLeaveGroup();
            }}
            isOnlyMember={isOnlyMember}
            isOnlyAdmin={isOnlyAdmin}
          />

          <DeleteGroupAlert 
            isOpen={isDeleteGroupOpen} 
            onClose={closeDeleteGroupModal} 
            onConfirm={async () => {
              closeDeleteGroupModal();
              await handleDeleteGroup();
            }}
          />
        </div>
      }
    </Box>
  );
}