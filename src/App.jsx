import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "./themes";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
   <div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      My App
    </ThemeProvider>
   </div>
  )
}

export default App
