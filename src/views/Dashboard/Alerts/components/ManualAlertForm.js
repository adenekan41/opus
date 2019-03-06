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
  phone_number: yup.array().required('Recipients is required'),
  type: yup.string().required('Message type is required'),
});

const ManualAlertForm = ({
  onSubmit,
  onCancel,
  subject,
  type,
  phone_number,
  message,
  isLoading,
  contacts,
}) => (
  <Formik
    onSubmit={values => onSubmit(values, onCancel)}
    initialValues={{
      subject: subject || '',
      type: type || 'whatsapp',
      message: message || '',
      phone_number: phone_number || '',
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
              label="Subject"
              type="text"
              name="subject"
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
                  onChange={type => form.setFieldValue('type', type.value)}
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
              name="phone_number"
              render={({ form, field }) => (
                <Dropdown
                  {...field}
                  isMulti
                  mb="20px"
                  id="phone_number"
                  name="phone_number"
                  label="Recipients"
                  options={contacts}
                  touched={touched.phone_number}
                  errorMessage={errors.phone_number}
                  onChange={recipients => {
                    form.setFieldValue('phone_number', recipients.map(recipient => recipient.value));
                  }}
                  isInvalid={errors.phone_number && touched.phone_number}
                />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TextArea
              rows={5}
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

ManualAlertForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default ManualAlertForm;
