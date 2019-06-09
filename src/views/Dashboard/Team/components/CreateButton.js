import React from "react";
import { Text } from "rebass";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import TeamForm from "./TeamForm";
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
            <TeamForm
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
