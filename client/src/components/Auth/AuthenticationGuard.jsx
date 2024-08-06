import { withAuthenticationRequired } from '@auth0/auth0-react';
import { PageLoader } from './PageLoader';

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <PageLoader />
    ),
    returnTo: window.location.origin,
  });

  return <Component />;
};