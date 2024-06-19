import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import LoginPage from './pages/LoginPage'
import GroceriesPage from './pages/GroceriesPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SignupPage'
import CreateGroupPage from './pages/CreateGroupPage'

export default function Layout() {
  const location = useLocation();
  const noNavbarPaths = ['/login', '/signup'];

  return (
    <>
      {noNavbarPaths.includes(location.pathname) ? null : <Navbar />}
      <div className={noNavbarPaths.includes(location.pathname) ? "" : "navbar-padding"}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/groceries" element={<GroceriesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/group/create" element={<CreateGroupPage />} />
        </Routes>
      </div>
    </>
  );
}
