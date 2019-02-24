import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const recoverPasswordValdationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is invalid')
    .required('Email is required'),
});

const RecoverPasswordForm = ({ isLoading, onSubmit }) => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={values => onSubmit(values)}
    validationSchema={recoverPasswordValdationSchema}
  >
    {({ values, touched, errors, handleChange, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Input
          hasStrip
          id="email"
          icon="user"
          name="email"
          type="email"
          label="Email"
          touched={touched.email}
          value={values.email}
          onChange={handleChange}
          errorMessage={errors.email}
          isInvalid={errors.email && touched.email}
        />
        <Button type="submit" size="large" width="100%" isLoading={isLoading}>
          Recover password
        </Button>
      </form>
    )}
  </Formik>
);

export default RecoverPasswordForm;
