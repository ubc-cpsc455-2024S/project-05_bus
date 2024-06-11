import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import MiniGroceryList from "./MiniGroceryList";

export default function GroceriesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const groceries = useSelector((state) => state.groceries.groceries);
  const dispatch = useDispatch();

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Overview
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay>
          <DrawerContent overflow="scroll">
            <Tabs>
              <DrawerCloseButton />
              <TabList>
                <Tab>
                  <DrawerHeader>Locations</DrawerHeader>
                </Tab>
                <Tab>
                  <DrawerHeader>Categories</DrawerHeader>
                </Tab>
              </TabList>
              <DrawerBody>
                <TabPanels>
                  <TabPanel>
                    <MiniGroceryList data={locations} type="locations" groceries={groceries} />
                  </TabPanel>
                  <TabPanel>
                    <MiniGroceryList data={categories} type="categories" groceries={groceries} />
                  </TabPanel>
                </TabPanels>
              </DrawerBody>
            </Tabs>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
