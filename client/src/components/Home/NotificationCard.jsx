import { Box, Text, IconButton, VStack, HStack, useBoolean, Tooltip } from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import moment from 'moment';
import ChoreBadge from '../Calendar/ChoreBadge';
import { BellIcon } from '@chakra-ui/icons';
import useCurrentGroupMembers from '../../hooks/useCurrentGroupMembers';

const getTransform = (isOpen, isHovered) => {
  if (isOpen) {
    return isHovered ? 'translateX(-40px) scale(1.02)' : 'translateX(-40px)';
  }
  return isHovered ? 'scale(1.02)' : 'translateX(0)';
};

export default function NotificationCard({ event, onDismiss, onDone }) {
  const [isOpen, setIsOpen] = useBoolean();
  const [isHovered, setIsHovered] = useBoolean();

  const members = useCurrentGroupMembers();
  const reminder = event.extendedProps?.reminder;
  const reminderUser = members.find((member) => member._id === reminder?.senderId);

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p={4}
      boxShadow='md'
      bg='white'
      w='100%'
      position='relative'
      cursor='pointer'
      transition='transform 0.3s ease'
      transform={getTransform(isOpen, isHovered)}
      onClick={setIsOpen.toggle}
      onMouseEnter={setIsHovered.on}
      onMouseLeave={setIsHovered.off}
      display='flex'
      alignItems='center'
    >
      {reminder && (
        <Tooltip label={`Reminded by ${reminderUser?.firstName} ${moment(reminder.sendDate).fromNow()}`}>
          <Box position='absolute' top='-15px' left='-10px'>
            <BellIcon color='blue.500'  boxSize={6}/>
          </Box>
        </Tooltip>
      )}
      <Box
        flex='1'
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
          transition='transform 0.3s ease'
        >
          <Text fontWeight='bold' fontSize='lg'>
            {event.title}
          </Text>
          <HStack>
            <Text color='gray.500' fontSize='sm'>
              {moment(event.start).fromNow()}
            </Text>
            <ChoreBadge chore={event} />
          </HStack>
        </Box>
      </Box>
      {isOpen && (
        <VStack
          position='absolute'
          right='-40px'
          top='50%'
          transform='translateY(-50%)'
          spacing={2}
          height='100%'
          justifyContent='center'
        >
          <IconButton
            icon={<CloseIcon />}
            size='xs'
            onClick={() => onDismiss(event)}
            aria-label='Dismiss notification'
            colorScheme='red'
          />
          <IconButton
            icon={<CheckIcon />}
            size='xs'
            onClick={() => onDone(event)}
            aria-label='Mark as done'
            colorScheme='green'
          />
        </VStack>
      )}
    </Box>
  );
}