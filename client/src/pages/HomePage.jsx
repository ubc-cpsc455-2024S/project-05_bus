import HomeGroup from '../components/Home/HomeGroup'
import { useSelector } from 'react-redux';

export default function HomePage() {
  const currentUserID = useSelector(state => state.users.currentUserID);
  const currentUser = useSelector(state => state.users.users.find(user => user.id == currentUserID));
  const group = useSelector(state => state.groups.groups.find(group => group.id == currentUser.groupID));

  return (
    <div>
      {group && <HomeGroup group={group}/>}
    </div>
  )
}