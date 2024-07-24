import {
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export default function RecipeDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mt={4} mr={4}>
        <Button
          className="material-symbols-outlined"
          onClick={onOpen}
          style={{ fontSize: '2.5rem' }}
          bg="transparent"
          color="teal.500"
        >
          menu_book
        </Button>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay>
          <DrawerContent overflowY="auto">
              <DrawerCloseButton />
              <DrawerBody height="calc(100vh - 120px)">
              </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
