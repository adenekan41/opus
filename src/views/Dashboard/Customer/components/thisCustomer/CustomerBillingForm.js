import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Input from '../../../../../components/Input';
import TextArea from '../../../../../components/TextArea';
import Button from '../../../../../components/Button';

const CustomerBillingValdationSchema = yup.object().shape({
  vat: yup.string().required('VAT is required'),
  company_reg_number: yup
    .string()
    .required('Company Registraion Number is required'),
   company_service_delivery: yup.string().required('Service Delivery is required'),
});

const CustomerBillingForm = ({ onSubmit, vat, company_reg_number , company_service_delivery}) => {
  return (
    <Formik
      initialValues={{
        vat: vat || '',
        company_reg_number: company_reg_number || '',
        company_service_delivery: company_service_delivery || '',
      }}
      validationSchema={CustomerBillingValdationSchema}
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
                <div className="col-md-12">
                  <TextArea
                    mb="20px"
                    type="text"
                    name="company_service_delivery"
                    label="Service Delivery"
                    touched={touched.company_service_delivery}
                    value={values.company_service_delivery}
                    errorMessage={errors.company_service_delivery}
                    isInvalid={
                      errors.company_service_delivery && touched.company_service_delivery
                    }
                    onChange={handleChange}
                    style={{height:'300px'}}
                  ></TextArea>
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

CustomerBillingForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default CustomerBillingForm;
