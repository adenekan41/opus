import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { Box, Flex } from "rebass";
import * as yup from "yup";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import { FileUploader } from "../../../../components/FileUpload";

const AvatarDiv = styled(Flex)`
  height: 129px;
  border-radius: 50%;
  background-color: #e7e7e7;
  border: 1px solid #242424;
  background-size: cover;
  background-position: top center;
  background-image: url(${props => props.backgroundImage});
`;

const userFormValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone_number: yup.string().required("Phone number is required"),
});

const UserForm = ({
  id,
  onSubmit,
  email,
  first_name,
  last_name,
  other_name,
  phone_number,
  isLoading,
  onCancel,
}) => {
  const [files, setFiles] = React.useState([]);

  const onPhotoDrop = acceptedFiles => {
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const image = files.length > 0 && files[0];

  return (
    <Formik
      onSubmit={values =>
        onSubmit(values, () => {
          setFiles([]);
          onCancel();
        })
      }
      validationSchema={userFormValidation}
      initialValues={{
        id: id || "",
        email: email || "",
        first_name: first_name || "",
        last_name: last_name || "",
        other_name: other_name || "",
        phone_number: phone_number || "",
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <Box>
            <Flex
              my={4}
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <AvatarDiv
                mb={3}
                width="129px"
                alignItems="center"
                justifyContent="center"
                backgroundImage={image.preview}
              >
                {!image && !image.preview && <Icon name="team" size={30} />}
              </AvatarDiv>

              <FileUploader accept="image/*" onUpload={onPhotoDrop}>
                {() => (
                  <Button width="220px" kind="green">
                    Change photo
                  </Button>
                )}
              </FileUploader>
            </Flex>
          </Box>
          <div className="row">
            <div className="col-md-6">
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
            <div className="col-md-6">
              <Input
                mb="20px"
                id="other_name"
                name="other_name"
                type="text"
                label="Middle name"
                touched={touched.other_name}
                value={values.other_name}
                onChange={handleChange}
                errorMessage={errors.other_name}
                isInvalid={errors.other_name && touched.other_name}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Input
                mb="20px"
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
            <div className="col-md-6">
              <Input
                mb="20px"
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
          </div>
          <div className="row">
            <div className="col-md-12">
              <Input
                mb="20px"
                id="email"
                name="email"
                type="email"
                label="Email address"
                touched={touched.email}
                value={values.email}
                onChange={handleChange}
                errorMessage={errors.email}
                isInvalid={errors.email && touched.email}
              />
            </div>
          </div>

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
};

UserForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default UserForm;
