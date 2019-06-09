import React from "react";
import styled from "styled-components";

const ProgressbarContainer = styled.div`
  width: 100%;
  height: ${props => `${props.height}px`};
  background-color: ${props => props.bgColor};
  border-radius: 100px;
`;

const ProgressIndicator = styled.div`
  position: absolute;
  border-radius: 100px;
  width: ${props => `${props.width}%`};
  height: ${props => `${props.height}px`};
  background-color: ${props => props.bgColor};
`;

export default function Progressbar({
  width,
  height,
  bgColor,
  containerBgColor,
}) {
  return (
    <ProgressbarContainer height={height} bgColor={containerBgColor}>
      <ProgressIndicator width={width} height={height} bgColor={bgColor} />
    </ProgressbarContainer>
  );
}

Progressbar.defaultProps = {
  height: 10,
  bgColor: "#22bdff",
  containerBgColor: "#f4f4f4"
};
