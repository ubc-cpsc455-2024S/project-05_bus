import {
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  imageReceiptProcessor,
  groceryImageReceiptProcessor,
} from "./receiptService";

const SubmitButton = ({
  croppedImageBlob,
  clearCroppedImage,
  type,
  setGroceries,
  setLoading,
  setModalOpen,
}) => {
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!croppedImageBlob) {
      toast({
        title: "No image selected",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    let processorFunction;
    if (type === "Receipt") {
      processorFunction = imageReceiptProcessor;
    } else if (type === "Groceries") {
      processorFunction = groceryImageReceiptProcessor;
    }

    if (processorFunction) {
      try {
        setLoading(true);
        setModalOpen(true);
        const data = await processorFunction(
          croppedImageBlob,
          locations,
          categories
        );
        const jsonData = extractAndParseJson(data);
        if (jsonData && jsonData.groceries) {
          setGroceries(jsonData.groceries);
          setLoading(false);
        } else {
          throw new Error("Invalid JSON data");
        }
      } catch (error) {
        toast({
          title: "Error processing image",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    clearCroppedImage();
  };

  function extractAndParseJson(data) {
    const jsonString = data.trim();
    const startIndex = jsonString.indexOf("{");
    const endIndex = jsonString.lastIndexOf("}");
    const cleanedJsonString = jsonString.substring(startIndex, endIndex + 1);
    try {
      return JSON.parse(cleanedJsonString);
    } catch (error) {
      toast({
        title: "Please try submitting again",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return {};
    }
  }

  return (
    <>
      <Button
        mt="4"
        colorScheme="blue"
        onClick={handleSubmit}
        disabled={!croppedImageBlob}
      >
        Submit
      </Button>
    </>
  );
};

export default SubmitButton;
