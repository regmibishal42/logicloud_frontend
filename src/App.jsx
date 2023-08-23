import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { themeSettings } from "./themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/Signup";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

// React Query
import { getToken } from './utils/token';
import Products from "./pages/Dashboard/Products/Products";
import AddProducts from "./pages/Dashboard/Products/AddProducts";
import Sales from "./pages/Dashboard/Sales/Sales";
import Staffs from "./pages/Dashboard/Staffs/Staffs";
import ViewProduct from "./pages/Dashboard/Products/ViewProduct";
import Category from "./pages/Dashboard/Products/Category";
import UpdateProducts from "./pages/Dashboard/Products/UpdateProducts";
import CreateSale from "./pages/Dashboard/Sales/CreateSale";
import AddStaff from "./pages/Dashboard/Staffs/AddStaff";
import UpdateStaff from "./pages/Dashboard/Staffs/UpdateStaff";
import Overview from "./pages/Dashboard/Overview/Overview";
import Daily from "./pages/Dashboard/Daily/Daily";
import Monthly from "./pages/Dashboard/Monthly/Monthly";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = getToken();

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />}/>
              <Route path="/add-products" element={<AddProducts />}/>
              <Route path="/product/:productID" element={<ViewProduct />}/>
              <Route path="/product/update/:productID" element={<UpdateProducts />} />
              <Route path="/category" element={<Category />} />

              <Route path="/sales" element={<Sales />} />
              <Route path="create-sale/:productID" element={<CreateSale />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />

              <Route path="/staffs" element={<Staffs />} />
              <Route path="add-staff" element={<AddStaff />} />
              <Route path="/staffs/update/:staffID" element={<UpdateStaff />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPassword />}/>
            <Route path="/reset-password" element={<ResetPassword />} />
      
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
