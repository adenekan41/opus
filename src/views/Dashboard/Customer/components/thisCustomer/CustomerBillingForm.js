import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../../../../components/Input";
import TextArea from "../../../../../components/TextArea";
import Button from "../../../../../components/Button";

const CustomerBillingValdationSchema = yup.object().shape({
  billing_vat_number: yup.string().required("VAT is required"),
  billing_registration_number: yup
    .string()
    .required("Company Registraion Number is required"),
});

const CustomerBillingForm = ({
  id,
  onSubmit,
  isLoading,
  billing_vat_number,
  billing_registration_number,
  billing_service_delivery,
}) => {
  return (
    <Formik
      initialValues={{
        id: id || "",
        billing_vat_number: billing_vat_number || "",
        billing_registration_number: billing_registration_number || "",
        billing_service_delivery: billing_service_delivery || "",
      }}
      onSubmit={values => onSubmit(values)}
      validationSchema={CustomerBillingValdationSchema}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <Input
                    mb="20px"
                    id="billing_vat_number"
                    name="billing_vat_number"
                    type="text"
                    label="VAT"
                    touched={touched.billing_vat_number}
                    value={values.billing_vat_number}
                    onChange={handleChange}
                    errorMessage={errors.billing_vat_number}
                    isInvalid={
                      errors.billing_vat_number && touched.billing_vat_number
                    }
                  />
                </div>
                <div className="col-md-12">
                  <Input
                    mb="20px"
                    id="billing_registration_number"
                    name="billing_registration_number"
                    type="text"
                    label="Company registration number"
                    touched={touched.billing_registration_number}
                    value={values.billing_registration_number}
                    onChange={handleChange}
                    errorMessage={errors.billing_registration_number}
                    isInvalid={
                      errors.billing_registration_number &&
                      touched.billing_registration_number
                    }
                  />
                </div>
                <div className="col-md-12">
                  <TextArea
                    mb="20px"
                    type="text"
                    name="billing_service_delivery"
                    placeholder="Service Delivery"
                    touched={touched.billing_service_delivery}
                    value={values.billing_service_delivery}
                    errorMessage={errors.billing_service_delivery}
                    isInvalid={
                      errors.billing_service_delivery &&
                      touched.billing_service_delivery
                    }
                    onChange={handleChange}
                    style={{ height: "300px" }}
                  />
                </div>
              </div>
              <hr />

              <div className="footer_button mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <Button
                      block
                      size="large"
                      kind="orange"
                      type="submit"
                      isLoading={isLoading}
                    >
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

CustomerBillingForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default CustomerBillingForm;
