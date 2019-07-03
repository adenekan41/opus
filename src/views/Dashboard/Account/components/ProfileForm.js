import React from "react";
import { Formik } from "formik";
import { Box } from "rebass";
import * as yup from "yup";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import ChangePasswordForm from "./ChangePasswordForm";
import { phoneRegExp } from "../../../../helpers/constants";

const profileValdationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid"),
});

const ProfileForm = ({
  onSubmit,
  first_name,
  last_name,
  other_name,
  phone_number,
  location,
  email,
  id,
  onPasswordChange,
  isLoading,
  deactivateAccount,
  passwordLoading
}) => (
  <Formik
    initialValues={{
      id: id || "",
      email: email || "",
      first_name: first_name || "",
      last_name: last_name || "",
      other_name: other_name || "",
      phone_number: phone_number || "",
      location,
    }}
    onSubmit={values => onSubmit(values)}
    validationSchema={profileValdationSchema}
  >
    {({ values, touched, errors, handleChange, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <Input
              mb="20px"
              id="first_name"
              name="first_name"
              type="text"
              label="First name"
              touched={touched.first_name}
              value={values.first_name}
              onChange={handleChange}
              errorMessage={errors.first_name}
              isInvalid={errors.first_name && touched.first_name}
            />
          </div>
          <div className="col">
            <Input
              mb="20px"
              id="other_name"
              name="other_name"
              type="text"
              label="Middle name"
              touched={touched.other_name}
              value={values.other_name}
              onChange={handleChange}
              errorMessage={errors.other_name}
              isInvalid={errors.other_name && touched.other_name}
            />
          </div>
          <div className="col">
            <Input
              id="last_name"
              name="last_name"
              type="text"
              label="Last name"
              touched={touched.last_name}
              value={values.last_name}
              onChange={handleChange}
              errorMessage={errors.last_name}
              isInvalid={errors.last_name && touched.last_name}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Input
              id="phone_number"
              name="phone_number"
              type="tel"
              label="Phone number"
              touched={touched.phone_number}
              value={values.phone_number}
              onChange={handleChange}
              errorMessage={errors.phone_number}
              isInvalid={errors.phone_number && touched.phone_number}
            />
          </div>
          <div className="col-md-4">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              touched={touched.email}
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
              isInvalid={errors.email && touched.email}
            />
          </div>
        </div>

        <br />
        <hr />

        <Box mt="20px">
          <div className="row">
            <div className="col-md-4">
              <Input
                disabled
                id="password"
                name="password"
                type="password"
                label="Password"
                value="........"
              />
            </div>
            <div className="col-md-4">
              <ChangePasswordForm onSubmit={onPasswordChange} isLoading={passwordLoading} />
            </div>
          </div>
        </Box>
        <Box mt="32px">
          <hr />
        </Box>
        <div className="footer_button mt-3">
          <div className="row">
            <div className="col-md-4">
              <Button size="large" block type="button" kind="red" onClick={deactivateAccount}>
                Deactivate Account
              </Button>
            </div>
            <div className="col-md-8">
              <Button size="large" block kind="orange" isLoading={isLoading}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    )}
  </Formik>
);

export default ProfileForm;
