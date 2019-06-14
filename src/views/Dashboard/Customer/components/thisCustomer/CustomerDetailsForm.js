import React from 'react';
import { Formik } from 'formik';
import { Box } from 'rebass';
import * as yup from 'yup';
import styled from 'styled-components';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import Card from "../../../../../components/Card"
const profileValdationSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
});
const CustomSwitch =  styled.div`
display: inline-flex;
width: 100%;
p{
    margin-left: 1rem;
    margin-top: 5px;
    font-weight: 700;
    margin-bottom:0;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 29px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 21px;
  width: 21px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #3ccb29;
}

input:focus + .slider {
  box-shadow: 0 0 1px #3ccb29;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
`
const CustomerDetailsForm = ({
  onSubmit,
  first_name,
  last_name,
  middle_name,
  phone_number,
  location,
  email,
  onEmailChange,
  onPasswordChange,
}) => (
  <Formik
    initialValues={{
      first_name,
      last_name,
      middle_name,
      phone_number,
      location,
    }}
    onSubmit={values => onSubmit(values)}
    validationSchema={profileValdationSchema}
  >
    {({ values, touched, errors, handleChange, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <Input
              mb="20px"
              id="first_name"
              name="first_name"
              type="text"
              label="First name"
              touched={touched.first_name}
              value={values.first_name}
              onChange={handleChange}
              errorMessage={errors.first_name}
              isInvalid={errors.first_name && touched.first_name}
            />
          </div>
          <div className="col">
            <Input
              mb="20px"
              id="middle_name"
              name="middle_name"
              type="text"
              label="Middle name"
              touched={touched.middle_name}
              value={values.middle_name}
              onChange={handleChange}
              errorMessage={errors.middle_name}
              isInvalid={errors.middle_name && touched.middle_name}
            />
          </div>
          <div className="col">
            <Input
              id="last_name"
              name="last_name"
              type="text"
              label="Last name"
              touched={touched.last_name}
              value={values.last_name}
              onChange={handleChange}
              errorMessage={errors.last_name}
              isInvalid={errors.last_name && touched.last_name}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Input
              id="phone_number"
              name="phone_number"
              type="tel"
              label="Phone number"
              touched={touched.phone_number}
              value={values.phone_number}
              onChange={handleChange}
              errorMessage={errors.phone_number}
              isInvalid={errors.phone_number && touched.phone_number}
            />
          </div>
          <div className="col-md-4">
            <Input
              id="location"
              name="location"
              type="text"
              label="Location"
              touched={touched.location}
              value={values.location}
              onChange={handleChange}
              errorMessage={errors.location}
              isInvalid={errors.location && touched.location}
            />
          </div>
        </div>

        <br />
        <hr />

        <div className="row">
            <div className="col-md-4">
                <Card padding="1.5rem">
                    <CustomSwitch>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                        <p>Manual Messages</p>
                    </CustomSwitch>
                </Card>
            </div>
            <div className="col-md-4">
                <Card padding="1.5rem">
                    <CustomSwitch>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                        <p>Automatic Messages</p>
                    </CustomSwitch>
                </Card>
            </div>
            <div className="col-md-4">
                <Card padding="1.5rem">
                    <CustomSwitch>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                        <p>Advisory Messages</p>
                    </CustomSwitch>
                </Card>
            </div>
        </div>
        <hr />
        <br />
        <div className="row">
          <div className="col-md-4">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              disabled
              value={email}
            />
          </div>
          <div className="col-md-4">
            <ChangeEmailForm onSubmit={onEmailChange}/>
          </div>
        </div>

        <Box mt="20px">
          <div className="row">
            <div className="col-md-4">
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                disabled
                value="........"
              />
            </div>
            <div className="col-md-4">
            <ChangePasswordForm onSubmit={onPasswordChange}/>
            </div>
          </div>
        </Box>
        <Box mt="32px">
          <hr />
        </Box>
        <div className="footer_button mt-3">
          <div className="row">
            <div className="col-md-4">
              <Button size="large" block type="button" kind="red">
                Deactivate Account
              </Button>
            </div>
            <div className="col-md-8">
              <Button size="large" block kind="orange">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    )}
  </Formik>
);

export default CustomerDetailsForm;
