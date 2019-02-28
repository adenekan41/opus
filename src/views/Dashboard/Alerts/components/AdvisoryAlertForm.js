import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Box } from 'rebass';
import Dropdown from '../../../../components/Select';
import Button from '../../../../components/Button';

const advisoryAlertFormValidation = yup.object().shape({
  model: yup.string().required('Advisory model is required'),
  recipients: yup.object().required('Recipients is required'),
});

const AdvisoryAlertForm = ({
  onSubmit,
  onCancel,
  subject,
  type,
  recipients,
  message,
}) => (
  <Formik
    onSubmit={values => onSubmit(values)}
    initialValues={{
      subject: subject || '',
      type: type || {},
      message: message || '',
      recipients: recipients || [],
    }}
    validationSchema={advisoryAlertFormValidation}
  >
    {({ values, errors, touched, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <Field
              name="model"
              render={({ form, field }) => (
                <Dropdown
                  {...field}
                  mb="20px"
                  id="model"
                  name="model"
                  label="Advisory Model"
                  options={[]}
                  touched={touched.model}
                  value={values.model}
                  onChange={model => form.setFieldValue('model', model)}
                  errorMessage={errors.model}
                  isInvalid={errors.model && touched.model}
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

AdvisoryAlertForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default AdvisoryAlertForm;
