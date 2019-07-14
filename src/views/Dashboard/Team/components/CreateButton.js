import React from "react";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import UserForm from "./UserForm";
import { Icon } from "../../../../components/Icon";

export default function CreateButton({
  apiErrors,
  onSubmit,
  isLoading,
  clearErrors,
}) {
  return (
    <ToggleModal>
      {(show, openModal, closeModal) => (
        <>
          <Button onClick={openModal} kind="green" block>
            <Icon name="add" color="#ffffff" /> &nbsp;&nbsp;
            <span>Add users</span>
          </Button>
          <Modal
            size="medium"
            showModal={show}
            onCancel={() => {
              closeModal();
              clearErrors();
            }}
            heading="Add user"
          >
            <UserForm
              isAdd
              apiErrors={apiErrors}
              onCancel={() => {
                closeModal();
                clearErrors();
              }}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </Modal>
        </>
      )}
    </ToggleModal>
  );
}
