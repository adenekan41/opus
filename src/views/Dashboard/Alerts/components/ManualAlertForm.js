import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Box } from 'rebass';
import TextArea from '../../../../components/TextArea';
import Input from '../../../../components/Input';
import Dropdown from '../../../../components/Select';
import Button from '../../../../components/Button';

const manualAlertFormValidation = yup.object().shape({
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
  recipients: yup.object().required('Recipients is required'),
  type: yup.object().required('Message type is required'),
});

const ManualAlertForm = ({
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
    validationSchema={manualAlertFormValidation}
  >
    {({ values, errors, touched, handleSubmit, handleChange }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input
              mb="20px"
              id="subject"
              label="subject"
              type="text"
              name="Subject"
              value={values.subject}
              onChange={handleChange}
              isInvalid={errors.subject && touched.subject}
              errorMessage={errors.subject}
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
          <div className="col-md-12">
            <TextArea
              id="message"
              placeholder="Message"
              name="message"
              value={values.message}
              onChange={handleChange}
              isInvalid={errors.message && touched.message}
              errorMessage={errors.message}
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

ManualAlertForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default ManualAlertForm;
