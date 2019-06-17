import React from "react";
import Navbar from "../components/Navbar";
import { storiesOf } from "@storybook/react";
import Button from "../components/Button";
import { Icon } from "../components/Icon";
import { Droplist, Item } from "../components/Dropdown";

const stories = storiesOf("Navbar", module);

stories.add("Navbar", () => <Navbar />);

stories.add("Droplist", () => (
  <Droplist
    trigger={
      <Button kind="ghost">
        <Icon name="dots" color="rgba(36,36,36,.5)" />
      </Button>
    }
    placement="bottom"
    triggerClickOutside={true}
  >
    {onClose => (
      <>
        <Item>edit</Item>
        <Item style={{ color: "#ed4a4a" }}>delete</Item>
      </>
    )}
  </Droplist>
));
