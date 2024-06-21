import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import LoginSidebar from '../components/Login/LoginSidebar';
import './LoginPage.css';
import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addMember } from '../redux/slices/membersSlice';

export default function SignupPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);  
  const handleConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault()
    const signupData = new FormData(e.currentTarget)

    if (signupData.get('password') === signupData.get('confirmPassword')) {
    const newUser = {
      firstName: signupData.get('firstName'),
      lastName: signupData.get('lastName'),
      email: signupData.get('email'),
      password: signupData.get('password')
    }
    dispatch(addMember(newUser));
    navigate('/');
    } else {
      // temporary alert
      alert('Passwords do not match')
    }
  }

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <LoginSidebar value="Signup"></LoginSidebar>
      </div>
      <form className="login-form" onSubmit={handleSignup}>
        <div className='form-container'>
          <div className='input-container'>
            <div className='input-div'>
              <p className='input-title'><b>First Name</b></p>
              <div>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    placeholder='First name'
                    name="firstName"
                  />
                </InputGroup>
              </div>
            </div>
            <div className='input-div'>
              <p className='input-title'><b>Last Name</b></p>
              <div>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    placeholder='Last name'
                    name="lastName"
                  />
                </InputGroup>
              </div>
            </div>
            <div className='input-div'>
              <p className='input-title'><b>Email</b></p>
              <InputGroup>
                <Input type='text' placeholder='Enter email' name="email" />
              </InputGroup>
            </div>
            <div className='input-div'>
              <p className='input-title'><b>Password</b></p>
              <div>
              <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    name="password"
                />
                <InputRightElement width='6rem'>
                    <Button h='1.75rem' w='5rem' size='sm' onClick={handlePasswordClick}>
                        {showPassword ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
              </div>
            </div>
            <div className='input-div'>
              <p className='input-title'><b>Confirm Password</b></p>
              <div>
              <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm password'
                    name="confirmPassword"
                />
                <InputRightElement width='6rem'>
                    <Button h='1.75rem' w='5rem' size='sm' onClick={handleConfirmPasswordClick}>
                        {showConfirmPassword ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
              </div>
            </div>
          </div>
          <Button className='login-button' colorScheme='teal' type="submit">Sign Up</Button>
          <Button className='register-link' variant="link">
            <ChakraLink as={ReactRouterLink} to='/login'>
              Already have an account?&nbsp;<b>Sign in</b>
            </ChakraLink>
          </Button>
        </div>
      </form>
    </div>

  );
}