import './Navbar.css'
import { 
  IconButton,
  ButtonGroup,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { Home, CalendarMonth, Restaurant, Person } from '@mui/icons-material'

const Navbar = () => {
  return (
    <div className="container">
      <ButtonGroup className="page-buttons">
        <nav>
          <IconButton className="page-button" as="a" href="/" icon={<Home sx={{fontSize: 30}}/>} size="lg" />
          <IconButton className="page-button" as="a" href="/calendar" icon={<CalendarMonth sx={{fontSize: 30}}/>} size="lg"/>
          <IconButton className="page-button" as="a" href="/groceries" icon={<Restaurant sx={{fontSize: 30}}/>} size="lg"/>
        </nav>
      </ButtonGroup>
      <Popover placement="right-start" isLazy>
        <PopoverTrigger>
          <IconButton 
          className="profile-button"
          icon={<Avatar size="sm" bg="none" icon={<Person className="default-user-icon" sx={{fontSize: 30}}/>} />} 
          size="lg"
          />
        </PopoverTrigger>
        <PopoverContent className="profile-popover-content">
          <PopoverHeader className="profile-popover-header">
            <Avatar className="profile-popover-avatar" size="sm" />
            <h2 className="profile-popover-name">John Doe</h2>
          </PopoverHeader>
          <PopoverCloseButton className="profile-popover-close"/>
          <PopoverBody className="profile-popover-links">
            <a href="/profile">Profile</a>
            <a href="/settings">Settings</a>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Navbar;