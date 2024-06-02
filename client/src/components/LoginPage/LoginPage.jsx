import LoginForm from '../LoginForm/LoginForm';
import LoginSidebar from '../LoginSidebar/LoginSidebar';
import './LoginPage.css';

const LoginPage = () => {

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <LoginSidebar value="Login"></LoginSidebar>
      </div>
      <div className="login-form">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;