import { useState } from 'react';
import {
  Input,
  Button,
  Box,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { HexColorPicker } from 'react-colorful';
import { useDispatch } from 'react-redux';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { addChoreAsync } from '../../redux/chores/thunks';
import useCurrentGroup from '../../hooks/useCurrentGroup';

export default function CreateChore() {
  const [newChore, setNewChore] = useState('');
  const [newColor, setNewColor] = useState('#58c1ff');
  const { onOpen, onClose, isOpen } = useDisclosure();
  const group = useCurrentGroup();

  const dispatch = useDispatch();

  const addNewChore = () => {
    if (newChore.trim() !== '') {
      dispatch(addChoreAsync({ title: newChore, colour: newColor, groupID: group._id}));
      setNewChore('');
    }
  };

  return (
    <Box mt={4} display='flex' position='relative' w='100%'>
      <Input
        value={newChore}
        onChange={(e) => setNewChore(e.target.value)}
        placeholder='New Chore'
        marginRight={2}
        flexGrow={1}
        _placeholder={{ color: 'gray.600' }}
        color='gray.700'
      />
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement='bottom'
      >
        <PopoverTrigger>
          <IconButton icon={<EditIcon />} bg={newColor} />
        </PopoverTrigger>
        <PopoverContent
          boxShadow='md'
          border={0}
          w='auto'
          bg='white'
        >
          <PopoverArrow bg='teal' borderColor='teal' />
          <PopoverCloseButton />
          <HexColorPicker color={newColor} onChange={setNewColor} />
        </PopoverContent>
      </Popover>
      <Button
        onClick={addNewChore}
        colorScheme='teal'
        ml={2}
        p={4}
        boxShadow='0 2px 6px rgba(0, 0, 0, 0.3)'
      >
        <AddIcon />
      </Button>
    </Box>
  );
}
