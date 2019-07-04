import React from "react";
import { Heading, Text, Box } from "rebass";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import { DragAndDropUploader } from "../../../../components/FileUpload";
import { AlertComponent } from "../../../../components/AlertComponent";

const DragAndDropUploaderStyle = `
padding: 40px;
border: dashed 2px #979797;
`;

export default function UploadContactsButton({
  error,
  onSubmit,
  isAdmin,
  progress,
  sampleFile,
  closeErrorAlert,
  ...rest
}) {
  return (
    <ToggleModal>
      {(show, openModal, closeModal) => (
        <>
          <Button kind="orange" block onClick={openModal} {...rest}>
            <Icon name="add" color="#ffffff" />
            &nbsp;&nbsp;Upload contacts
          </Button>
          <Modal
            heading=""
            size="medium"
            showModal={show}
            onCloseModal={() => {
              closeModal();
              closeErrorAlert();
            }}
          >
            <Box mt={4} width="400px" mx="auto" my={4}>
              <Heading
                mb={2}
                textAlign="center"
                fontSize="20px"
                fontWeight={400}
              >
                Upload a .CSV or .XLS file
              </Heading>
              <Text color="#8c8c8c" textAlign="center" fontSize="14px">
                Please upload a CSV or excel file. If you have an excel sheet,
                you can also save it as CSV.
              </Text>
            </Box>

            <Box width="450px" mx="auto" my="0">
              {!!error && (
                <Box mb={16}>
                  <AlertComponent type="error" onClose={closeErrorAlert}>
                    <Text mb="8px">Error on row {error.row_number}</Text>
                    <Text mb="8px">{error.message}</Text>
                  </AlertComponent>
                </Box>
              )}
              <DragAndDropUploader
                padding={32}
                display="flex"
                textAlign="center"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
                progress={progress}
                accept=""
                onUpload={onSubmit}
                closeModal={closeModal}
                styles={DragAndDropUploaderStyle}
              >
                {({ isDragActive }) =>
                  isDragActive ? (
                    <Heading paddingBottom={8}>Drop the file here ...</Heading>
                  ) : (
                    <Button kind="orange" block>
                      Choose a file
                    </Button>
                  )
                }
              </DragAndDropUploader>

              <Text fontSize="14px" mt={3}>
                <span>Need some help?</span>{" "}
                <a href={sampleFile} download>
                  Download Sample CSV
                </a>
              </Text>
            </Box>
          </Modal>
        </>
      )}
    </ToggleModal>
  );
}
