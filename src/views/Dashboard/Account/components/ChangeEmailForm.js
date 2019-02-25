import React from 'react';
import { Formik } from 'formik';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

const ChangeEmailForm = ({ isLoading, onSubmit, email }) => (
  <Formik
    initialValues={{ email: email || '' }}
    onSubmit={values => onSubmit(values)}
  >
    {({ values, touched, errors, handleChange, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              touched={touched.email}
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
              isInvalid={errors.email && touched.email}
            />
          </div>
          <div className="col-md-4">
            <Button width="100%" size="large" kind="gray" isLoading={isLoading}>
              Change Email Address
            </Button>
          </div>
        </div>
      </form>
    )}
  </Formik>
);

export default ChangeEmailForm;
