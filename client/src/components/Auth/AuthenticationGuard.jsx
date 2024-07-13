import { withAuthenticationRequired } from "@auth0/auth0-react";
import { NoAccess } from "./NoAccess";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => ( 
      <NoAccess />
    ),
  });

  return <Component />;
};