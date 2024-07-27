import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import "./LoginForm.css";
import { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUserID } from "../../redux/users/usersSlice";

export default function LoginForm() {
  const users = useSelector((state) => state.users.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateUser = (email, password) => {
    return users.some(
      (user) => user.email === email && user.password === password
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = new FormData(e.currentTarget);
    const email = loginData.get("email");
    const password = loginData.get("password");

    if (validateUser(email, password)) {
      const user = users.find((user) => user.email === email);
      dispatch(setCurrentUserID(user._id));
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  function UsernameInput() {
    return (
      <div>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <span className="login-icon material-symbols-outlined">person</span>
          </InputLeftElement>
          <Input type="text" placeholder="Enter email" name="email" />
        </InputGroup>
      </div>
    );
  }

  function PasswordInput() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
      <div>
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <span className="login-icon material-symbols-outlined">lock</span>
          </InputLeftElement>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
          />
          <InputRightElement width="6rem">
            <Button h="1.75rem" w="5rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
    );
  }

  return (
    <form className="form-container" onSubmit={handleLogin}>
      <div className="input-container">
        <div className="input-div">
          <p className="input-title">
            <b>Email</b>
          </p>
          <UsernameInput />
        </div>
        <div className="input-div">
          <p className="input-title">
            <b>Password</b>
          </p>
          <PasswordInput />
        </div>
      </div>
      <Button className="forgot-password" variant="link">
        Forgot Password?
      </Button>
      <Button type="submit" className="login-button" colorScheme="teal">
        Login
      </Button>
      <Button className="register-link" variant="link">
        <ChakraLink as={ReactRouterLink} to="/signup">
          {"Don't have an account?"}&nbsp;<b>Register</b>
        </ChakraLink>
      </Button>
    </form>
  );
}
