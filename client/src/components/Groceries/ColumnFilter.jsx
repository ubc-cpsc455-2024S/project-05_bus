import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  HStack,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function ColumnFilter({ column, isOpen, onToggle, dateFilterType, setDateFilterType }) {
  const [selectedDate, setSelectedDate] = useState("");
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    column.setFilterValue(date);
    onToggle(null);
  };

  const handleChange = (e) => {
    column.setFilterValue(e.target.value || undefined);
    onToggle(null);
  };

  const renderInput = () => {
    switch (column.columnDef.header) {
      case "Location":
        return (
          <Select
            placeholder={`Select ${column.columnDef.header}`}
            value={column.getFilterValue() || ""}
            onChange={(e) => handleChange(e)}
            size="sm"
          >
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </Select>
        );
      case "Category":
        return (
          <Select
            placeholder={`Select ${column.columnDef.header}`}
            value={column.getFilterValue() || ""}
            onChange={(e) => handleChange(e)}
            size="sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        );
      case "Expiry Date":
        return (
          <HStack spacing={2} width="100%" px={2}>
            <RadioGroup
              onChange={setDateFilterType}
              value={dateFilterType}
              size="sm"
            >
              <Stack direction="row">
                <Radio value="before">Before</Radio>
                <Radio value="on">On</Radio>
                <Radio value="after">After</Radio>
              </Stack>
            </RadioGroup>
            <Input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              size="sm"
              bg="white"
              width="auto"
            />
          </HStack>
        );
      case "Quantity":
        return (
          <NumberInput
            value={column.getFilterValue() || ""}
            onChange={(valueString) => {
              column.setFilterValue(valueString || undefined);
            }}
            size="sm"
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        );
      default:
        return (
          <Input
            placeholder={`Search ${column.columnDef.header}`}
            value={column.getFilterValue() || ""}
            onChange={(e) => column.setFilterValue(e.target.value || undefined)}
            size="sm"
          />
        );
    }
  };

  return (
    <Popover isOpen={isOpen} onClose={() => onToggle(null)}>
      <PopoverTrigger>
        <Button
          size="sm"
          className="material-symbols-outlined"
          onClick={() => onToggle(column.id)}
          bg="transparent"
        >
          {column.getIsFiltered() ? "filter_alt" : "filter_alt_off"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <Button
            size="sm"
            onClick={() => {
              column.setFilterValue("");
              onToggle(null);
            }}
          >
            Clear Filter
          </Button>
        </PopoverHeader>
        <PopoverCloseButton position="absolute" top="0" right="0" zIndex="1" />
        <PopoverBody>
          <HStack spacing={2}>{renderInput()}</HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
