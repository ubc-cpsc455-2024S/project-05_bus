import './Navbar.css';
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
} from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const location = useLocation();
  const currentUserName = useSelector(state => state.users.currentUserName);
  const { user, isAuthenticated, logout } = useAuth0();

  const getPageName = (pathname) => {
    const pageName = pathname.split('/').filter(Boolean)[0];
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  const pageName = getPageName(location.pathname);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const buttonSize = { base: 'xs', sm: 'sm', md: 'md', lg: 'lg'};

  return (
    isAuthenticated && (<div className="container">
      <h1 className="page-name">{pageName}</h1>
      <ButtonGroup className="page-buttons">
        <nav>
          <div className="page-button-container">
            <Button className="page-button" as={Link} to="/home" size={buttonSize}>
              <span className="material-symbols-outlined page-icon">home</span>
            </Button>
            <p className="page-label">Home</p>
          </div>
          <div className="page-button-container">
            <Button className="page-button" as={Link} to="/calendar" size={buttonSize}>
              <span className="material-symbols-outlined page-icon">calendar_month</span>
            </Button>
            <p className="page-label">Calendar</p>
          </div>
          <div className="page-button-container">
            <Button className="page-button" as={Link} to="/groceries" size={buttonSize}>
              <span className="material-symbols-outlined page-icon">restaurant</span>
            </Button>
            <p className="page-label">Groceries</p>
          </div>
        </nav>
      </ButtonGroup>
      <Popover placement="right-start" isLazy>
        <PopoverTrigger>
          <Button className="profile-button" size={buttonSize}>
            <Avatar 
              size="sm"
              bg="none"
              icon={<span className="profile-icon material-symbols-outlined">person</span>}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="profile-popover-content">
          <PopoverHeader className="profile-popover-header">
            <Avatar className="profile-popover-avatar" size="sm" />
            <h2 className="profile-popover-name">{`${currentUserName}`}</h2>
          </PopoverHeader>
          <PopoverCloseButton className="profile-popover-close"/>
          <PopoverBody className="profile-popover-links">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Group Settings</Link>
            <Button className='profile-popover-logout' bg="brand.red" color="white" _hover={({ bg: 'brand.pink' })} size="sm" onClick={handleLogout}>Logout</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>)
    
  );
}