import { Field, Formik } from "formik";
import React from "react";
import { Box } from "rebass";
import * as yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Dropdown from "../../../../components/Select";
import { phoneRegExp } from "../../../../helpers/constants";
import { allCountries, getCountryStates } from "../../../../helpers/countries";
import { getStates } from "../../../../helpers/functions";

const customerFormValidation = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  crop_managed: yup.string().required("Crop managed is required"),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  organisation_name: yup.string().required("Company is required"),
  email: yup.string().required("Email is required"),
});

class CustomerForm extends React.Component {
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
      onSubmit,
      first_name,
      last_name,
      middle_name,
      crop_managed,
      city,
      email,
      country,
      phone_number,
      organisation_name,
      countries,
      crops,
      onCancel,
    } = this.props;
    return (
      <Formik
        onSubmit={values => onSubmit(values)}
        validationSchema={customerFormValidation}
        initialValues={{
          id: id || "",
          first_name: first_name || "",
          last_name: last_name || "",
          middle_name: middle_name || "",
          phone_number: phone_number || "",
          crop_managed: crop_managed || "",
          city: city || "",
          country: country || "",
          email: email || "",
          organisation_name: organisation_name || "",
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
                    isRequired
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
                        isRequired
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
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name="country"
                    render={({ field, form }) => (
                      <Dropdown
                        {...field}
                        mb="20px"
                        isRequired
                        name="country"
                        label="Country"
                        touched={touched.country}
                        options={countries}
                        errorMessage={errors.country}
                        isInvalid={errors.country && touched.country}
                        onChange={country => {
                          const countryName = country.label;
                          const selectedCountry = allCountries.find(
                            country =>
                              country.name.toLowerCase() ===
                              countryName.toLowerCase()
                          );
                          form.setFieldValue("country", country.value);
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
                        isRequired
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
                  <Input
                    mb="20px"
                    id="organisation_name"
                    name="organisation_name"
                    type="text"
                    label="Company"
                    isRequired
                    touched={touched.organisation_name}
                    value={values.organisation_name}
                    onChange={handleChange}
                    errorMessage={errors.organisation_name}
                    isInvalid={
                      errors.organisation_name && touched.organisation_name
                    }
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    mb="20px"
                    id="email"
                    name="email"
                    type="text"
                    isRequired
                    label="Email Address"
                    touched={touched.email}
                    value={values.email}
                    onChange={handleChange}
                    errorMessage={errors.email}
                    isInvalid={errors.email && touched.email}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Input
                    mb="20px"
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
                <Button kind="orange" block mb="8px">
                  Next
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
