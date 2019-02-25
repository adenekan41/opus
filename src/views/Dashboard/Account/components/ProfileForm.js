import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Input from '../../../../components/Input';

const profileValdationSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
});

const ProfileForm = ({
  onSubmit,
  first_name,
  last_name,
  middle_name,
  phone_number,
  location,
}) => (
  <Formik
    initialValues={{
      first_name,
      last_name,
      middle_name,
      phone_number,
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
          <div className="col-md-8">
            <Input
              id="location"
              name="location"
              type="text"
              label="Location"
              touched={touched.location}
              value={values.location}
              onChange={handleChange}
              errorMessage={errors.location}
              isInvalid={errors.location && touched.location}
            />
          </div>
        </div>
      </form>
    )}
  </Formik>
);

export default ProfileForm;
