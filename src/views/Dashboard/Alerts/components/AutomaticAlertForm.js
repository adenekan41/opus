import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Box } from 'rebass';
import Input from '../../../../components/Input';
import Dropdown from '../../../../components/Select';
import Button from '../../../../components/Button';
import FrequencySelect from './FrequencySelect';

const automaticAlertFormValidation = yup.object().shape({
  name: yup.string().required('Project name is required'),
  forecast_type: yup.string().required('Forecast type is required'),
  location: yup.string().required('Location is required'),
  recipients: yup.object().required('Recipients is required'),
  frequency: yup.object().required('Recipients is required'),
  type: yup.object().required('Message type is required'),
});

const AutomaticAlertForm = ({
  onSubmit,
  onCancel,
  name,
  type,
  recipients,
  forecast_type,
  location,
}) => (
  <Formik
    onSubmit={values => onSubmit(values)}
    initialValues={{
      name: name || '',
      type: type || {},
      recipients: recipients || [],
      forecast_type: forecast_type || '',
      location: location || '',
    }}
    validationSchema={automaticAlertFormValidation}
  >
    {({ values, errors, touched, handleSubmit, handleChange }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input
              mb="20px"
              id="name"
              label="Project name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={errors.name && touched.name}
              errorMessage={errors.name}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="type"
              render={({ form, field }) => (
                <Dropdown
                  {...field}
                  mb="20px"
                  id="type"
                  name="type"
                  label="Message type"
                  options={[{ value: 'whatsapp', label: 'Whatsapp' }]}
                  touched={touched.type}
                  value={values.type}
                  onChange={type => form.setFieldValue('type', type)}
                  errorMessage={errors.type}
                  isInvalid={errors.type && touched.type}
                />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Field
              name="recipients"
              render={({ form, field }) => (
                <Dropdown
                  {...field}
                  isMulti
                  mb="20px"
                  id="recipients"
                  name="recipients"
                  label="Recipients"
                  options={[{ value: 'whatsapp', label: 'Whatsapp' }]}
                  touched={touched.recipients}
                  value={values.recipients}
                  onChange={recipients =>
                    form.setFieldValue('recipients', recipients)
                  }
                  errorMessage={errors.recipients}
                  isInvalid={errors.recipients && touched.recipients}
                />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="forecast_type"
              render={({ form, field }) => (
                <Dropdown
                  {...field}
                  mb="20px"
                  id="forecast_type"
                  name="forecast_type"
                  label="Forecast type"
                  options={[]}
                  touched={touched.forecast_type}
                  value={values.forecast_type}
                  onChange={forecast_type =>
                    form.setFieldValue('forecast_type', forecast_type)
                  }
                  errorMessage={errors.forecast_type}
                  isInvalid={errors.forecast_type && touched.forecast_type}
                />
              )}
            />
          </div>
          <div className="col-md-6">
            <Input
              mb="20px"
              id="location"
              label="Location"
              type="text"
              name="location"
              value={values.location}
              onChange={handleChange}
              isInvalid={errors.location && touched.location}
              errorMessage={errors.location}
            />
          </div>
        </div>
        <Box>
          <Field
            name="frequency"
            render={({ field, form }) => (
              <FrequencySelect
                {...field}
                name="frequency"
                onChange={frequency =>
                  form.setFieldValue('frequency', frequency)
                }
              />
            )}
          />
        </Box>
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

AutomaticAlertForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default AutomaticAlertForm;
