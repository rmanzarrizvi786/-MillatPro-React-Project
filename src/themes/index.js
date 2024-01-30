import { createTheme } from "@mui/material/styles";
import themePalette from "./palette";
import themeTypography from "./typography";

export  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF0000'
      },
      success: {
        main: '#4caf50'
      }
    },
    typography: {
      
      h3: {
        fontSize: "24px",
        fontWeight: '400',
        fontSize: '2.2rem',
        color: 'green',
      },
      h4: {
        fontWeight: 400,
        fontSize: '1.75rem',
      },
      h5: {
        fontWeight: 500
      },
      h6: {
        fontWeight: 500
      }
    }
  })