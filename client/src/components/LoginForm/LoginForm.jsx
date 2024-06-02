import React from 'react';
import { Icon, Input, InputGroup, InputRightElement, InputLeftElement, Button, Stack } from '@chakra-ui/react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';

export default function LoginForm() {

    function UsernameInput() {
        return (
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Icon as={PersonOutlineIcon} color='gray.300'/>
                </InputLeftElement>
                <Input type='text' placeholder='Username' />
            </InputGroup>
        );
    }
    
    function PasswordInput() {
        const [show, setShow] = React.useState(false);
        const handleClick = () => setShow(!show);

        return (
            <InputGroup size='md'>
                <InputLeftElement pointerEvents='none'>
                    <Icon as={LockIcon} color='gray.300' />
                </InputLeftElement>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        );
    }

    return (
        <Stack spacing={4} maxW="sm" mx="auto" mt={10}>
            <UsernameInput />
            <PasswordInput />
        </Stack>
    );
}
