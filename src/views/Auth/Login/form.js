import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const loginValdationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is invalid')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ isLoading, onSubmit }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={values => onSubmit(values)}
    validationSchema={loginValdationSchema}
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
        <Input
          hasStrip
          icon="lock"
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
        <Button type="submit" size="large" width="100%" isLoading={isLoading}>
          Login
        </Button>
      </form>
    )}
  </Formik>
);

export default LoginForm;
