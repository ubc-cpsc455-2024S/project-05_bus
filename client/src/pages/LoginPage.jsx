import LoginForm from '../components/Login/LoginForm';
import LoginSidebar from '../components/Login/LoginSidebar';
import './LoginPage.css';

export default function LoginPage() {

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