export default function themePalette(props) {
    return {
      palette: {
        mode: props.mode,
        primary: {
          main: "#FF0000",
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          main: "#E75828",
          contrastText: "#ffcc00",
        },
        warning: {
          main: "#EAB82A",
        },
        success: {
          daisy: "#24DC76",
        },
      },
    };
  }
  