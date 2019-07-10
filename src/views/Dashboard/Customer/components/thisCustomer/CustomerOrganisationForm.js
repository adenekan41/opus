import { Field, Formik } from "formik";
import isEqual from 'lodash.isequal';
import React, { useState } from "react";
import * as yup from "yup";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import Dropdown from "../../../../../components/Select";
import { allCountries, getCountryStates } from "../../../../../helpers/countries";
import { getStates } from "../../../../../helpers/functions";

const CustomerOrganizationValdationSchema = yup.object().shape({
  organisation_name: yup.string().required("Company name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required")
});

const CustomerOrganizationForm = ({
  onSubmit,
  organisation_name,
  country,
  city,
  id,
  isLoading,
  organisation_zip_code,
  organisation_plot_number,
  organisation_street,
  countries,
}) => {
  const [cities, setCities] = useState(
    getCountryStates(getStates(country, countries)) || []
  );
  const initialValue = {
    id: id || "",
    organisation_name: organisation_name || "",
    country: country || "",
    city: city || "",
    organisation_zip_code: organisation_zip_code || "",
    organisation_plot_number: organisation_plot_number || "",
    organisation_street: organisation_street || "",
  }
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={values => onSubmit(values)}
      validationSchema={CustomerOrganizationValdationSchema}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <Input
                    mb="20px"
                    id="organisation_name"
                    name="organisation_name"
                    type="text"
                    isRequired
                    label="Company name"
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
                  <Field
                    name="country"
                    render={({ form, field }) => (
                      <Dropdown
                        {...field}
                        mb="20px"
                        id="country"
                        isRequired
                        name="country"
                        label="Country"
                        options={countries}
                        touched={touched.country}
                        value={values.country}
                        onChange={country => {
                          const value = country.value;
                          const countryName = country.label;
                          const selectedCountry = allCountries.find(
                            country => {
                              return country.name.toLowerCase() ===
                              countryName.toLowerCase()
                            }
                          );
                         
                          form.setFieldValue("country", value);
                          setCities(getCountryStates(selectedCountry.id));
                        }}
                        errorMessage={errors.country}
                        isInvalid={errors.country && touched.country}
                      />
                    )}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="city"
                    render={({ form, field }) => (
                      <Dropdown
                        {...field}
                        mb="20px"
                        id="city"
                        isRequired
                        name="city"
                        label="City"
                        options={cities}
                        touched={touched.city}
                        value={values.city}
                        onChange={city => form.setFieldValue("city", city.value)}
                        errorMessage={errors.city}
                        isInvalid={errors.city && touched.city}
                      />
                    )}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    mb="20px"
                    id="organisation_zip_code"
                    name="organisation_zip_code"
                    type="text"
                    label="Zip code"
                    touched={touched.organisation_zip_code}
                    value={values.organisation_zip_code}
                    onChange={handleChange}
                    errorMessage={errors.organisation_zip_code}
                    isInvalid={
                      errors.organisation_zip_code &&
                      touched.organisation_zip_code
                    }
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    mb="20px"
                    id="organisation_plot_number"
                    name="organisation_plot_number"
                    type="text"
                    label="Plot number"
                    touched={touched.organisation_plot_number}
                    value={values.organisation_plot_number}
                    onChange={handleChange}
                    errorMessage={errors.organisation_plot_number}
                    isInvalid={
                      errors.organisation_plot_number &&
                      touched.organisation_plot_number
                    }
                  />
                </div>
                <div className="col-md-12">
                  <Input
                    mb="20px"
                    id="organisation_street"
                    name="organisation_street"
                    type="text"
                    label="Street"
                    touched={touched.organisation_street}
                    value={values.organisation_street}
                    onChange={handleChange}
                    errorMessage={errors.organisation_street}
                    isInvalid={
                      errors.organisation_street && touched.organisation_street
                    }
                  />
                </div>
              </div>
              <hr />

              <div className="footer_button mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <Button
                      size="large"
                      block
                      kind="orange"
                      disabled={isEqual(initialValue, values)}
                      type="submit"
                      isLoading={isLoading}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

CustomerOrganizationForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default CustomerOrganizationForm;
