import { useSelector } from 'react-redux';
import useCurrentGroup from './useCurrentGroup';
import { selectGroupMembers } from '../selectors/groupsSelectors';

export default function useCurrentGroupMembers() {
  const currentGroup = useCurrentGroup();
  const members = useSelector((state) => selectGroupMembers(state, currentGroup));

  return members;
}