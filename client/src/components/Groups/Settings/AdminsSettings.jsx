import './GroupSettings.css';
import { Box, Avatar, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, Select } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdmins, selectGroupMembersExcludingAdmins } from '../../../selectors/groupsSelectors';
import { addAdminAsync, removeAdminAsync } from '../../../redux/groups/thunks';
import { useEffect, useState } from 'react';

export default function AdminsSettings({ group, isEditMode, setIsEditMode, currentUserID, currentGroup, setError }) {
  const dispatch = useDispatch();
  const admins = useSelector((state) => selectAdmins(state, group));
  const members = useSelector((state) => selectGroupMembersExcludingAdmins(state, group));
  const [isRemoveAdminModalOpen, setRemoveAdminModalOpen] = useState(false);
  const [isOnlyAdmin, setIsOnlyAdmin] = useState(admins.length === 1);
  const [selectedMember, setSelectedMember] = useState('');

  useEffect(() => {
    setIsOnlyAdmin(admins.length === 1);
  }, [admins]);

  const handleRemoveClick = async (id) => {
    setError('');

    if (id === currentUserID) {
      setRemoveAdminModalOpen(true);
    } else {
      handleRemoveAdmin(id);
    }
  };

  const handleRemoveAdmin = async (id) => {
    setError('');

    try {
      await dispatch(removeAdminAsync({ groupID: currentGroup._id, userID: id })).unwrap();
    } catch (error) {
      setError('Could not remove admin from group');
    }
  };

  const handleConfirmRemoveAdmin = async () => {
    setRemoveAdminModalOpen(false);

    if (!isOnlyAdmin) {
      handleRemoveAdmin(currentUserID);
      setIsEditMode(false);
    }
  };

  const handleAddAdmin = async () => {
    setError('');

    if (selectedMember) {
      try {
        await dispatch(addAdminAsync({ groupID: currentGroup._id, userID: selectedMember })).unwrap();
        setSelectedMember('');
      } catch (error) {
        setError('Could not add member as admin');
      }
    }
  };

  return (
    <Box className='admins-settings-container'>
      <h1 className='admins-settings-heading'>Admins</h1>
      <ul>
        {admins.map(admin => (
          <div key={admin._id} className='group-member-container'>
            {isEditMode &&
              <Button className='remove-button' onClick={() => handleRemoveClick(admin._id)} ml={2} size='sm'>
                <span className='material-symbols-outlined remove-icon'>do_not_disturb_on</span>
              </Button>
            }
            <Avatar className='group-member-avatar' size='sm' />
            <p>{`${admin.firstName} ${admin.lastName}`}</p>
          </div>
        ))}
      </ul>
      {isEditMode && (
        <div className='add-admin-container'>
          <Select w='200px' placeholder='Select member' value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
            {members.map(member => (
              <option key={member._id} value={member._id}>
                {`${member.firstName} ${member.lastName}`}
              </option>
            ))}
          </Select>
          <Button className='add-button' onClick={handleAddAdmin} ml={2} size='sm'>
            <span className='material-symbols-outlined add-icon'>add_circle</span>
          </Button>
        </div>
      )}
      <Modal isOpen={isRemoveAdminModalOpen} onClose={() => setRemoveAdminModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isOnlyAdmin ? (
              <Text>You are the only admin in this group. Please assign another admin before removing yourself.</Text>
            ) : (
              <Text>Are you sure you want to remove yourself as an admin? You will lose admin access to this group.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            {!isOnlyAdmin && (
              <Button
                bgColor={'rgba(253, 163, 163, 0.631)'}
                _hover={{background: 'brand.red', color: 'white'}}
                mr={3}
                onClick={handleConfirmRemoveAdmin}
              >
                Confirm
              </Button>
            )}
            <Button variant='outline' onClick={() => setRemoveAdminModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
