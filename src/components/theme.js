import React from "react";
import { ThemeProvider } from "styled-components";
const theme = {
  space: [
    0,
    4,
    8,
    12,
    16,
    24,
    32,
    48,
    64,
    96,
    128,
    192,
    256,
    384,
    512,
    640,
    768
  ],
  colors: {
    gray: {
      primary: "#273444",
      light: "#495566",
      faint: "#7B8899",
      ui_01: "#CFD3D9",
      ui_02: "#EBECF0",
      ui_03: "#F4F5F7",
      ui_04: "#FAFAFA"
    },
    cyan: {
      dark: "#00A5C5",
      primary: "#00B5D8",
      light: "#2EC2DF",
      faint: "#8DDDED",
      ui_01: "#CCEBF3",
      ui_02: "#E7F8FB",
      ui_03: "#F0F9FB"
    },
    red: {
      dark: "#E85257",
      primary: "#FF5A5F",
      light: "#FF787C",
      faint: "#FF9699",
      ui_01: "#ffcccc",
      ui_02: "#FFEBE6"
    },
    orange: {
      dark: "#F7B422",
      primary: "#FFC145",
      light: "#FFD788",
      faint: "#FFE3A0",
      ui_01: "#FFF0B3",
      ui_02: "#FFFAE6"
    },
    green: {
      dark: "#32A373",
      primary: "#36B37E",
      light: "#5AC095",
      faint: "#79F2C0",
      ui_01: "#ABF5D1",
      ui_02: "#E3FCEF"
    },
    blue: {
      darker: "#0747A6",
      dark: "#0052CC",
      primary: "#0065FF",
      light: "#87C5FF",
      lighter: "#DEEBFF"
    },
    purple: {
      darker: "#403294",
      dark: "#5243AA",
      primary: "#6554C0",
      light: "#C0B6F2",
      lighter: "#EAE6FF"
    },
    white: "#FFFFFF"
  },
  font: {
    heading: {
      hero: {
        fontSize: 44,
        lineHeight: 1.3,
        "@media (max-width: 743px)": {
          fontSize: 36
        }
      },
      big: {
        fontSize: 36,
        lineHeight: 1.3,
        "@media (max-width: 743px)": {
          fontSize: 30
        }
      },
      medium: {
        fontSize: 30,
        lineHeight: 1.3,
        "@media (max-width: 743px)": {
          fontSize: 25
        }
      },
      regular: {
        fontSize: 25,
        lineHeight: 1.3
      },
      small: {
        fontSize: 21,
        lineHeight: 1.3
      }
    },
    text: {
      bigger: {
        fontSize: 20,
        lineHeight: 1.6
      },
      big: {
        fontSize: 17,
        lineHeight: 1.6
      },
      regular: {
        fontSize: 15,
        lineHeight: 1.6
      },
      small: {
        fontSize: 13,
        lineHeight: 1.6
      },
      tiny: {
        fontSize: 11,
        lineHeight: 1.6
      }
    },
    formLabel: {
      small: {
        fontSize: 13,
        marginBottom: 4
      },
      regular: {
        fontSize: 15,
        marginBottom: 8
      }
    }
  },
  typography: {
    fontFamily:
      "Graphik, -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
    fontSize: {
      xxxxl: 44,
      xxxl: 36,
      xxl: 30,
      xl: 25,
      l: 21,
      m: 17,
      base: 15,
      s: 13,
      xs: 11
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 600,
      bolder: 800
    },
    lineHeight: {
      shortest: 0.8,
      shorter: 1,
      short: 1.25,
      regular: 1.5,
      tall: 1.6,
      none: "normal"
    },
    letterSpacing: {
      tight: -0.05,
      regular: 0,
      wide: 0.05
    }
  },
  size: {
    icon: {
      core: {
        small: 12,
        regular: 16,
        big: 24,
        bigger: 32
      },
      button: {
        hero: 18,
        big: 16,
        regular: 16,
        small: 12
      }
    },
    input: {
      large: {
        fontSize: 18,
        height: 56,
        iconPadding: 40,
        padding: 16
      },
      big: {
        fontSize: 16,
        height: 48,
        iconPadding: 40,
        padding: 16
      },
      regular: {
        fontSize: 15,
        height: 42,
        iconPadding: 40,
        padding: 16
      },
      small: {
        fontSize: 14,
        height: 34,
        iconPadding: 32,
        padding: 12
      }
    },
    button: {
      hero: {
        height: 56,
        lineHeight: "56px",
        fontSize: 18,
        paddingLeft: 32,
        paddingRight: 32
      },
      big: {
        height: 48,
        lineHeight: "48px",
        fontSize: 16,
        paddingLeft: 32,
        paddingRight: 32
      },
      regular: {
        height: 40,
        lineHeight: "40px",
        fontSize: 15,
        paddingLeft: 24,
        paddingRight: 24
      },
      small: {
        height: 32,
        lineHeight: "32px",
        fontSize: 13,
        paddingLeft: 18,
        paddingRight: 18
      },
      smaller: {
        height: 24,
        lineHeight: "24px",
        fontSize: 13,
        paddingLeft: 12,
        paddingRight: 12
      }
    },
    radio: {
      regular: {
        size: 16,
        dotSize: 8
      },
      big: {
        size: 24,
        dotSize: 12
      }
    },
    selectOption: {
      big: {
        fontSize: 14,
        padding: "12px 16px"
      },
      regular: {
        fontSize: 13,
        padding: "10px 8px"
      },
      small: {
        fontSize: 14,
        padding: "12px 8px"
      }
    },
    modal: {
      full: "100vw",
      bigger: 960,
      big: 800,
      medium: 640,
      regular: 560,
      small: 400,
      smaller: 256
    },
    drawer: {
      full: "100vw",
      extended: "95vw",
      medium: 600,
      regular: 480,
      small: 360,
      smaller: 256
    },
    toggle: {
      regular: {
        width: 38,
        height: 20
      },
      small: {
        width: 26,
        height: 14
      }
    }
  },
  radii: {
    none: "0",
    small: "2px",
    regular: "4px",
    big: "8px",
    bigger: "16px",
    biggest: "24px",
    round: "9999px"
  },
  borders: { none: 0, normal: "1px solid", thick: "2px solid" },
  shadows: {
    base: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
    medium: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
    large: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
    xlarge: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
    xxlarge: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
    none: `none`,
    focusring: `box-shadow: 0 0 0 3px #8DDDED`,
    dropdown:
      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px",
    navbar: "0 1px 4px 0 rgba(99, 114, 130, 0.15)",
    elevation: {
      none: "none",
      regular: "0 2px 4px 0 rgba(0,0,0,0.10)",
      medium: " 0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08);",
      large: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
      larger: "0 4px 16px rgba(0, 0, 0, 0.16)"
    }
  },
  appearance: {
    button: {
      primary: {
        backgroundColor: "#00B5D8",
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#2EC2DF"
        },
        "&:active": {
          backgroundColor: "#00A5C5"
        },
        "&:disabled": {
          backgroundColor: "#8DDDED"
        }
      },
      secondary: {
        backgroundColor: "#FF5A5F",
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#FF787C"
        },
        "&:active": {
          backgroundColor: "#E85257"
        },
        "&:disabled": {
          backgroundColor: "#FF9699"
        },
        "&:focus": {
          boxShadow: "#ffcccc 0px 0px 0px 3px"
        }
      },
      orange: {
        backgroundColor: "#FFE3A0",
        color: "#273444",
        "&:hover": {
          backgroundColor: "#FFF0B3"
        },
        "&:active": {
          backgroundColor: "#FFD788"
        },
        "&:disabled": {
          backgroundColor: "#FFFAE6",
          color: "#7B8899"
        }
      },
      subtleCyan: {
        backgroundColor: "transparent",
        color: "#00A5C5",
        "&:hover": {
          backgroundColor: "#E7F8FB"
        },
        "&:active": {
          backgroundColor: "#CCEBF3"
        },
        "&:disabled": {
          backgroundColor: "#F0F9FB"
        }
      },
      subtleGray: {
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "#EBECF0"
        },
        "&:active": {
          backgroundColor: "#CFD3D9"
        },
        "&:disabled": {
          backgroundColor: "#F4F5F7"
        }
      },
      outline: {
        backgroundColor: "#fff",
        color: "#273444",
        border: "1px solid #EBECF0",
        "&:hover": {
          backgroundColor: "#F4F5F7"
        },
        "&:active": {
          backgroundColor: "#EBECF0"
        },
        "&:disabled": {
          color: "#7B8899"
        },
        "&:focus": {
          boxShadow: "#EBECF0 0px 0px 0px 3px"
        }
      },
      gray: {
        backgroundColor: "#EBECF0",
        color: "#273444",
        "&:hover": {
          backgroundColor: "#F4F5F7"
        },
        "&:active": {
          backgroundColor: "#CFD3D9"
        },
        "&:disabled": {
          backgroundColor: "#F4F5F7",
          color: "#7B8899"
        }
      },
      link: {
        backgroundColor: "transparent",
        color: "#00B5D8",
        padding: 0,
        height: "auto",
        lineHeight: "inherit",
        "&:hover": {
          textDecoration: "underline"
        }
      },
      linkedin: {
        backgroundColor: "#0077b5",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1783BB"
        },
        "&:active": {
          backgroundColor: "#006295"
        },
        "&:disabled": {
          backgroundColor: "#A2CDE4"
        }
      },
      behance: {
        backgroundColor: "#0057ff",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#2E75FF"
        },
        "&:active": {
          backgroundColor: "#003ecb"
        },
        "&:disabled": {
          backgroundColor: "#8BB2FF"
        }
      },
      facebook: {
        backgroundColor: "#3b5998",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#4C68A1"
        },
        "&:active": {
          backgroundColor: "#31497D"
        },
        "&:disabled": {
          backgroundColor: "#B7C2DA"
        }
      },
      messenger: {
        backgroundColor: "#0084FF",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#2E9AFF"
        },
        "&:active": {
          backgroundColor: "#006DD1"
        },
        "&:disabled": {
          backgroundColor: "#A2D2FF"
        }
      },
      github: {
        backgroundColor: "#24292e",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#4B4F54"
        },
        "&:active": {
          backgroundColor: "#1E2226"
        },
        "&:disabled": {
          backgroundColor: "#AFB1B3"
        }
      },
      whatsapp: {
        backgroundColor: "#34af23",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#4cba3c"
        },
        "&:active": {
          backgroundColor: "#30A020"
        },
        "&:disabled": {
          backgroundColor: "#A8D5D0"
        }
      },
      twitter: {
        backgroundColor: "#38A1F3",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#80C3F7"
        },
        "&:active": {
          backgroundColor: "#3393DD"
        },
        "&:disabled": {
          backgroundColor: "#9bcdf3"
        }
      }
    },
    status: {
      success: {
        icon: "check-01",
        light: "#E3FCEF",
        dark: "#36B37E"
      },
      error: {
        icon: "error",
        light: "#FFEBE6",
        dark: "#FF5A5F"
      },
      warning: {
        icon: "warning",
        light: "#FFF0B3",
        dark: "#FFC145"
      },
      active: {
        light: "#E7F8FB",
        dark: "#00B5D8"
      },
      base: {
        light: "#EBECF0",
        dark: "#273444"
      },
      info: {
        icon: "info",
        light: "#DEEBFF",
        dark: "#0065FF"
      },
      new: {
        light: "#f9e0fa",
        dark: "#5243aa"
      }
    },
    input: {
      backgroundColor: "#fff",
      borderColor: "#EBEBEB",
      "&:focus": {
        borderColor: "#008489"
      },
      "&:disabled": {
        borderColor: "#F2F2F2"
      }
    },
    modal: {
      overlay: "rgba(0,0,0,0.5)",
      whiteOverlay: "rgba(255,255,255,0.8)"
    }
  },
  zIndices: {
    hide: -1,
    none: 0,
    selected: 25,
    active: 30,
    navigation: 1000,
    fixed: 1050,
    dropdown: 2000,
    popover: 3000,
    tooltip: 4000,
    modalBackdrop: 8950,
    modal: 9000,
    aboveModal: 10000
  }
};

export const ThemeProviderWrapper = ({ basePath, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        {children}
      </>
    </ThemeProvider>
  );
};

export default theme;
