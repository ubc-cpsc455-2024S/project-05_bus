import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Box } from '@chakra-ui/react';

async function getCroppedImg(imageSrc, crop, zoom) {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX / zoom,
        crop.y * scaleY / zoom,
        crop.width * scaleX / zoom,
        crop.height * scaleY / zoom,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }

        resolve({
          url: URL.createObjectURL(blob),
          blob: blob,
        });
      }, 'image/jpeg');
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
}

export default function CropModal({ isOpen, onClose, imageSrc, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = async () => {
    const { url, blob } = await getCroppedImg(imageSrc, croppedAreaPixels, zoom);
    onCropComplete(url, blob);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crop Receipt</ModalHeader>
        <ModalBody>
          <Box position="relative" width="100%" height="80vh">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              zoomSpeed={0.1}
              aspect={1/2}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              restrictPosition={false}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleCropComplete}>
            Done
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}