import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import Modal, { ToggleModal } from '../../../../../components/Modal';

const changePasswordFormValidation = yup.object().shape({
  old_password: yup.string().required('Old password is required'),
  new_password: yup.string().required('New password is required'),
  confirm_password: yup.string().required('Confirm password is required'),
});

const ChangePasswordForm = ({ isLoading, onSubmit }) => (
  <ToggleModal>
    {(show, openModal, closeModal) => (
      <>
        <Button
          width="100%"
          size="large"
          kind="gray"
          type="button"
          onClick={openModal}
        >
          Change Password
        </Button>
        <Modal
          size="medium"
          showModal={show}
          onCloseModal={closeModal}
          heading="Change Password"
        >
          <Formik
            initialValues={{
              old_password: '',
              new_password: '',
              confirm_password: '',
            }}
            onSubmit={values => onSubmit(values)}
            validationSchema={changePasswordFormValidation}
          >
            {({ values, touched, errors, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <Input
                      mb="40px"
                      id="old_password"
                      name="old_password"
                      type="old_password"
                      label="Old password"
                      touched={touched.old_password}
                      value={values.old_password}
                      onChange={handleChange}
                      errorMessage={errors.old_password}
                      isInvalid={errors.old_password && touched.old_password}
                    />
                  </div>
                  <div className="col-md-12">
                    <Input
                      mb="40px"
                      id="new_password"
                      name="new_password"
                      type="new_password"
                      label="New password"
                      touched={touched.new_password}
                      value={values.new_password}
                      onChange={handleChange}
                      errorMessage={errors.new_password}
                      isInvalid={errors.new_password && touched.new_password}
                    />
                  </div>
                  <div className="col-md-12">
                    <Input
                      mb="40px"
                      id="confirm_password"
                      name="confirm_password"
                      type="confirm_password"
                      label="Confirm new password"
                      touched={touched.confirm_password}
                      value={values.confirm_password}
                      onChange={handleChange}
                      errorMessage={errors.confirm_password}
                      isInvalid={
                        errors.confirm_password && touched.confirm_password
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Button
                      block
                      type="button"
                      kind="gray"
                      isLoading={isLoading}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="col-md-6">
                    <Button block type="button" kind="orange">
                      Update
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </Modal>
      </>
    )}
  </ToggleModal>
);

export default ChangePasswordForm;
