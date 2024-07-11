import { useSelector } from 'react-redux';

export default function useCurrentUser() {
  const currentUserID = useSelector(state => state.users.currentUserID);
  const currentUser = useSelector(state => state.users.users.find(user => user._id === currentUserID));

  return currentUser;
}
