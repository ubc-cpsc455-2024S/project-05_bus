import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateGroupForm from '../components/Groups/CreateGroupForm'

export default function CreateGroupPage() {
  const currentUserID = useSelector(state => state.users.currentUserID);
  const currentUser = useSelector(state => state.users.users.find(user => user.id === currentUserID));
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.groupID) {
      navigate('/home');
    }
  }, [currentUser.groupID, navigate]);

  return (
    <>
      <CreateGroupForm></CreateGroupForm>
    </>
  );
}