import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postUserByEmailAsync } from '../redux/users/thunks';
import { setCurrentUserID, setCurrentUserName } from '../redux/users/usersSlice';
import { setSelectedMemberID } from '../redux/groups/groupsSlice';
import { persistor } from '../redux/store';

export function CallbackPage() {
  const { user, isAuthenticated, isLoading, error, logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleError = async () => {
    await persistor.purge();
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    navigate('/');
  };

  const handleSuccess = () => {
    navigate('/home');
  };

  const handleNoName = () => {
    navigate('/profile-creation');
  };

  useEffect(() => {
    const handleAuth = async () => {
      if (!isLoading) {
        try {
          if (isAuthenticated && user) {
            const newUser = await dispatch(postUserByEmailAsync(user.email)).unwrap();
            dispatch(setCurrentUserID(newUser._id));
            dispatch(setSelectedMemberID(newUser._id));
            const name = newUser.firstName + ' ' + newUser.lastName;
            dispatch(setCurrentUserName(name));
            navigate('/home');
          }
        } catch (error) {
          console.error('Error processing user after login:', error);
          handleNoName();
        }
      }
    };

    handleAuth();
  }, [isAuthenticated, isLoading, user, dispatch, navigate]);

  if (error) {
    return (
      <>
        {handleError()}
      </>
    );
  } else {
    return (
      <>
        {handleSuccess()}
      </>
    );
  }
}