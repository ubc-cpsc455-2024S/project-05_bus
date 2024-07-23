import './GroupSettings.css';
import { Box, Avatar } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAdmins } from '../../../selectors/groupsSelectors';

export default function AdminsSettings({ group }) {
  const admins = useSelector((state) => selectAdmins(state, group));

  return (
    <Box className="admins-settings-container">
      <h1 className="admins-settings-heading">Admins</h1>
      <ul>
        {admins.map(admin => (
          <div key={admin._id} className="group-member-container">
            <Avatar className="group-member-avatar" size="sm" />
            <p>{`${admin.firstName} ${admin.lastName}`}</p>
          </div>
        ))}
      </ul>
    </Box>
  )
}
