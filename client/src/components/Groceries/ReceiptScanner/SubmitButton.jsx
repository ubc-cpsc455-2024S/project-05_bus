import { useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { cheapReceiptProcessor, imageReceiptProcessor } from "./receiptService";

const SubmitButton = ({ croppedImageBlob, clearCroppedImage }) => {
  const [selectedMode, setSelectedMode] = useState("cheap");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
  };

  const handleSubmit = async () => {
    if (selectedMode === "cheap") {
      console.log(croppedImageBlob);
      await cheapSubmit(croppedImageBlob, locations, categories);
    } else {
      await imageSubmit(croppedImageBlob, locations, categories);
    }
    clearCroppedImage();
  };

  const cheapSubmit = async (croppedImageBlob, locations, categories) => {
    const data = await cheapReceiptProcessor(
      croppedImageBlob,
      locations,
      categories
    );
    console.log(data);
  };

  const imageSubmit = async (croppedImageBlob, locations, categories) => {
    const data = await imageReceiptProcessor(
      croppedImageBlob,
      locations,
      categories
    );
    console.log(data);
  };

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        as={Button}
        mt="4"
        colorScheme="blue"
        disabled={!croppedImageBlob}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        onClick={handleSubmit}
      >
        <HStack>
          <Text>Submit</Text>
          <Text className="material-symbols-outlined">
            {selectedMode == "cheap" ? "attach_money" : "image"}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        <MenuItem onClick={() => handleSelectMode("cheap")}>
          Cheap Processing
        </MenuItem>
        <MenuItem onClick={() => handleSelectMode("image")}>
          Image Processing
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SubmitButton;
