import React, { useState,useEffect } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/index";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getToken } from "../../utils/token"
import { useNavigate } from 'react-router-dom';
import { useGQLQuery } from '../../useRequest';
import { GET_USER } from '../../Query/queries';
import { GetHeader } from '../../utils/getHeader';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = getToken()
  if(!token){
    navigate("/login")
  }
  let userData = {}

  const header = GetHeader(token);
  const { data, error, isLoading } = useGQLQuery({
    key: "getUser",
    query: GET_USER,
    headers: header,
    variables: {
      "GetProductsByFilterInput": {}
    }
  })
  if (!isLoading && error) {
    alert("Network Error", error.message)
  }
  if (data) {
    if (data?.auth?.getUserDetails?.error) {
      alert(data?.auth?.getUserDetails?.error.message)
      console.log("Error While Fetching User", data?.auth?.getUserDetails?.error.message)
    }
    if (data?.auth?.getUserDetails?.data) {
      userData = data?.auth?.getUserDetails?.data[0]
      dispatch(setUser(userData))
    }

  }
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
      user={userData}
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />

    <Box flexGrow={1}>
      <Navbar
        user={userData}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet />
    </Box>
  </Box>
}

export default Layout
