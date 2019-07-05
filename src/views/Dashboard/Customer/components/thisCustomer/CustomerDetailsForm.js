import React, { useState } from "react";
import { Formik } from "formik";
import { Flex, Text, Box } from "rebass";
import * as yup from "yup";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import Card from "../../../../../components/Card";
import Switch from "../../../../../components/Switch";
import { phoneRegExp } from "../../../../../helpers/constants";
import { ErrorAlertComponent } from "../../../../../components/AlertComponent";

const profileValdationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

const CustomerDetailsForm = ({
  id,
  onSubmit,
  first_name,
  last_name,
  other_name,
  phone_number,
  email,
  isLoading,
  apiErrors,
  deactivateAccount,
  receive_manual_messages,
  receive_advisory_messages,
  receive_automatic_messages,
}) => {
  let [manualMessages, setManualMessages] = useState(receive_manual_messages);
  let [automaticMessages, setAutomaticMessages] = useState(
    receive_automatic_messages
  );
  let [advisoryMessages, setAdvisoryMessages] = useState(
    receive_advisory_messages
  );
  return (
    <Formik
      initialValues={{
        id,
        email,
        first_name,
        last_name,
        other_name,
        phone_number,
      }}
      onSubmit={values =>
        onSubmit({
          ...values,
          receive_advisory_messages: advisoryMessages,
          receive_automatic_messages: automaticMessages,
          receive_manual_messages: manualMessages,
        })
      }
      validationSchema={profileValdationSchema}
    >
      {({ values, touched, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box my={3}>
            <ErrorAlertComponent errors={apiErrors} />
          </Box>
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
                label="Email Address"
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

          <div className="row">
            <div className="col-md-4">
              <Card padding="1rem 1.5rem">
                <Flex alignItems="center">
                  <Switch
                    value={manualMessages}
                    checked={manualMessages}
                    onChange={() => setManualMessages(!manualMessages)}
                  />
                  <Text ml={2} fontSize={15}>
                    Manual Messages
                  </Text>
                </Flex>
              </Card>
            </div>
            <div className="col-md-4">
              <Card padding="1rem 1.5rem">
                <Flex alignItems="center">
                  <Switch
                    value={automaticMessages}
                    checked={automaticMessages}
                    onChange={() => setAutomaticMessages(!automaticMessages)}
                  />
                  <Text ml={2} fontSize={15}>
                    Automatic Messages
                  </Text>
                </Flex>
              </Card>
            </div>
            <div className="col-md-4">
              <Card padding="1rem 1.5rem">
                <Flex alignItems="center">
                  <Switch
                    value={advisoryMessages}
                    checked={advisoryMessages}
                    onChange={() => setAdvisoryMessages(!advisoryMessages)}
                  />
                  <Text ml={2} fontSize={15}>
                    Advisory Messages
                  </Text>
                </Flex>
              </Card>
            </div>
          </div>
          <hr />
          <br />
          <div className="footer_button mt-3">
            <div className="row">
              <div className="col-md-4">
                <Button
                  size="large"
                  block
                  type="button"
                  kind="red"
                  onClick={deactivateAccount}
                >
                  Deactivate Account
                </Button>
              </div>
              <div className="col-md-8">
                <Button disabled={
                  values.email  === email ? true:
                  false
                  } 
                  size="large" block kind="orange" isLoading={isLoading}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CustomerDetailsForm;
