import React from "react";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import ContactForm from "./ContactForm";

export default function CreateContactButton({
  crops,
  cities,
  onSubmit,
  isAdmin,
  isLoading,
  countries,
  customers,
  apiErrors,
  onCloseModal,
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
            onCloseModal={() => {
              onCloseModal();
              closeModal();
            }}
            heading={"Add Contact"}
          >
            <ContactForm
              crops={crops}
              isAdmin={isAdmin}
              onSubmit={onSubmit}
              apiErrors={apiErrors}
              onCancel={() => {
                onCloseModal();
                closeModal();
              }}
              isLoading={isLoading}
              countries={countries}
              customers={customers}
            />
          </Modal>
        </>
      )}
    </ToggleModal>
  );
}
