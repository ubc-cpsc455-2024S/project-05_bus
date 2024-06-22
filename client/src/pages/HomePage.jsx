import './HomePage.css';
import HomeGroup from '../components/Home/HomeGroup';
import HomeNotifications from '../components/Home/HomeNotifications';
import useCurrentGroup from '../hooks/useCurrentGroup';

export default function HomePage() {
  const currentGroup = useCurrentGroup();

  return (
    <div className="home-container">
      <HomeNotifications />
      {currentGroup && <HomeGroup group={currentGroup}/>}
    </div>
  )
}