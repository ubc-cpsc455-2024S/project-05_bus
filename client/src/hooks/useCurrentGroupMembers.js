import { useSelector } from 'react-redux';
import useCurrentGroup from './useCurrentGroup';

export default function useCurrentGroupMembers() {
  const currentGroup = useCurrentGroup();
  const memberIDs = new Set(currentGroup.memberIDs);
  const members = useSelector((state) => state.users.users.filter(user => memberIDs.has(user.id)));

  return members;
}
