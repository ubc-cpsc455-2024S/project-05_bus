import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CreateGroupForm from '../components/Groups/CreateGroupForm'

export default function CreateGroupPage() {
  const currentUser = useSelector(state => state.users.currentUser);
  const navigate = useNavigate();

  if (currentUser.groupID) {
    navigate('/home');
  }

  return (
    <>
      <CreateGroupForm></CreateGroupForm>
    </>
  );
}