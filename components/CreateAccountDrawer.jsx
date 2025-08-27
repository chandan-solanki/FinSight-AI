"use client";

import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useState } from "react";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <Button onClick={() => setOpen(true)}>Open Button</Button>
      </div>
      <Drawer>
        <DrawerTrigger>{open ? "open" : "closed"}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CreateAccountDrawer;
