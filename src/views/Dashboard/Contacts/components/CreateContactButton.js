import React from 'react';
import Modal, { ToggleModal } from '../../../../components/Modal';
import Button from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';
import ContactForm from './ContactForm';

export default function CreateContactButton({
  crops,
  cities,
  onSubmit,
  isAdmin,
  isLoading,
  countries,
  getCountryCities,
  ...rest
}) {
  return (
    <ToggleModal>
      {(show, openModal, closeModal) => (
        <>
          <Button kind="green" block onClick={openModal} {...rest}>
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
              crops={crops}
              isAdmin={isAdmin}
              onSubmit={onSubmit}
              onCancel={closeModal}
              isLoading={isLoading}
            />
          </Modal>
        </>
      )}
    </ToggleModal>
  );
}
