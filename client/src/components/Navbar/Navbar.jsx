import './Navbar.css';
import { IconButton, ButtonGroup, Avatar } from '@chakra-ui/react'
import { Home, CalendarMonth, Restaurant, Person } from '@mui/icons-material'

const Navbar = () => {
  return (
    <div className="container">
      <ButtonGroup className="page-buttons">
        <nav>
          <IconButton href="/" icon={<Home sx={{fontSize: 30}}/>} size="lg" />
          <IconButton href="/calendar" icon={<CalendarMonth sx={{fontSize: 30}}/>} size="lg"/>
          <IconButton href="/groceries" icon={<Restaurant sx={{fontSize: 30}}/>} size="lg"/>
        </nav>
      </ButtonGroup>
      <IconButton 
        href="/profile"
        className="profile-button"
        icon={<Avatar size="sm" bg="none" icon={<Person className="default-user-icon" sx={{fontSize: 30}}/>} />} 
        size="lg"
        />
    </div>
  )
}

export default Navbar;