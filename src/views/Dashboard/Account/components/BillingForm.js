import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

const billingValdationSchema = yup.object().shape({
  vat: yup.string().required('VAT is required'),
  company_reg_number: yup
    .string()
    .required('Company Registraion Number is required'),
});

const BillingForm = ({ onSubmit, vat, company_reg_number }) => {
  return (
    <Formik
      initialValues={{
        vat: vat || '',
        company_reg_number: company_reg_number || '',
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
                    id="vat"
                    name="vat"
                    type="text"
                    label="VAT"
                    touched={touched.vat}
                    value={values.vat}
                    onChange={handleChange}
                    errorMessage={errors.vat}
                    isInvalid={errors.vat && touched.vat}
                  />
                </div>
                <div className="col-md-12">
                  <Input
                    mb="20px"
                    id="company_reg_number"
                    name="company_reg_number"
                    type="text"
                    label="Company registration number"
                    touched={touched.company_reg_number}
                    value={values.company_reg_number}
                    onChange={handleChange}
                    errorMessage={errors.company_reg_number}
                    isInvalid={
                      errors.company_reg_number && touched.company_reg_number
                    }
                  />
                </div>
              </div>
              <hr />

              <div className="footer_button mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <Button size="large" block kind="orange" type="submit">
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
