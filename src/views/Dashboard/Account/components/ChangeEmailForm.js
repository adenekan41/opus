import React from 'react';
import { Formik } from 'formik';
import { Text } from 'rebass';
import * as yup from 'yup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Modal, { ToggleModal } from '../../../../components/Modal';

const changeEmailFormValidation = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email')
    .required('Email is required'),
});

const ChangeEmailForm = ({ isLoading, onSubmit }) => (
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
          Change Email Address
        </Button>
        <Modal
          size="medium"
          showModal={show}
          onCloseModal={closeModal}
          heading="Change Email"
        >
          <Text textAlign="center" mt="20px" mb="40px">
            Update your email adress and we’ll send you a link to verify your
            new address.
          </Text>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={values => onSubmit(values)}
            validationSchema={changeEmailFormValidation}
          >
            {({ values, touched, errors, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <Input
                      mb="40px"
                      id="email"
                      name="email"
                      type="email"
                      label="New email address"
                      touched={touched.email}
                      value={values.email}
                      onChange={handleChange}
                      errorMessage={errors.email}
                      isInvalid={errors.email && touched.email}
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

export default ChangeEmailForm;
