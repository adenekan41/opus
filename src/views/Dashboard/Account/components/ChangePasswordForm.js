import React from 'react';
import { Formik } from 'formik';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

const ChangePasswordForm = ({ isLoading, onSubmit, }) => (
  <Formik
    initialValues={{ password: '' }}
    onSubmit={values => onSubmit(values)}
  >
    {({ values, touched, errors, handleChange, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              iconSize="14px"
              touched={touched.password}
              value={values.password}
              onChange={handleChange}
              errorMessage={errors.password}
              isInvalid={errors.password && touched.password}
            />
          </div>
          <div className="col-md-4">
            <Button width="100%" size="large" kind="gray" isLoading={isLoading} type="submit">
              Change Password
            </Button>
          </div>
        </div>
      </form>
    )}
  </Formik>
);

export default ChangePasswordForm;
