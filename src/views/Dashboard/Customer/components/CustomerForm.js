import React from 'react';
import { Formik, Field } from 'formik';
import { Box, Flex, Text } from 'rebass';
import * as yup from 'yup';
import Dropdown from '../../../../components/Select';
import Input from '../../../../components/Input';
import Button, { EmptyButton } from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';

const AddCustomerButtonStyle = `
height: 60px;
padding: 0 16px;
opacity: 0.6;
border-radius: 3px;
border: solid 1px rgba(18, 18, 18, 0.11);
background-color: #ffffff;
`;

const customerFormValidation = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  crop_managed: yup.string().required('Crop managed is required'),
  phone_number: yup.string().required('Phone number is required'),
});

class CustomerForm extends React.Component {
  state = {
    showSecondaryPhoneNumber: false,
  };

  addPhoneNumber = () => {
    this.setState(({ showSecondaryPhoneNumber }) => ({
      showSecondaryPhoneNumber: !showSecondaryPhoneNumber,
    }));
  };

  render() {
    const {
      id,
      onSubmit,
      first_name,
      last_name,
      middle_name,
      crop_managed,
      city,
      country,
      phone_numbers = [],
      company,
      onCancel,
      isLoading,
      countries,
      cities,
      crops,
      getCountryCities,
    } = this.props;
    return (
      <Formik
        onSubmit={values => onSubmit(values, onCancel)}
        validationSchema={customerFormValidation}
        initialValues={{
          id: id || '',
          first_name: first_name || '',
          last_name: last_name || '',
          middle_name: middle_name || '',
          phone_number: phone_numbers[0] || '',
          crop_managed: crop_managed || '',
          city: city || '',
          country: country || '',
          company: company || '',
          
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
                          form.setFieldValue('crop_managed', crop.value)
                        }
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
                        options={countries}
                        errorMessage={errors.country}
                        isInvalid={errors.country && touched.country}
                        onChange={country => {
                          form.setFieldValue('country', country.value);
                          getCountryCities(country.value);
                        }}
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
                        options={cities}
                        errorMessage={errors.city}
                        isInvalid={errors.city && touched.city}
                        onChange={city =>
                          form.setFieldValue('city', city.value)
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Input
                    mb="20px"
                    id="company"
                    name="company"
                    type="text"
                    label="Company"
                    touched={touched.company}
                    value={values.company}
                    onChange={handleChange}
                    errorMessage={errors.company}
                    isInvalid={errors.company && touched.company}
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
               
                {this.state.showSecondaryPhoneNumber ? (
                  <div className="col-md-6">
                    <Input
                      mb="20px"
                      id="secondary_phone_number"
                      name="secondary_phone_number"
                      type="tel"
                      label="Secondary Phone number"
                      touched={touched.secondary_phone_number}
                      value={values.secondary_phone_number}
                      onChange={handleChange}
                      errorMessage={errors.secondary_phone_number}
                      isInvalid={errors.secondary_phone_number && touched.secondary_phone_number}
                    />
                  </div>
                ) : (
                  <div className="col-md-6">
                    <EmptyButton
                      block
                      css={AddCustomerButtonStyle}
                      onClick={this.addPhoneNumber}
                    >
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
                )}
              </div>
            </Box>
            <Box className="row" mt="24px">
              <div className="col-md-6">
                <Button
                  kind="gray"
                  block
                  onClick={onCancel}
                  type="button"
                  mb="8px"
                >
                  Cancel
                </Button>
              </div>
              <div className="col-md-6">
                <Button kind="orange" block isLoading={isLoading} mb="8px">
                  Save
                </Button>
              </div>
            </Box>
          </form>
        )}
      </Formik>
    );
  }
}

CustomerForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default CustomerForm;
