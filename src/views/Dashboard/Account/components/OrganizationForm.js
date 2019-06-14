import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Select';

const organizationValdationSchema = yup.object().shape({
  organization_name: yup.string().required('Company name is required'),
});

const OrganizationForm = ({
  onSubmit,
  organization_name,
  country,
  city,
  organization_zip_code,
  organization_plot_number,
  organization_street,
}) => {
  return (
    <Formik
      initialValues={{
        organization_name: organization_name || '',
        country: country || '',
        city: city || '',
        organization_zip_code: organization_zip_code || '',
        organization_plot_number: organization_plot_number || '',
        organization_street: organization_street || '',
      }}
      onSubmit={values => onSubmit(values)}
      validationSchema={organizationValdationSchema}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <Input
                    mb="20px"
                    id="organization_name"
                    name="organization_name"
                    type="text"
                    label="Company name"
                    touched={touched.organization_name}
                    value={values.organization_name}
                    onChange={handleChange}
                    errorMessage={errors.organization_name}
                    isInvalid={errors.organization_name && touched.organization_name}
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
                    id="organization_zip_code"
                    name="organization_zip_code"
                    type="text"
                    label="Zip code"
                    touched={touched.organization_zip_code}
                    value={values.organization_zip_code}
                    onChange={handleChange}
                    errorMessage={errors.organization_zip_code}
                    isInvalid={errors.organization_zip_code && touched.organization_zip_code}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    mb="20px"
                    id="organization_plot_number"
                    name="organization_plot_number"
                    type="text"
                    label="Plot number"
                    touched={touched.organization_plot_number}
                    value={values.organization_plot_number}
                    onChange={handleChange}
                    errorMessage={errors.organization_plot_number}
                    isInvalid={errors.organization_plot_number && touched.organization_plot_number}
                  />
                </div>
                <div className="col-md-12">
                  <Input
                    mb="20px"
                    id="organization_street"
                    name="organization_street"
                    type="text"
                    label="Street"
                    touched={touched.organization_street}
                    value={values.organization_street}
                    onChange={handleChange}
                    errorMessage={errors.organization_street}
                    isInvalid={errors.organization_street && touched.organization_street}
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

OrganizationForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default OrganizationForm;
