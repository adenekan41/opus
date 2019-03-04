import React from 'react';
import { Formik, Field } from 'formik';
import { Box, Flex, Text } from 'rebass';
import * as yup from 'yup';
import Dropdown from '../../../../components/Select';
import Input from '../../../../components/Input';
import Button, { EmptyButton } from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';

const AddContactButtonStyle = `
height: 60px;
padding: 0 16px;
opacity: 0.6;
border-radius: 3px;
border: solid 1px rgba(18, 18, 18, 0.11);
background-color: #ffffff;
`;

const contactFormValidation = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  crop: yup.string().required('Crop managed is required'),
  phone_number: yup.string().required('Phone number is required'),
});

const ContactForm = ({
  onSubmit,
  isAdmin = true,
  first_name,
  last_name,
  middle_name,
  crop,
  city,
  country,
  phone_number,
  language,
  customer,
  onCancel,
  isLoading,
}) => (
  <Formik
    onSubmit={values => onSubmit(values, onCancel)}
    validationSchema={contactFormValidation}
    initialValues={{
      first_name: first_name || '',
      last_name: last_name || '',
      middle_name: middle_name || '',
      phone_number: phone_number || '',
      crop: crop || '',
      city: city || '',
      country: country || '',
      language: language || '',
      customer: customer || '',
    }}
  >
    {({ values, errors, touched, handleSubmit, handleChange }) => (
      <form onSubmit={handleSubmit}>
        <Box mt="16px">
          <div className="row">
            <div className="col-md-6">
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
            <div className="col-md-6">
              <Input
                mb="20px"
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
            <div className="col-md-6">
              <Input
                mb="20px"
                id="middle_name"
                name="middle_name"
                type="text"
                label="Middle name"
                touched={touched.middle_name}
                value={values.middle_name}
                onChange={handleChange}
                errorMessage={errors.middle_name}
                isInvalid={errors.middle_name && touched.middle_name}
              />
            </div>
            <div className="col-md-6">
              <Field
                name="crop"
                render={({ field, form }) => (
                  <Dropdown
                    {...field}
                    mb="20px"
                    name="crop"
                    label="Crop managed"
                    touched={touched.crop}
                    value={values.crop}
                    options={[{ value: 'Cashew', label: 'Cashew' }]}
                    errorMessage={errors.crop}
                    isInvalid={errors.crop && touched.crop}
                    onChange={crop => form.setFieldValue('crop', crop)}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Field
                name="country"
                render={({ field, form }) => (
                  <Dropdown
                    {...field}
                    mb="20px"
                    name="country"
                    label="Country"
                    touched={touched.country}
                    value={values.country}
                    options={[{ value: 'Ethiopia', label: 'Ethiopia' }]}
                    errorMessage={errors.country}
                    isInvalid={errors.country && touched.country}
                    onChange={country => form.setFieldValue('country', country)}
                  />
                )}
              />
            </div>
            <div className="col-md-6">
              <Field
                name="city"
                render={({ field, form }) => (
                  <Dropdown
                    {...field}
                    mb="20px"
                    name="city"
                    label="City"
                    touched={touched.city}
                    value={values.city}
                    options={[{ value: 'Addis Ababa', label: 'Addis Ababa' }]}
                    errorMessage={errors.city}
                    isInvalid={errors.city && touched.city}
                    onChange={city => form.setFieldValue('city', city)}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Field
                name="language"
                render={({ field, form }) => (
                  <Dropdown
                    {...field}
                    mb="20px"
                    name="language"
                    label="language"
                    touched={touched.language}
                    value={values.language}
                    options={[
                      { value: 'English', label: 'English' },
                      { value: 'French', label: 'French' },
                    ]}
                    errorMessage={errors.language}
                    isInvalid={errors.language && touched.language}
                    onChange={language =>
                      form.setFieldValue('language', language)
                    }
                  />
                )}
              />
            </div>
            <div className="col-md-6">
              <Input
                mb="20px"
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
          </div>
          <div className="row">
            {isAdmin && (
              <div className="col-md-6">
                <Field
                  name="customer"
                  render={({ field, form }) => (
                    <Dropdown
                      {...field}
                      mb="20px"
                      name="customer"
                      label="Customer"
                      touched={touched.customer}
                      value={values.customer}
                      options={[{ value: 'Daniel Wass', label: 'Daniel Wass' }]}
                      errorMessage={errors.customer}
                      isInvalid={errors.customer && touched.customer}
                      onChange={customer =>
                        form.setFieldValue('customer', customer)
                      }
                    />
                  )}
                />
              </div>
            )}
            <div className="col-md-6">
              <EmptyButton block css={AddContactButtonStyle}>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Text color="#8c8c8c">Add phone number</Text>
                  <Icon name="add" color="#459b5e" />
                </Flex>
              </EmptyButton>
            </div>
          </div>
        </Box>
        <Box className="row" mt="24px">
          <div className="col-md-6">
            <Button kind="gray" block onClick={onCancel} type="button">
              Cancel
            </Button>
          </div>
          <div className="col-md-6">
            <Button kind="orange" block isLoading={isLoading}>
              Save
            </Button>
          </div>
        </Box>
      </form>
    )}
  </Formik>
);

ContactForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default ContactForm;
