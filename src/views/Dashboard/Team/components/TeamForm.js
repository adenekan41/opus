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
  model_permission: yup.object().required('Crop models permission is required'),
  message_permission: yup.object().required('Messages permission is required'),
});

const TeamForm = ({
  onSubmit,
  isAdmin = true,
  isAdd,
  email,
  model_permission,
  message_permission,
  onCancel,
}) => (
  <Formik
    onSubmit={values => onSubmit(values)}
    validationSchema={teamFormValidation}
    initialValues={{
      email: email || '',
      model_permission: model_permission || {value: true, label: 'YES'},
      message_permission: message_permission ||  {value: true, label: 'YES'},
    }}
  >
    {({ values, errors, touched, handleSubmit, handleChange }) => (
      <form onSubmit={handleSubmit}>
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
        {(isAdmin || isAdd) && (
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
                      form.setFieldValue('model_permission', model_permission)
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
                        message_permission
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
        )}
        <Box className="row" mt="24px">
          <div className="col-md-6">
            <Button kind="gray" block onClick={onCancel} type="button">
              Cancel
            </Button>
          </div>
          <div className="col-md-6">
            <Button kind="orange" block>
              Save
            </Button>
          </div>
        </Box>
      </form>
    )}
  </Formik>
);

export default TeamForm;
