// https://github.com/auth0-developer-hub/spa_react_javascript_hello-world/blob/basic-authentication/src/pages/callback-page.js

import { useAuth0 } from "@auth0/auth0-react";

export const CallbackPage = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      <div>
        <h1>
          Error
        </h1>
        <p>{error.message}
        </p>
      </div>
    );
  }

  return (
    <h1>Success</h1>
  )
};