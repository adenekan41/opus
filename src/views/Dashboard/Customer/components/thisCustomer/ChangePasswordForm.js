import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import Modal, { ToggleModal } from "../../../../../components/Modal";

const changePasswordFormValidation = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
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
              password: "",
              confirmPassword: "",
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
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Input
                      mb="40px"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      label="Confirm password"
                      touched={touched.confirmPassword}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      errorMessage={errors.confirmPassword}
                      isInvalid={
                        errors.confirmPassword && touched.confirmPassword
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
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="col-md-6">
                    <Button
                      block
                      type="submit"
                      kind="orange"
                      isLoading={isLoading}
                    >
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
