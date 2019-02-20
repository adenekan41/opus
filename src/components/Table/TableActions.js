import React, { Fragment } from 'react';
import { Droplist, Item } from '../Dropdown';
import Button from '../Button';
import { Icon } from '../Icon';

const TableActions = ({ onEdit, onDelete, model, data }) => (
  <Droplist
    trigger={
      <Button kind="ghost">
        <Icon name="dots" color="rgba(36,36,36,.5)"/>
      </Button>
    }
  >
    {onClose => (
      <Fragment>
        <Item
          onClick={() => {
            onEdit(data);
            onClose();
          }}
        >
          edit {model}
        </Item>
        <Item
          onClick={() => {
            onDelete(data);
            onClose();
          }}
          style={{color: '#ed4a4a'}}
        >
          delete {model}
        </Item>

        {/* <ToggleHandler>
            {(isOpen, onOpen, onClose) => (
              <React.Fragment>
                <Confirm
                  heading="Delete Resume"
                  showModal={isOpen}
                  onConfirm={() => {
                    onDelete();
                    onClose();
                  }}
                  onCloseModal={onClose}
                  description="Are you sure you want to delete this resume?"
                />
                <Item icon="delete" onClick={blockFunction(onOpen)} isNegative>
                  Delete
                </Item>
              </React.Fragment>
            )}
          </ToggleHandler> */}
      </Fragment>
    )}
  </Droplist>
);

export default TableActions;
