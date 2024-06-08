import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import LoginSidebar from '../components/Login/LoginSidebar';
import './LoginPage.css';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

export default function SignupPage() {

  function PasswordInput({value}) {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <div>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder={value}
                />
                <InputRightElement width='6rem'>
                    <Button h='1.75rem' w='5rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <LoginSidebar value="Signup"></LoginSidebar>
      </div>
      <div className="login-form">
        <div className='form-container'>
          <div className='input-container'>
          <div className='input-div'>
              <p className='input-title'><b>First Name</b></p>
              <div>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    placeholder='First name'
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
                  />
                </InputGroup>
              </div>
            </div>
            <div className='input-div'>
              <p className='input-title'><b>Email</b></p>
              <InputGroup>
                <Input type='text' placeholder='Enter email' />
              </InputGroup>
            </div>
            <div className='input-div'>
              <p className='input-title'><b>Password</b></p>
              <div>
                <PasswordInput value='Enter Password' />
              </div>
            </div>
            <div className='input-div'>
              <p className='input-title'><b>Confirm Password</b></p>
              <div>
                <PasswordInput value='Confirm Password' />
              </div>
            </div>
          </div>
          <Button className='login-button' colorScheme='teal'>Sign Up</Button>
          <Button className='register-link' variant="link">
            <ChakraLink as={ReactRouterLink} to='/login'>
              Already have an account?&nbsp;<b>Sign in</b>
            </ChakraLink>
          </Button>
        </div>
      </div>
    </div>

  );
}