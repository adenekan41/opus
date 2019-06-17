import React from "react";
import { Heading, Text, Box } from "rebass";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import { DragAndDropUploader } from "../../../../components/FileUpload";

const DragAndDropUploaderStyle = `
padding: 40px;
border: dashed 2px #979797;
`;

export default function UploadContactsButton({
  onSubmit,
  isAdmin,
  progress,
  sampleFile,
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
            onCloseModal={closeModal}
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
