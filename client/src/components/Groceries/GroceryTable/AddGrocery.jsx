import { useState } from 'react';
import {
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Text,
  Select,
} from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { AddIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  handleCreateCategory,
  handleCreateLocation,
  isValidNewCategory,
  isValidNewLocation,
} from '../utils/CreateNewSelectOptions';
import useCurrentGroup from '../../../hooks/useCurrentGroup';
import useCurrentGroupMembers from '../../../hooks/useCurrentGroupMembers';
import { addGroceryAsync } from '../../../redux/groceries/thunks';
import Scanner from '../Scanner/Scanner';
import { COMMON_UNITS } from '../utils/commonUnits';

export default function AddGrocery() {
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const dispatch = useDispatch();
  const group = useCurrentGroup();
  const members = useCurrentGroupMembers();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [quantityUnit, setQuantityUnit] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerType, setScannerType] = useState(null);

  const openScanner = (type) => {
    setScannerType(type);
    setIsScannerOpen(true);
  };

  const closeScanner = () => {
    setScannerType(null);
    setIsScannerOpen(false);
  };

  const [errors, setErrors] = useState({});

  const handleAdd = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (quantity <= 0) newErrors.quantity = 'Cannot be 0';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(
        addGroceryAsync({
          name,
          locationId: location,
          categoryId: category,
          expiryDate,
          quantity,
          quantityUnit,
          ownerId,
          groupID: group._id,
        })
      );
      toast({
        title: 'Grocery Added',
        description: `${name}${
          quantity > 1 ? '\'s' : ''
        } has been added to the ${
          locations.find((l) => l._id === location).name
        }`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      resetFields();
    }
  };

  const resetFields = () => {
    setName('');
    setLocation('');
    setCategory('');
    setExpiryDate('');
    setQuantity(0);
  };

  return (
    <HStack spacing={2} display='flex' justifyContent='space-between' width='100%'>
      <FormControl flex={1} isInvalid={errors.name}>
        <FormErrorMessage position='absolute' bottom='100%' left='0'>
          {errors.name}
        </FormErrorMessage>
        <Input
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl flex={1}>
        <CreatableSelect
          placeholder='Location'
          options={locations.map((loc) => ({
            value: loc._id,
            label: loc.name,
          }))}
          onChange={(option) => setLocation(option.value)}
          isValidNewOption={(input) => isValidNewLocation(input, locations)}
          menuPlacement='auto'
          onCreateOption={(input) =>
            handleCreateLocation(input, dispatch, group._id)
          }
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              width: '16px',
            }),
          }}
        />
      </FormControl>

      <FormControl flex={1}>
        <CreatableSelect
          placeholder='Category'
          options={categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          onChange={(option) => setCategory(option.value)}
          isValidNewOption={(input) => isValidNewCategory(input, categories)}
          menuPlacement='auto'
          onCreateOption={(input) =>
            handleCreateCategory(input, dispatch, group._id)
          }
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              width: '16px',
            }),
          }}
        />
      </FormControl>

      <FormControl flex={1}>
        <Input
          placeholder='Expiry Date'
          type='date'
          value={
            expiryDate ? moment(expiryDate).format('YYYY-MM-DD') : ''
          }
          onChange={(e) => setExpiryDate(moment(e.target.value))}
        />
      </FormControl>

      <FormControl flex={1}>
        <Select
          placeholder='Owner'
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value === '' ? null : e.target.value)}
        >
          <option value={''}>Shared</option>
          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {`${member.firstName} ${member.lastName}`}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isInvalid={errors.quantity} flex={1}>
        <FormErrorMessage position='absolute' bottom='100%' left='0'>
          {errors.quantity}
        </FormErrorMessage>
        <HStack display='flex' spacing={2}>
          <NumberInput
            placeholder='Quantity'
            value={quantity}
            onChange={(value) => setQuantity(value)}
            min={0}
            flex={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            placeholder='Unit'
            value={quantityUnit}
            onChange={(e) => setQuantityUnit(e.target.value)}
            flex={1}
          >
            {COMMON_UNITS.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </Select>
        </HStack>
      </FormControl>

      <Menu isOpen={isOpen}>
        <MenuButton
          as={Button}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          onClick={handleAdd}
        >
          <AddIcon />
        </MenuButton>
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
          <MenuItem
            onClick={() => openScanner('Receipt')}
            icon={
              <Text color='gray.600' className='material-symbols-outlined'>
                receipt_long
              </Text>
            }
          >
            Scan Receipt
          </MenuItem>
          <MenuItem
            onClick={() => openScanner('Groceries')}
            icon={
              <Text color='gray.600' className='material-symbols-outlined'>
                grocery
              </Text>
            }
          >
            Scan Food Items
          </MenuItem>
        </MenuList>
      </Menu>
      <Scanner
        isOpen={isScannerOpen}
        onClose={closeScanner}
        type={scannerType}
      />
    </HStack>
  );
}
