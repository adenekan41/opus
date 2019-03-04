import React from 'react';
import Modal, { ToggleModal } from '../../../../components/Modal';
import Button from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';
import ContactForm from './ContactForm';

export default function CreateContactButton({ onSubmit, isAdmin, isLoading }) {
  return (
    <ToggleModal>
      {(show, openModal, closeModal) => (
        <>
          <Button kind="green" block onClick={openModal}>
            <Icon name="add" color="#ffffff" />
            &nbsp;&nbsp;Add contact
          </Button>
          <Modal
            size="medium"
            showModal={show}
            onCloseModal={closeModal}
            heading={'Add Contact'}
          >
            <ContactForm
              isAdmin={isAdmin}
              onCancel={closeModal}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </Modal>
        </>
      )}
    </ToggleModal>
  );
}
