import { useSelector } from 'react-redux';
import useCurrentUser from './useCurrentUser';

export default function useCurrentGroup() {
  const currentUser = useCurrentUser();
  const currentGroup = useSelector((state) => state.groups.groups.find(group => group._id === currentUser.groupID));

  return currentGroup;
}
