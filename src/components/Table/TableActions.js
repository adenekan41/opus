import React from "react";
import { Droplist, Item } from "../Dropdown";
import Button from "../Button";
import { Icon } from "../Icon";

const TableActions = ({
  model,
  onEdit,
  onDelete,
  placement,
}) => (
  <Droplist
    trigger={
      <Button kind="ghost">
        <Icon name="dots" color="rgba(36,36,36,.5)" />
      </Button>
    }
    placement={placement}
    triggerClickOutside={true}
  >
    {() => (
      <>
        <Item onClick={onEdit}>edit {model}</Item>
        <Item onClick={onDelete} style={{ color: "#ed4a4a" }}>
          delete {model}
        </Item>
      </>
    )}
  </Droplist>
);

export default TableActions;
