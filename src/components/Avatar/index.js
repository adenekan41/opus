import React from "react";
import styled, { css } from "styled-components";

export const sharedProps = css`
  margin: ${props => props.m};
  margin-top: ${props => props.mt};
  margin-right: ${props => props.mr};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};

  ${props =>
    props.mx &&
    css`
      margin-left: ${props => props.mx};
      margin-right: ${props => props.mx};
    `};

  ${props =>
    props.my &&
    css`
      margin-top: ${props => props.my};
      margin-bottom: ${props => props.my};
    `};

  padding: ${props => props.p};
  padding-top: ${props => props.pt};
  padding-right: ${props => props.pr};
  padding-bottom: ${props => props.pb};
  padding-left: ${props => props.pl};

  ${props =>
    props.px &&
    css`
      padding-left: ${props => props.px};
      padding-right: ${props => props.px};
    `};

  ${props =>
    props.py &&
    css`
      padding-top: ${props => props.py};
      padding-bottom: ${props => props.py};
    `};

  background-color: ${props => props.bgColor};
  background-image: ${props => props.bgImage};
  background: ${props => props.bg};

  min-height: ${props => props.minHeight};
  max-height: ${props => props.maxHeight};
  height: ${props => props.height};
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};

  position: ${props => props.position};
  box-shadow: ${props => props.boxShadow};
  border-radius: ${props => props.borderRadius};
  opacity: ${props => props.opacity};
  flex: ${props => props.flex};

  @media screen and (max-width: ${props => props.hideAt}) {
    display: none;
  }

  ${props => props.css};
`;

const StyledAvatar = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  line-height: ${props => props.size};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 500;
  background-color: ${props => props.bgColor};
  background-position: center;
  ${props =>
    props.photo_url ? `background-image: url(${props.photo_url})` : ``};
  background-repeat: no-repeat;
  background-size: 110%;
  border-radius: ${props => (props.isRound ? "50%" : "4px")};
  color: ${props => props.color || `white`};
  font-size: ${props => props.fontSize || "14px"};

  ${sharedProps}
`;

const Avatar = ({
  initial = "A",
  photo_url,
  isRound,
  bgColor = "#495566",
  className,
  color,
  size = "32px",
  ...rest
}) => {
  return (
    <StyledAvatar
      {...{
        bgColor,
        photo_url,
        size,
        className: `Avatar ${className}`,
        isRound,
        color,
        ...rest,
      }}
    >
      {!photo_url && initial}
    </StyledAvatar>
  );
};

// Avatar.defaultProps = {
//   photo_url: clientPhoto,
// };

export default Avatar;
