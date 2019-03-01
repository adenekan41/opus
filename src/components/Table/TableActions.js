import React, { Fragment } from 'react';
import { Droplist, Item } from '../Dropdown';
import Button from '../Button';
import { Icon } from '../Icon';
import Modal, { ToggleModal } from '../Modal';

const TableActions = ({
  onEdit,
  onDelete,
  model,
  data,
  editModalHeading,
  renderEditForm,
}) => (
  <Droplist
    trigger={
      <Button kind="ghost">
        <Icon name="dots" color="rgba(36,36,36,.5)" />
      </Button>
    }
    triggerClickOutside={false}
  >
    {onClose => (
      <Fragment>
        <ToggleModal>
          {(show, openModal, closeModal) => (
            <>
              <Item
                onClick={() => {
                  openModal();
                  onClose();
                }}
              >
                edit {model}
              </Item>
              <Modal showModal={show} heading={editModalHeading} onCloseModal={closeModal} size="medium">
                {renderEditForm({ data, onEdit, closeModal })}
              </Modal>
            </>
          )}
        </ToggleModal>
        <Item
          onClick={() => {
            onDelete(data);
            onClose();
          }}
          style={{ color: '#ed4a4a' }}
        >
          delete {model}
        </Item>
      </Fragment>
    )}
  </Droplist>
);

export default TableActions;
