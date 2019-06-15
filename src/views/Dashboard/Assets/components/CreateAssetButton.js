import React from "react";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import AssetForm from "./AssetForm";

export default function CreateAssetButton({
  apiErrors,
  onSubmit,
  isLoading,
  label,
}) {
  return (
    <ToggleModal>
      {(show, openModal, closeModal) => (
        <>
          <Button onClick={openModal} kind="green" block>
            <Icon name="add" color="#ffffff" /> &nbsp;&nbsp;
            <span>Add {label}</span>
          </Button>
          <Modal
            size="medium"
            showModal={show}
            onCloseModal={closeModal}
            heading={`Add ${label}`}
          >
            <AssetForm
              label={label}
              apiErrors={apiErrors}
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
