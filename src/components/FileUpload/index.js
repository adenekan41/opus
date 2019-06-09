import React, { useCallback } from "react";
import { Box } from "rebass";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Progressbar from "../Progressbar";

const FileUploaderContainer = styled(Box)`
  ${props => props.styles};
  cursor: pointer;

  .container {
    outline: none;
    &:focus {
      outline: none;
    }
  }
`;

export function FileUploader({ children, onUpload = () => {} }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
    onUpload(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: 'file-uploader' })}>
      <input {...getInputProps()} />
      {children({ isDragActive })}
    </div>
  );
}

export function DragAndDropUploader({
  render,
  children,
  styles,
  accept,
  progress,
  onUpload = () => {},
  ...rest
}) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
    onUpload(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <>
      <FileUploaderContainer styles={styles} {...rest}>
        <div {...getRootProps({ className: "container" })}>
          <input {...getInputProps()} />
          {children({ isDragActive })}
        </div>
        {render && render()}
      </FileUploaderContainer>
      {progress > 0 && <Progressbar width={progress} />}
    </>
  );
}
