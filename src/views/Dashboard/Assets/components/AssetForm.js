import React from "react";
import * as yup from "yup";
import { Box } from "rebass";
import { Formik } from "formik";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { ErrorAlertComponent } from "../../../../components/AlertComponent";

const cropFormValidation = yup.object().shape({
  name: yup.string().required("Crop name is required"),
});

export default function AssetForm({
  apiErrors,
  onSubmit,
  label,
  isLoading,
  name,
  id,
  onCancel,
}) {
  return (
    <Formik
      validationSchema={cropFormValidation}
      onSubmit={values => onSubmit(values, onCancel)}
      initialValues={{ name: name || "", id: id || "" }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <Box my={3}>
            <ErrorAlertComponent errors={apiErrors} />
          </Box>
          <Input
            id="name"
            name="name"
            label={label}
            value={values.name}
            touched={touched.name}
            onChange={handleChange}
            errorMessage={errors.name}
            isInvalid={errors.name && touched.name}
          />

          <Box className="row" mt="24px">
            <div className="col-md-6">
              <Button
                kind="gray"
                block
                onClick={onCancel}
                type="button"
                mb="8px"
              >
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
}
