import './LoginPage.css';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginSidebar from '../components/Login/LoginSidebar'
import CreateGroupForm from '../components/Groups/CreateGroupForm'
import JoinGroupForm from '../components/Groups/JoinGroupForm'

export default function GroupPage() {
  const currentUserID = useSelector(state => state.users.currentUserID);
  const currentUser = useSelector(state => state.users.users.find(user => user.id === currentUserID));
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.groupID) {
      navigate('/home');
    }
  }, [currentUser.groupID, navigate]);

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <LoginSidebar value="Groups" />
      </div>
      <div className="login-form">
        <CreateGroupForm />
        <JoinGroupForm />
      </div>
    </div>
  );
}
