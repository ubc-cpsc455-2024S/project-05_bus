import { useState } from 'react';
import {
  Button,
  HStack,
  FormControl,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
} from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import useCurrentGroupMembers from '../../../hooks/useCurrentGroupMembers';
import { COMMON_UNITS } from '../utils/commonUnits';
import {
  handleCreateCategory,
  isValidNewCategory,
  handleCreateLocation,
  isValidNewLocation,
} from '../utils/CreateNewSelectOptions';
import useCurrentGroup from '../../../hooks/useCurrentGroup';

export default function GroceryRow({ index, grocery, setUpdatedGrocery, onDelete }) {
  const [name, setName] = useState(grocery.name || '');
  const [locationId, setLocationId] = useState(grocery.locationId || undefined);
  const [categoryId, setCategoryId] = useState(grocery.categoryId || undefined);
  const [expiryDate, setExpiryDate] = useState(grocery.expiryDate || undefined);
  const [quantity, setQuantity] = useState(grocery.quantity || '');
  const [quantityUnit, setQuantityUnit] = useState(
    grocery.quantityUnit || undefined
  );
  const [ownerId, setOwnerId] = useState(grocery.ownerId || undefined);
  const dispatch = useDispatch();
  const group = useCurrentGroup();

  const locations = useSelector((state) => state.groceries.locations);
  const categories = useSelector((state) => state.groceries.categories);
  const members = useCurrentGroupMembers();

  const currentLocation = locations.find((loc) => loc._id === locationId);
  const currentCategory = categories.find((cat) => cat._id === categoryId);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setUpdatedGrocery({ ...grocery, name: newName });
  };

  const handleLocationChange = (selectedOption) => {
    setLocationId(selectedOption);
    setUpdatedGrocery({ ...grocery, locationId: selectedOption });
  };

  const handleCategoryChange = (selectedOption) => {
    setCategoryId(selectedOption);
    setUpdatedGrocery({ ...grocery, categoryId: selectedOption });
  };

  const handleQuantityChange = (valueString) => {
    const newQuantity = parseInt(valueString, 10);
    setQuantity(newQuantity);
    setUpdatedGrocery({ ...grocery, quantity: newQuantity });
  };

  const handleOwnerChange = (e) => {
    const newOwnerId = e.target.value === '' ? null : e.target.value;
    setOwnerId(newOwnerId);
    setUpdatedGrocery({ ...grocery, ownerId: newOwnerId });
  };

  const handleDateChange = (e) => {
    const newExpiryDate = e.target.value;
    setExpiryDate(moment(newExpiryDate).format('YYYY-MM-DD'));
    setUpdatedGrocery({ ...grocery, expiryDate: newExpiryDate });
  };

  return (
    <HStack
      spacing={2}
      justifyContent='space-between'
      width='100%'
      display='flex'
      alignItems={'center'}
    >
      <FormControl flex={1}>
        <FormLabel display={index === 0 ? 'block' : 'none'}>Name</FormLabel>
        <Input placeholder='Name' value={name} onChange={handleNameChange} />
      </FormControl>

      <FormControl flex={1}>
        <FormLabel display={index === 0 ? 'block' : 'none'}>Location</FormLabel>
        <CreatableSelect
          placeholder='Location'
          options={locations.map((loc) => ({
            value: loc._id,
            label: loc.name,
          }))}
          value={
            currentLocation
              ? { value: currentLocation._id, label: currentLocation.name }
              : undefined
          }
          onChange={(e) => handleLocationChange(e.value)}
          isValidNewOption={(input) => isValidNewLocation(input, locations)}
          onCreateOption={(input) =>
            handleCreateLocation(
              input,
              dispatch,
              group._id,
              handleLocationChange
            )
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
        <FormLabel display={index === 0 ? 'block' : 'none'}>Category</FormLabel>
        <CreatableSelect
          placeholder='Category'
          options={categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          value={
            currentCategory
              ? { value: currentCategory._id, label: currentCategory.name }
              : undefined
          }
          onChange={(e) => handleCategoryChange(e.value)}
          isValidNewOption={(input) => isValidNewCategory(input, categories)}
          onCreateOption={(input) =>
            handleCreateCategory(
              input,
              dispatch,
              group._id,
              handleCategoryChange
            )
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
        <FormLabel display={index === 0 ? 'block' : 'none'}>Expiry Date</FormLabel>
        <Input
          placeholder='Expiry Date'
          type='date'
          value={expiryDate}
          onChange={handleDateChange}
        />
      </FormControl>

      <FormControl flex={1}>
        <FormLabel display={index === 0 ? 'block' : 'none'}>Owner</FormLabel>
        <Select value={ownerId} onChange={handleOwnerChange}>
          <option value={''}>Shared</option>
          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {`${member.firstName} ${member.lastName}`}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl flex={1}>
        <FormLabel display={index === 0 ? 'block' : 'none'}>Quantity</FormLabel>
        <HStack display='flex' spacing={2}>
          <NumberInput
            placeholder='Quantity'
            value={quantity}
            onChange={handleQuantityChange}
            min={0}
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
      <Button
        size='xs'
        colorScheme='red'
        variant='ghost'
        transform={index === 0 ? 'translateY(60%)' : 'none'}
        onClick={() => onDelete(index)}
      >
        <span className='material-symbols-outlined'>delete</span>
      </Button>
    </HStack>
  );
}
