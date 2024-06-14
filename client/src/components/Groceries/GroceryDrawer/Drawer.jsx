import { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import MiniGroceryList from "./MiniGroceryList";
import FloatingAddButton from "./AddButton";
import { addLocation, addCategory } from "../../../redux/slices/groceriesSlice";

export default function GroceriesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const groceries = useSelector((state) => state.groceries.groceries);
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [error, setError] = useState(false);

  const handleAdd = (value) => {
    let hasError = false;
    if (tabIndex === 0) {
      if (locations.find((location) => location.name === value) || value.trim().length === 0) {
        hasError = true;
      } else {
        dispatch(addLocation(value));
      }
    } else if (tabIndex === 1) {
      if (categories.find((category) => category.name === value) || value.trim().length === 0) {
        hasError = true;
      } else {
        dispatch(addCategory(value));
      }
    }
    setError(hasError);
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <>
      <Button
        className="material-symbols-outlined"
        colorScheme="teal"
        onClick={onOpen}
      >
        Overview
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay>
          <DrawerContent overflowY="auto">
            <Tabs
              index={tabIndex}
              onChange={handleTabsChange}
              isLazy
              variant="enclosed"
            >
              <DrawerCloseButton />
              <TabList>
                <Tab>Locations</Tab>
                <Tab>Categories</Tab>
              </TabList>
              <DrawerBody height="calc(100vh - 120px)">
                <TabPanels>
                  <TabPanel>
                    <MiniGroceryList
                      data={locations}
                      type="locations"
                      groceries={groceries}
                    />
                  </TabPanel>
                  <TabPanel>
                    <MiniGroceryList
                      data={categories}
                      type="categories"
                      groceries={groceries}
                    />
                  </TabPanel>
                </TabPanels>
              </DrawerBody>
              <DrawerFooter justifyContent={"flex-end"}>
                <FloatingAddButton onAdd={handleAdd} error={error}/>
              </DrawerFooter>
            </Tabs>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
