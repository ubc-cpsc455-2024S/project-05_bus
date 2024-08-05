import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticationGuard } from './components/Auth/AuthenticationGuard';
import HomePage from './pages/HomePage';
import { CallbackPage } from './pages/CallbackPage';
import CalendarPage from './pages/CalendarPage';
import GroceriesPage from './pages/GroceriesPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';
import GroupsPage from './pages/GroupsPage';
import { PageLoader } from './components/Auth/PageLoader';
import ProfileCreationPage from './pages/ProfileCreationPage';
import useCurrentUser from './hooks/useCurrentUser';

export default function Layout() {
  const location = useLocation();
  const noNavbarPaths = ['/', '/loading', '/profile-creation', '/groups'];
  const { isLoading } = useAuth0();

  const GroupPrivateRoutes = () => {
    const currentUser = useCurrentUser();
    return currentUser.groupID ? <Outlet /> : <Navigate to='/groups' />;
  };
  
  if (isLoading) {
    return (
      <PageLoader />
    );
  }

  return (
    <>
      {noNavbarPaths.includes(location.pathname) ? null : <Navbar />}
      <div className={noNavbarPaths.includes(location.pathname) ? '' : 'navbar-padding'}>
        <Routes>
          <Route element={<GroupPrivateRoutes />} >
            <Route path='/home' element={<AuthenticationGuard component={HomePage} />} />
            <Route path='/calendar' element={<AuthenticationGuard component={CalendarPage} />} />
            <Route path='/groceries' element={<AuthenticationGuard component={GroceriesPage} />} />
            <Route path='/profile' element={<AuthenticationGuard component={ProfilePage} />} />
            <Route path='/settings' element={<AuthenticationGuard component={SettingsPage} />} />
          </Route>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/loading' element={<PageLoader />} />
          <Route path='/callback' element={<CallbackPage />} />
          <Route path='profile-creation' element={<AuthenticationGuard component={ProfileCreationPage} />} />
          <Route path='/groups' element={<AuthenticationGuard component={GroupsPage} />} />
        </Routes>
      </div>
    </>
  );
}
