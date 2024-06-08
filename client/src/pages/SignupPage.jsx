import { Box, Button, Input, InputGroup, Stack } from '@chakra-ui/react';
import LoginSidebar from '../components/Login/LoginSidebar';
import './LoginPage.css';

export default function SignupPage() {

  return (
    // <>
    //   <LoginSidebar value="Signup"></LoginSidebar>
    //   <Stack>
    //     <Input />
    //     <Input />
    //     <Input />
    //     <Input />
    //   </Stack>
    // </>


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
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    placeholder='Enter password'
                  />
                </InputGroup>
              </div>
            </div>
            <div className='input-div'>
              <p className='input-title'><b>Confirm Password</b></p>
              <div>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    placeholder='Confirm password'
                  />
                </InputGroup>
              </div>
            </div>
          </div>
          <Button className='login-button' colorScheme='teal'>Sign Up</Button>
          <Button className='register-link' variant="link">{"Already have an account?"}&nbsp;<b>Sign in</b></Button>
        </div>
      </div>
    </div>

  );
}