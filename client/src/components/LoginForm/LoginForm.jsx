import React from 'react';
import { Icon, Input, InputGroup, InputRightElement, InputLeftElement, Button, Stack } from '@chakra-ui/react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import './LoginForm.css';

export default function LoginForm() {

    function UsernameInput() {
        return (
            <div>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <Icon as={PersonOutlineIcon} color='gray.300'/>
                    </InputLeftElement>
                    <Input type='text' placeholder='Enter email' />
                </InputGroup>
            </div>
        );
    }
    
    function PasswordInput() {
        const [show, setShow] = React.useState(false);
        const handleClick = () => setShow(!show);

        return (
            <div>
                <InputGroup size='md'>
                    <InputLeftElement pointerEvents='none'>
                        <Icon as={LockIcon} color='gray.300' />
                    </InputLeftElement>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
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
        <div className='form-container'>
            <div className='input-container'>
                <div className='input-div'>
                    <p className='input-title'><b>Email</b></p>
                    <UsernameInput />
                </div>
                <div className='input-div'>
                    <p className='input-title'><b>Password</b></p>
                    <PasswordInput />
                </div>
            </div>
            <Button className='forgot-password' variant="link">Forgot Password?</Button>
            <Button className='login-button' colorScheme='teal'>Login</Button>
            <Button className='register-link' variant="link">Don't have an account?&nbsp;<b>Register</b></Button>
        </div>
    );
}
