import React, { useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setUser} from "../../state/index";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {getToken} from "../../utils/token"
import { useNavigate } from 'react-router-dom';
import { useGQLQuery } from '../../useRequest';
import { GET_USER } from '../../Query/queries';
import { GetHeader } from '../../utils/getHeader';

const Layout = () => {
  const dispatch = useDispatch();
  const token  = getToken()
  const navigate = useNavigate();
  const userData = {}
  if (token == null) {
      navigate('/login')
  }
  
  const header = GetHeader(token);
  const {data,error,isLoading} = useGQLQuery({
    key:"getUser",
    query:GET_USER,
    headers:header
  })
  if(error){
    alert("Network Error",error.message)
  }
  if (data){
    if(data?.auth?.getUserDetails?.error){
      alert(data?.auth?.getUserDetails?.error.message)
      console.log("Error While Fetching User",data?.auth?.getUserDetails?.error.message)
    }
    if(data?.auth?.getUserDetails?.data){
      userDetails = data?.auth?.getUserDetails?.data[0]
      dispatch(setUser(userDetails))
    }
    
  }
  console.log("Finished Query")
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen,setIsSidebarOpen] = useState(true);
  return <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
    user={userData}
    isNonMobile={isNonMobile}
    drawerWidth="250px"
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
    />

    <Box>
      <Navbar 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet />
    </Box>
  </Box>
}

export default Layout
