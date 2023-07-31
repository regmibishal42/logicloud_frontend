import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "./themes";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Dashboard/Layout";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
   <div>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
      </ThemeProvider>
      </BrowserRouter>
   </div>
  )
}

export default App
