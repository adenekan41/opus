import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'rebass';
import { sharedProps } from '../Avatar';

const TextAreaContainer = styled.div`
  width: 100%;
  position: relative;
  .textarea {
    position: relative;
    box-sizing: border-box;
    border-radius: 3px;
    width: 100%;
    padding: 16px;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    border: solid 0.5px rgba(18, 18, 18, 0.11);
    background-color: #ffffff;
    ${props =>
      props.isInvalid ? 'border: solid 0.5px #f66262!important' : ''};
    ${props =>
      props.disabled &&
      `
      border: solid 1px rgba(18, 18, 18, 0.11);
      background-color: #f5f4f4;
      cursor: not-allowed;`};

    &:focus {
      outline: none;
      border: solid 0.5px rgba(255, 153, 1, 0.8);
    }
  }

  .label {
    position: absolute;
    z-index: 2;
    top: 10px;
    padding: 8px 0 8px 16px;
    transition: all 200ms;
    opacity: 0.5;
    display: inline-block;
    color: #8c8c8c;
  }

  .error {
    position: absolute;
    top: 44px;
    padding: 0 16px;
  }

  ${sharedProps};
`;

class TextArea extends React.Component {
  render() {
    const {
      id,
      label,
      htmlFor,
      iconSize,
      isInvalid,
      errorMessage,
      value = '',
      mb,
      mt,
      ...rest
    } = this.props;
    return (
      <TextAreaContainer
        isInvalid={isInvalid}
        disabled={rest.disabled}
        mb={mb}
        mt={mt}
      >
        <Flex width="100%">
          <Flex width="100%" flexDirection="column">
            <label htmlFor={id} className="label">
              {label}
            </label>
            <textarea {...rest} value={value} id={id} className="textarea" />
          </Flex>
        </Flex>
        {isInvalid && (
          <Text color="#f66262" fontSize="12px" className="error">
            {errorMessage}
          </Text>
        )}
      </TextAreaContainer>
    );
  }
}

TextArea.defaultProps = {
  id: 'textarea',
  errorMessage: 'This field is required',
};

export default TextArea;
