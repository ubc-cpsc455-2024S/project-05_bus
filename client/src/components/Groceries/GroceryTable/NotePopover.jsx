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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateGroceryAsync } from '../../../redux/groceries/thunks';

export default function NotePopover({ groceryItem }) {
  const [note, setNote] = useState(groceryItem.note);
  const [newNote, setNewNote] = useState(groceryItem.note);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSave = () => {
    dispatch(updateGroceryAsync({ ...groceryItem, note }));
  };

  return (
    <Popover isOpen={isOpen} onClose={() => {
      setNote(groceryItem.note);
      onClose();
    }}>
      <PopoverTrigger>
        <Tooltip label="Add Note" placement="auto">
          <IconButton
            aria-label='Note'
            icon={
              <span className='material-symbols-outlined'>sticky_note_2</span>
            }
            bg='transparent'
            onClick={onOpen}
            color={note ? 'teal.500' : 'gray.600'}
            _hover={{ color: 'teal.300' }}
            _active={{ color: 'teal.700' }}
          />
        </Tooltip>
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
