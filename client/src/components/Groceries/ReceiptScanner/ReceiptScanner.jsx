import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  Box,
  Image,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import CropModal from "./CropModal";
import sampleReceiptImage from "./images/sample_receipt.jpg";
import SubmitButton from "./SubmitButton";

export default function ReceiptScanner({ isOpen, onClose }) {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
    setIsCropModalOpen(true);
  };

  const handleCropComplete = (croppedImageUrl, croppedImageBlob) => {
    setCroppedImageUrl(croppedImageUrl);
    setCroppedImageBlob(croppedImageBlob);
  };

  const clearCroppedImage = () => {
    setCroppedImageUrl(null);
    setCroppedImageBlob(null);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan Receipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex">
            <Box flex="1" p="4" borderRightWidth="1px">
              <Flex
                direction="column"
                justifyContent="space-between"
                height="100%"
              >
                {croppedImageUrl ? (
                  <Image
                    src={croppedImageUrl}
                    maxH="80vh"
                    objectFit="contain"
                  />
                ) : (
                  <Text>No image uploaded</Text>
                )}
                <ButtonGroup>
                  <Button
                    mt="4"
                    colorScheme="blue"
                    onClick={() => setIsCropModalOpen(true)}
                    disabled={!uploadedImageUrl}
                    rightIcon={
                      <Text className="material-symbols-outlined">crop</Text>
                    }
                  >
                    Crop Image
                  </Button>
                  <SubmitButton croppedImageBlob={croppedImageBlob} clearCroppedImage={clearCroppedImage}/>
                </ButtonGroup>
              </Flex>
            </Box>
            <VStack
              flex="1"
              p="4"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Image
                src={sampleReceiptImage}
                w="100%"
                maxW="30vh"
                objectFit="contain"
                mb="4"
              />
              <VStack alignItems="flex-start" spacing="4" w="100%">
                <Text fontSize="lg" fontWeight="bold">
                  Instructions:
                </Text>
                <Text whiteSpace="nowrap">
                  1. Ensure good lighting and focus.
                </Text>
                <Text whiteSpace="nowrap">
                  2. Take the photo straight from above.
                </Text>
                <Text whiteSpace="nowrap">
                  3. Crop tightly around the receipt.
                </Text>
                <Button
                  mt="4"
                  colorScheme="blue"
                  rightIcon={
                    <Text className="material-symbols-outlined">
                      photo_camera
                    </Text>
                  }
                >
                  <label htmlFor="file-upload">Upload Photo</label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CropModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        imageSrc={uploadedImageUrl}
        onCropComplete={handleCropComplete}
      />
    </>
  );
}
