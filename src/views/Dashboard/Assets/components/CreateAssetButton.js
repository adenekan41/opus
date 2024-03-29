import React from "react";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import AssetForm from "./AssetForm";
import { getApiErrors } from "../../../../helpers/functions";

export default function CreateAssetButton({
  apiErrors,
  onSubmit,
  isLoading,
  label,
  onCloseModal,
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
              onCancel={() => {
                closeModal();
                onCloseModal();
              }}
              onSubmit={onSubmit}
              isLoading={isLoading}
              apiErrors={getApiErrors(apiErrors)}
            />
          </Modal>
        </>
      )}
    </ToggleModal>
  );
}
