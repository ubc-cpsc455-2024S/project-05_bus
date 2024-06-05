import './Navbar.css';
import { IconButton, ButtonGroup } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <div className="container">
      <ButtonGroup className="page-buttons">
        <nav>
          <IconButton href="/">Home</IconButton>
          <IconButton href="/calendar">Calendar</IconButton>
          <IconButton href="/groceries">Groceries</IconButton>
        </nav>
      </ButtonGroup>
      <IconButton className="profile-button" href="/profile">Profile</IconButton>
    </div>
  )
}

export default Navbar;