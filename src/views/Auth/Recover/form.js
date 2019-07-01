import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const recoverPasswordValdationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password is too short - should be 6 chars minimum.")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RecoverPasswordForm = ({ isLoading, onSubmit }) => (
  <Formik
    initialValues={{ password: "", confirmPassword: "" }}
    onSubmit={values => onSubmit(values)}
    validationSchema={recoverPasswordValdationSchema}
  >
    {({ values, touched, errors, handleChange, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Input
          hasStrip
          id="password"
          icon="lock"
          name="password"
          type="password"
          label="Password"
          touched={touched.password}
          value={values.password}
          onChange={handleChange}
          errorMessage={errors.password}
          isInvalid={errors.password && touched.password}
        />
        <Input
          hasStrip
          icon="lock"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          iconSize="14px"
          touched={touched.confirmPassword}
          value={values.confirmPassword}
          onChange={handleChange}
          errorMessage={errors.confirmPassword}
          isInvalid={errors.confirmPassword && touched.confirmPassword}
        />
        <Button type="submit" size="large" block isLoading={isLoading}>
          Create Password
        </Button>
      </form>
    )}
  </Formik>
);

export default RecoverPasswordForm;
