import React from "react";
import { createGlobalStyle, withTheme } from "styled-components";
import { CSSTransition } from "react-transition-group";
import { Flex, Text, Box } from "rebass";
import { Icon } from "../Icon";
import { CloseButton } from "../Button";

const animations = {
  top: { from: "translateY(-40px)", to: "translateY(0px)" },
  left: { from: "translateY(100%)", to: "translateY(0px)" },
};

const ToastAnimation = createGlobalStyle`
  .Toast-enter, .Toast-appear {
    transform: ${props => animations[props.direction].from};
    opacity: 0,
  }

  .Toast-enter-active, .Toast-appear-active {
    transform: ${props => animations[props.direction].to};
    opacity: 1;
    transition: all ${props =>
      props.timeout + "ms"} cubic-bezier(0.54,1.12,0.38,1.11) 0s;
  }

  .Toast-exit {
      opacity:1;
      transform: ${props => animations[props.direction].to};
      filter: blur(0);
  }

  .Toast-exit-active{
      opacity: 0;
      filter: blur(2px);
      transform: ${props => animations[props.direction].from};
      transition: all ${props =>
        props.timeout + "ms"} cubic-bezier(0.4,1,0.75,0.9) 0s;
  }
`;

const Toast = ({
  hasCloseButton,
  status,
  message,
  timeout = 5000,
  isOpen,
  direction = "top",
  onClose,
  theme,
}) => {
  const [open, setOpen] = React.useState(isOpen);

  var timeoutID;

  const close = () => {
    clearCloseTimer();
    setOpen(false);
    onClose();
  };

  const startCloseTimer = () => {
    if (timeout && isOpen) {
      timeoutID = setTimeout(() => {
        close();
      }, timeout);
    }
  };

  const clearCloseTimer = () => {
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimer();
  };

  const handleMouseLeave = () => {
    startCloseTimer();
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    startCloseTimer();
    return () => clearCloseTimer();
  }, []);

  let { icon, dark: color } = theme.appearance.status[status];

  return (
    <>
      <ToastAnimation timeout={300} direction={direction} />
      <CSSTransition
        appear
        classNames="Toast"
        unmountOnExit
        timeout={300}
        in={open}
        onExited={onClose}
      >
        <Flex
          mt={[0, "24px"]}
          bg={color}
          boxShadow="0 4px 12px rgba(0,0,0,0.15)"
          p="12px 16px"
          maxWidth={["100vw", "640px"]}
          borderRadius={[0, "4px"]}
          zIndex="aboveModal"
          style={{ pointerEvents: "all" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Flex alignItems="center" flex="1">
            <Box mr={2}>
              <Icon name={icon} color="rgba(255,255,255,0.6)" />
            </Box>
            <Text size="small" tag="span" color="#fff">
              {message}
            </Text>
          </Flex>
          {hasCloseButton && (
            <CloseButton
              iconColor="rgba(255,255,255,0.6)"
              onClick={close}
              size="24px"
              iconSize="16px"
            />
          )}
        </Flex>
      </CSSTransition>
    </>
  );
};

export default withTheme(Toast);
