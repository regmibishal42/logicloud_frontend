import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "./themes";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/Signup";
// React Query
import { QueryClient,QueryClientProvider } from "react-query";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const queryClient = new QueryClient();
  return (
   <div>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* <Route element={<Layout />}> */}
            <Route element={<Login />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
             
          </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
   </div>
  )
}

export default App
