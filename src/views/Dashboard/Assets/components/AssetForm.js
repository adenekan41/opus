import React from "react";
import * as yup from "yup";
import { Box } from "rebass";
import isEqual from "lodash.isequal";
import { Formik } from "formik";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { ErrorAlertComponent } from "../../../../components/AlertComponent";

const assetFormValidation = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]+$/i, "Asset name cannot contain numbers")
    .min(3, "Asset name is too short - should be 3 chars minimum.")
    .required("Asset name is required"),
});

const weatherStationAssetFormValidation = yup.object().shape({
  name: yup
    .string()
    .min(4, "Weather station name is too short - should be 4 chars minimum.")
    .required("Weather station name is required"),
  device_token: yup
    .string()
    .min(12, "Device token should be 12 chars long.")
    .required("Device token is required"),
});

export default function AssetForm({
  apiErrors,
  onSubmit,
  label,
  isLoading,
  name,
  id,
  device_token,
  onCancel,
}) {
  let isWeatherStation = label.toLowerCase() === "weather station";
  let initialValues = isWeatherStation
    ? {
        name: name || "",
        id: id || "",
        device_token: device_token || "",
      }
    : { name: name || "", id: id || "" };
  return (
    <Formik
      validationSchema={
        isWeatherStation
          ? weatherStationAssetFormValidation
          : assetFormValidation
      }
      onSubmit={values => onSubmit(values, onCancel)}
      initialValues={initialValues}
      isInitialValid
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          {!apiErrors && Object.values(apiErrors).length > 0 && (
            <Box my={3}>
              <ErrorAlertComponent errors={apiErrors} />
            </Box>
          )}
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
          {isWeatherStation && device_token === undefined && (
            <Input
              mt="24px"
              id="device_token"
              name="device_token"
              label="Device token"
              value={values.device_token}
              touched={touched.device_token}
              onChange={handleChange}
              errorMessage={errors.device_token}
              isInvalid={errors.device_token && touched.device_token}
            />
          )}

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
              <Button
                kind="orange"
                block
                isLoading={isLoading}
                mb="8px"
                disabled={isEqual(values, initialValues)}
              >
                Save
              </Button>
            </div>
          </Box>
        </form>
      )}
    </Formik>
  );
}
