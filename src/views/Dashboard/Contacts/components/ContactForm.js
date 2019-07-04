import React from "react";
import { Formik, Field } from "formik";
import { Box } from "rebass";
import * as yup from "yup";
import isEqual from "lodash.isequal";
import Dropdown from "../../../../components/Select";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { getCountryStates, allCountries } from "../../../../helpers/countries";
import { ErrorAlertComponent } from "../../../../components/AlertComponent";
import { getStates } from "../../../../helpers/functions";
import { phoneRegExp } from "../../../../helpers/constants";

const contactFormValidation = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  crop_managed: yup.string().required("Crop managed is required"),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    const { countries, country } = this.props;
    this.state = {
      cities: getCountryStates(getStates(country, countries)) || [],
    };
  }

  setCities = cities => {
    this.setState({
      cities,
    });
  };

  render() {
    const {
      id,
      crops,
      onSubmit,
      isAdmin = true,
      first_name,
      last_name,
      middle_name,
      crop_managed,
      city,
      country,
      phone_numbers,
      language,
      customer,
      onCancel,
      isLoading,
      countries,
      customers,
      apiErrors,
    } = this.props;

    let initialValues = {
      id,
      first_name,
      last_name,
      middle_name,
      crop_managed,
      city,
      country,
      language,
      customer,
      phone_number: phone_numbers && phone_numbers[0],
    };

    return (
      <Formik
        onSubmit={values => onSubmit(values, onCancel)}
        validationSchema={contactFormValidation}
        initialValues={{
          id: id || "",
          first_name: first_name || "",
          last_name: last_name || "",
          middle_name: middle_name || "",
          phone_number: (phone_numbers && phone_numbers[0]) || "",
          crop_managed: crop_managed || "",
          city: city || "",
          country: country || "",
          language: language || "",
          customer: customer || "",
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <ErrorAlertComponent errors={apiErrors} />
            </Box>
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
                        label="Crop"
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
                          const value = country.value;
                          const countryName = country.label;
                          const selectedCountry = allCountries.find(
                            country =>
                              country.name.toLowerCase() ===
                              countryName.toLowerCase()
                          );
                          form.setFieldValue("country", value);
                          this.setCities(getCountryStates(selectedCountry.id));
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
                        options={this.state.cities}
                        errorMessage={errors.city}
                        isInvalid={errors.city && touched.city}
                        onChange={city =>
                          form.setFieldValue("city", city.value)
                        }
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
                        label="Language"
                        touched={touched.language}
                        options={[
                          { value: "English", label: "English" },
                          { value: "French", label: "French" },
                        ]}
                        errorMessage={errors.language}
                        isInvalid={errors.language && touched.language}
                        onChange={language =>
                          form.setFieldValue("language", language.value)
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
                          options={customers}
                          errorMessage={errors.customer}
                          isInvalid={errors.customer && touched.customer}
                          onChange={customer =>
                            form.setFieldValue("customer", customer.value)
                          }
                        />
                      )}
                    />
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
                <Button
                  block
                  mb="8px"
                  kind="orange"
                  isLoading={isLoading}
                  disabled={isEqual(values, initialValues)}
                >
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

ContactForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default ContactForm;
