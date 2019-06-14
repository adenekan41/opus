import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import Dropdown from '../../../../../components/Select';

const CustomerOrganizationValdationSchema = yup.object().shape({
  company_name: yup.string().required('Company name is required'),
});

const CustomerOrganizationForm = ({
  onSubmit,
  company_name,
  country,
  city,
  zip_code,
  plot_number,
  street,
}) => {
  return (
    <Formik
      initialValues={{
        company_name: company_name || '',
        country: country || '',
        city: city || '',
        zip_code: zip_code || '',
        plot_number: plot_number || '',
        street: street || '',
      }}
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
                    id="company_name"
                    name="company_name"
                    type="text"
                    label="Company name"
                    touched={touched.company_name}
                    value={values.company_name}
                    onChange={handleChange}
                    errorMessage={errors.company_name}
                    isInvalid={errors.company_name && touched.company_name}
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
                        name="country"
                        label="Country"
                        options={[{ value: 'Nigeria', label: 'Nigeria' }]}
                        touched={touched.country}
                        value={values.country}
                        onChange={country => form.setFieldValue('country', country)}
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
                        name="city"
                        label="City"
                        options={[{ value: 'Lagos', label: 'Lagos' }]}
                        touched={touched.city}
                        value={values.city}
                        onChange={city => form.setFieldValue('city', city)}
                        errorMessage={errors.city}
                        isInvalid={errors.city && touched.city}
                      />
                    )}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    mb="20px"
                    id="zip_code"
                    name="zip_code"
                    type="text"
                    label="Zip code"
                    touched={touched.zip_code}
                    value={values.zip_code}
                    onChange={handleChange}
                    errorMessage={errors.zip_code}
                    isInvalid={errors.zip_code && touched.zip_code}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    mb="20px"
                    id="plot_number"
                    name="plot_number"
                    type="text"
                    label="Plot number"
                    touched={touched.plot_number}
                    value={values.plot_number}
                    onChange={handleChange}
                    errorMessage={errors.plot_number}
                    isInvalid={errors.plot_number && touched.plot_number}
                  />
                </div>
                <div className="col-md-12">
                  <Input
                    mb="20px"
                    id="street"
                    name="street"
                    type="text"
                    label="Street"
                    touched={touched.street}
                    value={values.street}
                    onChange={handleChange}
                    errorMessage={errors.street}
                    isInvalid={errors.street && touched.street}
                  />
                </div>
              </div>
              <hr />

              <div className="footer_button mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <Button size="large" block kind="orange" type="submit">
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
