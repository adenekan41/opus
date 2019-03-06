import React from 'react';
import { Formik, Field } from 'formik';
import { Box } from 'rebass';
import * as yup from 'yup';
import Dropdown from '../../../../components/Select';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

const teamFormValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is required'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  gender: yup.string().required('Gender is required'),
  // model_permission: yup.bool().required('Crop models permission is required'),
  // message_permission: yup.bool().required('Messages permission is required'),
});

const TeamForm = ({
  id,
  onSubmit,
  isAdmin = true,
  isAdd,
  email,
  first_name,
  last_name,
  gender,
  isLoading,
  model_permission,
  message_permission,
  onCancel,
}) => (
  <Formik
    onSubmit={values => onSubmit(values, onCancel)}
    validationSchema={teamFormValidation}
    initialValues={{
      id: id || '',
      email: email || '',
      first_name: first_name || '',
      last_name: last_name || '',
      gender: gender || '',
      // model_permission: model_permission || true,
      // message_permission: message_permission || true,
    }}
  >
    {({ values, errors, touched, handleSubmit, handleChange }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input
              mb="20px"
              id="first_name"
              name="first_name"
              type="first_name"
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
              type="last_name"
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
              id="email"
              name="email"
              type="email"
              label="Email address"
              touched={touched.email}
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
              isInvalid={errors.email && touched.email}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="gender"
              render={({ form, field }) => (
                <Dropdown
                  {...field}
                  mb="20px"
                  id="gender"
                  name="gender"
                  label="Gender"
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                  ]}
                  touched={touched.gender}
                  onChange={gender => form.setFieldValue('gender', gender.value)}
                  errorMessage={errors.gender}
                  isInvalid={errors.gender && touched.gender}
                />
              )}
            />
          </div>
        </div>
        {/* {(isAdmin || isAdd) && (
          <div className="row">
            <div className="col-md-6">
              <Field
                name="model_permission"
                render={({ form, field }) => (
                  <Dropdown
                    {...field}
                    mb="20px"
                    id="model_permission"
                    name="model_permission"
                    label="Crop models permission?"
                    options={[
                      { value: true, label: 'YES' },
                      { value: false, label: 'NO' },
                    ]}
                    touched={touched.model_permission}
                    onChange={model_permission =>
                      form.setFieldValue('model_permission', model_permission.value)
                    }
                    errorMessage={errors.model_permission}
                    isInvalid={
                      errors.model_permission && touched.model_permission
                    }
                  />
                )}
              />
            </div>
            <div className="col-md-6">
              <Field
                name="message_permission"
                render={({ form, field }) => (
                  <Dropdown
                    {...field}
                    mb="20px"
                    id="message_permission"
                    name="message_permission"
                    label="Messages permission?"
                    options={[
                      { value: true, label: 'YES' },
                      { value: false, label: 'NO' },
                    ]}
                    touched={touched.message_permission}
                    onChange={message_permission =>
                      form.setFieldValue(
                        'message_permission',
                        message_permission.value
                      )
                    }
                    errorMessage={errors.message_permission}
                    isInvalid={
                      errors.message_permission && touched.message_permission
                    }
                  />
                )}
              />
            </div>
          </div>
        )} */}
        <Box className="row" mt="24px">
          <div className="col-md-6">
            <Button kind="gray" block onClick={onCancel} type="button" mb="8px">
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

TeamForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default TeamForm;
