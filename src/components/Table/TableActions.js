import React, { Fragment } from 'react';
import { Droplist, Item } from '../Dropdown';
import Button from '../Button';
import { Icon } from '../Icon';
import Modal, { ToggleModal, Confirm } from '../Modal';

const TableActions = ({
  data,
  model,
  onDelete,
  isLoading,
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
              <Modal
                showModal={show}
                heading={editModalHeading}
                onCloseModal={closeModal}
                size="medium"
              >
                {renderEditForm({ closeModal })}
              </Modal>
            </>
          )}
        </ToggleModal>
        <ToggleModal>
          {(show, openModal, closeModal) => (
            <>
              <Item
                onClick={() => {
                  openModal();
                  onClose();
                }}
                style={{ color: '#ed4a4a' }}
              >
                delete {model}
              </Item>
              <Confirm
                showModal={show}
                heading={`Delete ${model}`}
                onConfirm={() => {
                  onDelete(data.id);
                }}
                isLoading={isLoading}
                onCloseModal={closeModal}
                description={`Are you sure you want to delete this ${model}?`}
              />
            </>
          )}
        </ToggleModal>
      </Fragment>
    )}
  </Droplist>
);

export default TableActions;
