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

export default function ColumnFilter({
  column,
  isOpen,
  onToggle,
  dateFilterType,
  setDateFilterType,
}) {
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
    const inputStyleProps = {
      variant: "filled",
      size: "sm",
      focusBorderColor: "teal.400",
      errorBorderColor: "red.300",
      _hover: {
        bg: "teal.50",
      },
      _focus: {
        bg: "white",
        borderColor: "teal.400",
      },
    };

    switch (column.columnDef.header) {
      case "Location":
        return (
          <Select
            placeholder={`Select ${column.columnDef.header}`}
            value={column.getFilterValue() || ""}
            onChange={(e) => handleChange(e)}
            {...inputStyleProps}
          >
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
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
            {...inputStyleProps}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        );
      case "Expiry Date":
        return (
          <HStack spacing={2} px={2}>
            <RadioGroup
              onChange={setDateFilterType}
              value={dateFilterType}
              size="sm"
            >
              <Stack direction="column">
                <Radio value="before">Before</Radio>
                <Radio value="on">On</Radio>
                <Radio value="after">After</Radio>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  size="sm"
                  bg="white"
                  width="auto"
                  {...inputStyleProps}
                />
              </Stack>
            </RadioGroup>
          </HStack>
        );
      case "Quantity":
        return (
          <NumberInput
            value={column.getFilterValue() || ""}
            onChange={(valueString) => {
              column.setFilterValue(valueString || undefined);
            }}
            {...inputStyleProps}
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
            {...inputStyleProps}
          />
        );
    }
  };

  return (
    <Popover isOpen={isOpen} onClose={() => onToggle(null)} colorScheme="teal">
      <PopoverTrigger>
        <Button
          size="xs"
          variant="solid"
          className="material-symbols-outlined"
          onClick={() => onToggle(column.id)}
          colorScheme="teal"
          _hover={{ bg: "teal.100" }}
          _active={{ bg: "teal.200" }}
        >
          {column.getIsFiltered() ? "filter_alt" : "filter_alt_off"}
        </Button>
      </PopoverTrigger>
      <PopoverContent border="0" boxShadow="xl" w="100%">
        <PopoverArrow bg="teal.50" />
        <PopoverHeader
          flexDirection="column"
          alignItems="center"
          borderBottom="0"
        >
          <Button
            mt={2}
            size="sm"
            variant="outline"
            colorScheme="teal"
            onClick={() => {
              column.setFilterValue("");
              onToggle(null);
            }}
          >
            Clear Filter
          </Button>
        </PopoverHeader>
        <PopoverCloseButton
          position="absolute"
          top="1"
          right="1"
          zIndex="1"
          color="black"
        />
        <PopoverBody color="teal.600">{renderInput()}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
