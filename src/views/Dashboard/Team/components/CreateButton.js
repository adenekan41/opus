import React from 'react'
import { Text } from 'rebass';
import Modal, { ToggleModal } from '../../../../components/Modal';
import Button from '../../../../components/Button';
import TeamForm from './TeamForm';
import { Icon } from '../../../../components/Icon';

export default function CreateButton({ isAdmin, onSubmit, isLoading }) {
  return (
    <ToggleModal>
      {(show, openModal, closeModal) => (
        <>
          <Button onClick={openModal} kind="green" block>
            <Icon name="add" color="#ffffff" /> &nbsp;&nbsp;
            {isAdmin
              ? `Invite user`
              : `Invite
            team member`}
          </Button>
          <Modal
            size="medium"
            showModal={show}
            onCloseModal={closeModal}
            heading="Invite team member"
          >
            <Text textAlign="center" mb="24px">
              Please enter the email address of the team member you
              would like to invite.
            </Text>
            <TeamForm isAdd onCancel={closeModal} onSubmit={onSubmit} isLoading={isLoading} />
          </Modal>
        </>
      )}
    </ToggleModal>
  )
}
