import React from 'react';
import { useGQLMutation } from '../../../useRequest';
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';
import { Box, Divider, FormControlLabel, Checkbox, Stack, TextField, Button, FormControl, } from '@mui/material';
import Header from '../../../components/Header';
import {UPDATE_PASSWORD } from '../../../Query/Profile/Profile.mutation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';


const UpdatePassword = () => {
  const token = getToken();
  const header = GetHeader(token);
  const [showPassword,setShowPassword] = useState(false)
  const [updatedData, setUpdatedData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  //update the password
  const {data,isLoading,mutate} = useGQLMutation(UPDATE_PASSWORD,header);
  if(data){
    console.log("Data",data)
    if(data?.auth?.updatePassword?.error){
      console.log("Update Password Query Error",data?.auth?.updatePassword?.error.message)
      toast(data?.auth?.updatePassword?.error.message)
    }
    if(data?.auth?.updatePassword?.data){
      console.log("Updated Password Response Data",data?.auth?.updatePassword?.data)
      toast("Password Updated")
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(updatedData.newPassword !== updatedData.confirmNewPassword){
      toast.error("New Passwords didn't matched")
      return 
    }

    mutate({
      oldPassword:updatedData.oldPassword,
      newPassword:updatedData.newPassword
    });
    setUpdatedData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }
  return <Box m="1.5rem 2.5rem">
    <Header title="Update Password" subtitle="Update your Password From Here" />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Divider />
    <Box height="75vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%">
      {/* Add Staff Form */}
      <FormControl component="form" onSubmit={handleSubmit} sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: 'min(800px,40%)',
        margin: '0 0.4rem',

      }}>
        <TextField
          label="Current Password"
          type={showPassword ? "text" :"password"}
          name="CurrentPassword"
          value={updatedData.oldPassword}
          onChange={(e) => setUpdatedData({ ...updatedData, oldPassword: e.target.value })}
          required
          inputProps={{
            minLength: 8, // Minimum character length
            maxLength: 15, // Maximum character length
          }}
          sx={{ width: "70%" }}
        />
        <TextField
          label="New Password"
          type={showPassword ? "text" :"password"}
          name="NewPassword"
          value={updatedData.newPassword}
          onChange={(e) => setUpdatedData({ ...updatedData, newPassword: e.target.value })}
          required
          inputProps={{
            minLength: 8, // Minimum character length
            maxLength: 15, // Maximum character length
          }}
          sx={{ width: "70%" }}
        />
        <TextField
          label="Confirm New Password"
          name="ConfirmNewPassword"
          type={showPassword ? "text" :"password"}
          value={updatedData.confirmNewPassword}
          onChange={(e) => setUpdatedData({ ...updatedData, confirmNewPassword: e.target.value })}
          required
          inputProps={{
            minLength: 8, // Minimum character length
            maxLength: 15, // Maximum character length
          }}
          sx={{ width: "70%" }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" onChange={() => setShowPassword(!showPassword)} />}
          label="Show Password"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px", maxWidth: "70%" }}>
          Update Password
        </Button>

      </FormControl>
    </Box>
  </Box>
}

export default UpdatePassword
