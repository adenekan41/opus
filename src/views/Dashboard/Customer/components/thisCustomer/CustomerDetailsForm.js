import { Field, Formik } from "formik";
import isEqual from "lodash.isequal";
import React, { useState } from "react";
import { Flex, Text } from "rebass";
import * as yup from "yup";
import Button from "../../../../../components/Button";
import Card from "../../../../../components/Card";
import Input from "../../../../../components/Input";
import Dropdown from "../../../../../components/Select";
import Switch from "../../../../../components/Switch";

const profileValdationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  crop_managed: yup.string().required("Crop managed is required"),
});

const CustomerDetailsForm = ({
  id,
  onSubmit,
  first_name,
  last_name,
  other_name,
  phone_number,
  email,
  crops,
  isLoading,
  crop_managed,
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
  let initialValue = {
    id,
    email,
    first_name,
    last_name,
    other_name,
    phone_number,
    crop_managed,
    receive_manual_messages: manualMessages,
    receive_advisory_messages: advisoryMessages,
    receive_automatic_messages: automaticMessages,
  };
  return (
    <Formik
      initialValues={initialValue}
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
          <div className="row">
            <div className="col">
              <Input
                mb="20px"
                id="first_name"
                name="first_name"
                type="text"
                isRequired
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
                isRequired
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
                isRequired
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
                isRequired
                label="Email Address"
                touched={touched.email}
                value={values.email}
                onChange={handleChange}
                errorMessage={errors.email}
                isInvalid={errors.email && touched.email}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="crop_managed"
                render={({ field, form }) => (
                  <Dropdown
                    {...field}
                    mb="20px"
                    name="crop_managed"
                    label="Crop managed"
                    touched={touched.crop_managed}
                    options={crops}
                    errorMessage={errors.crop_managed}
                    isInvalid={errors.crop_managed && touched.crop_managed}
                    onChange={crop =>
                      form.setFieldValue("crop_managed", crop.value)
                    }
                  />
                )}
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
                <Button size="large" block type="button" kind="red">
                  Deactivate Account
                </Button>
              </div>
              <div className="col-md-8">
                <Button
                  disabled={isEqual(initialValue, values)}
                  size="large"
                  block
                  kind="orange"
                  isLoading={isLoading}
                >
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
