import { Input, InputGroup, InputRightElement, InputLeftElement, Button } from '@chakra-ui/react';
import './LoginForm.css';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

export default function LoginForm() {

    function UsernameInput() {
        return (
            <div>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <span className='login-icon material-symbols-outlined'>person</span>
                    </InputLeftElement>
                    <Input type='text' placeholder='Enter email' />
                </InputGroup>
            </div>
        );
    }
    
    function PasswordInput() {
        const [show, setShow] = useState(false);
        const handleClick = () => setShow(!show);

        return (
            <div>
                <InputGroup size='md'>
                    <InputLeftElement pointerEvents='none'>
                        <span className='login-icon material-symbols-outlined'>lock</span>
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
            <Button className='register-link' variant="link">
                <ChakraLink as={ReactRouterLink} to='/signup'>
                    {"Don't have an account?"}&nbsp;<b>Register</b>
                </ChakraLink>
            </Button>
        </div>
    );
}
