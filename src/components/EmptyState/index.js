import React from 'react';
import styled from 'styled-components';
import { Flex, Image, Heading, Text } from 'rebass';
import Button from '../../components/Button';

const EmptyStateContainer = styled.div`
  border-radius: 5px;
  background-color: #ffffff;
  padding-bottom: 60px;
`;

export default function EmptyState({
  heading,
  helpText,
  buttonText,
  onClick,
  image,
  margin,
}) {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" my={margin}>
      <EmptyStateContainer>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="450px"
          m="0 auto"
        >
          <Image src={image} alt="empty state image" mb="32px" />
          <Heading color="#242424" textAlign="center" mb="8px">
            {heading}
          </Heading>
          <Text color="#8c8c8c" textAlign="center" m="0 auto" width="70%">
            {helpText}
          </Text>
          {buttonText && (
            <Button onClick={onClick} kind="green" size="large">
              {buttonText}
            </Button>
          )}
        </Flex>
      </EmptyStateContainer>
    </Flex>
  );
}
