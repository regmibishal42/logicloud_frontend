import React,{useState} from 'react';
import { useGQLMutation } from '../../../useRequest';
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';
import { Box, Divider, TextField, Button, FormControl, Stack, } from '@mui/material';
import Header from '../../../components/Header';
import {VERIFY_USER,RESEND_OTP } from '../../../Query/Profile/Profile.mutation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const VerifyAccount = () => {
  const user = useSelector((state) => state.global.user)
  const token = getToken();
  const header = GetHeader(token);
  const [resetButtonDisable,setResetButtonDisable] = useState(false)
  const [otp, setOtp] = useState("");

  //resend otp mutation
  const {data:resendData,mutate:resendMutate} = useGQLMutation(RESEND_OTP,header);
  if(resendData){
    if(resendData?.auth?.otp?.resend?.error){
      console.log("Resend Otp Error",resendData?.auth?.otp?.resend?.error.message)
      toast.error(resendData?.auth?.otp?.resend?.error.message)
    }
    if(resendData?.auth?.otp?.resend?.data){
      toast("Otp Send.Check Email")
    }
  }
  //verify otp mutation
  const {data:verifyData,mutate:verifyAccountMutate} = useGQLMutation(VERIFY_USER,header);
  if(verifyData){
    if(verifyData?.auth?.verifyUser?.error){
      console.log("User Verify Query Error",verifyData?.auth?.verifyUser?.error)
      toast(verifyData?.auth?.verifyUser?.error.message)
    }
    if(verifyData?.auth?.verifyUser?.data){
      console.log("Verify User Data",verifyData?.auth?.verifyUser?.data)
      toast("User Verified")
    }
  }
  const resendOtpHandler = ()=>{
    resendMutate({
      userID:user.id
    });
    setResetButtonDisable(true)  
  }
  //submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyAccountMutate({
      otp:otp,
      userID:user.id
    });
    setOtp("");
    
  }
  return (
    <Box m="1.5rem 2.5rem">
      {user && !user.isVerified ? (<Box>
        <Header title="Verify Account" subtitle="Verify your account from here." />
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
            <Stack direction="row">
              <TextField
                label="OTP"
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                inputProps={{
                  minLength: 6, // Minimum character length
                  maxLength: 6, // Maximum character length
                }}
                sx={{ width: "70%" }}
              />
              <Button onClick={()=>resendOtpHandler()}  variant="contained" color="primary" sx={{marginRight:"4px", maxWidth: "50%" }} disabled={resetButtonDisable}>
                Resend Otp
              </Button>
            </Stack>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px", maxWidth: "70%" }}>
              Verify Otp
            </Button>

          </FormControl>
        </Box>
      </Box>) :
        (<>
          <Header title="Already Verified" subtitle="Your account is already verified" />
        </>)}

    </Box>
  )
}

export default VerifyAccount
