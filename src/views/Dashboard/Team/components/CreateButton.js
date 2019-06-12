import React from "react";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import UserForm from "./UserForm";
import { Icon } from "../../../../components/Icon";

export default function CreateButton({ onSubmit, isLoading }) {
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
            onCloseModal={closeModal}
            heading="Add user"
          >
            <UserForm
              isAdd
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
