import './Navbar.css'
import { 
  Button,
  ButtonGroup,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation();

  const getPageName = (pathname) => {
    const pageName = pathname.split('/').filter(Boolean)[0] || 'Home';
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  }

  const pageName = getPageName(location.pathname);

  return (
    <div className="container">
      <h1 className="page-name">{pageName}</h1>
      <ButtonGroup className="page-buttons">
        <nav>
          <div className="page-button-container">
            <Button className="page-button" as="a" href="/" size="lg">
              <span className="material-symbols-outlined icon">home</span>
            </Button>
            <p className="page-label">Home</p>
          </div>
          <div className="page-button-container">
            <Button className="page-button" as="a" href="/calendar" size="lg">
              <span className="material-symbols-outlined icon">calendar_month</span>
            </Button>
            <p className="page-label">Calendar</p>
          </div>
          <div className="page-button-container">
            <Button className="page-button" as="a" href="/groceries" size="lg">
              <span className="material-symbols-outlined icon">restaurant</span>
            </Button>
            <p className="page-label">Groceries</p>
          </div>
        </nav>
      </ButtonGroup>
      <Popover placement="right-start" isLazy>
        <PopoverTrigger>
          <Button className="profile-button" size="lg">
            <Avatar 
              size="sm"
              bg="none"
              icon={<span className="icon profile-icon material-symbols-outlined">person</span>}
            />
          </Button>
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