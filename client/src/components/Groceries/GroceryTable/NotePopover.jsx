import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  IconButton,
  Textarea,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateGroceryAsync } from '../../../redux/groceries/thunks';

export default function NotePopover({ groceryItem }) {
  const [note, setNote] = useState(groceryItem.note);
  const [newNote, setNewNote] = useState(groceryItem.note);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateGroceryAsync({ ...groceryItem, note }));
  };

  return (
    <Popover onClose={() => setNote(groceryItem.note)}>
      <PopoverTrigger>
        <IconButton
          aria-label='Notifications'
          icon={
            <span className='material-symbols-outlined'>sticky_note_2</span>
          }
          bg='transparent'
          color={note ? 'teal.500' : 'gray.600'}
          _hover={{ color: 'teal.300' }}
          _active={{ color: 'teal.700' }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <Flex justifyContent='space-between' alignItems='center'>
            Note
            <Spacer />
            <Button
              className='material-symbols-outlined'
              onClick={handleSave}
              size='sm'
              h='1.75rem'
              mr={2}
              isDisabled={note === newNote}
            >
              Save
            </Button>
            <PopoverCloseButton position='static' size='sm' />
          </Flex>
        </PopoverHeader>
        <PopoverBody>
          <Textarea
            variant='flushed'
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
