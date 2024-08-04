import { Box, Image, Text } from '@chakra-ui/react'

export const NoAccess = () => {
  return (
    <Box>
      <Text>Sorry, you do not have access to this page!</Text>
      <Image src='/images/roommates-landing.png' alt='Roommates Landing' />
    </Box>
  )
}