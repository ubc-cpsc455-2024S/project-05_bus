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
import { useLocation, Link } from 'react-router-dom'
import useCurrentUser from '../../hooks/useCurrentUser';
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const { logout } = useAuth0();

  const getPageName = (pathname) => {
    const pageName = pathname.split('/').filter(Boolean)[0];
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  }

  const pageName = getPageName(location.pathname);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  return (
    <div className="container">
      <h1 className="page-name">{pageName}</h1>
      <ButtonGroup className="page-buttons">
        <nav>
          <div className="page-button-container">
            <Button className="page-button" as={Link} to="/home" size="lg">
              <span className="material-symbols-outlined icon">home</span>
            </Button>
            <p className="page-label">Home</p>
          </div>
          <div className="page-button-container">
            <Button className="page-button" as={Link} to="/calendar" size="lg">
              <span className="material-symbols-outlined icon">calendar_month</span>
            </Button>
            <p className="page-label">Calendar</p>
          </div>
          <div className="page-button-container">
            <Button className="page-button" as={Link} to="/groceries" size="lg">
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
            <h2 className="profile-popover-name">{`${currentUser.firstName} ${currentUser.lastName}`}</h2>
          </PopoverHeader>
          <PopoverCloseButton className="profile-popover-close"/>
          <PopoverBody className="profile-popover-links">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Button className='profile-popover-logout' onClick={handleLogout}>Logout</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}