import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

const billingValdationSchema = yup.object().shape({
  billing_vat_number: yup.string().required("VAT is required"),
  billing_registration_number: yup
    .string()
    .required("Company Registraion Number is required"),
});

const BillingForm = ({
  onSubmit,
  isLoading,
  billing_registration_number,
  billing_service_delivery,
  billing_vat_number,
}) => {
  return (
    <Formik
      initialValues={{
        billing_registration_number: billing_registration_number || "",
        billing_service_delivery: billing_service_delivery || "",
        billing_vat_number: billing_vat_number || "",
      }}
      validationSchema={billingValdationSchema}
      onSubmit={values => onSubmit(values)}
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
                    label="VAT Number"
                    touched={touched.billing_vat_number}
                    value={values.billing_vat_number}
                    onChange={handleChange}
                    errorMessage={errors.billing_vat_number}
                    isInvalid={errors.billing_vat_number && touched.billing_vat_number}
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
                      errors.billing_registration_number && touched.billing_registration_number
                    }
                  />
                </div>
              </div>
              <hr />

              <div className="footer_button mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <Button
                      size="large"
                      block
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

BillingForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default BillingForm;
