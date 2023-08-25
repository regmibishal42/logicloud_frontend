import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGQLMutation } from '../../../useRequest';
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';
import { Box, Divider, LinearProgress, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from '../../../components/Header';
import { UPDATE_PROFILE } from '../../../Query/Profile/Profile.mutation';
import { DateFormatter, ServerDateFormatter } from '../../../utils/utils.functions';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const user = useSelector((state) => state.global.user)
    const { profile: userProfile } = user
    const [updatedData, setUpdatedData] = useState({});
    const [isUpdated,setIsUpdated]  = useState(false);
    const token = getToken();
    const header = GetHeader(token);

    const { data, isLoading, mutate } = useGQLMutation(UPDATE_PROFILE, header);
    if(data){
        if(data?.profile?.updateProfile?.error){
            console.log("Update Profile Query Error",data?.profile?.updateProfile?.error)
            toast.error(data?.profile?.updateProfile?.error.message)
        }
        if(data?.profile?.updateProfile?.data){
          console.log("Updated Data",data?.profile?.updateProfile?.data)
          toast("Profile Updated")
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(updatedData).length < 1){
            console.log("Nothing To Update")
            return;
        }
        setIsUpdated(true)
        if(updatedData.DateOfBirth){
            updatedData.DateOfBirth = ServerDateFormatter(updatedData.DateOfBirth)
        }
        mutate(updatedData);

    }
    return <Box m="1.5rem 2.4rem">
        <Header title="Profile Information" subtitle="View or update profile information" />
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
        {user && (Object.keys(user).length > 1) ? (<>
            <Box height="75vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%">
                <FormControl component="form" onSubmit={handleSubmit} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    minWidth: 'min(800px,40%)',
                    margin: '0 0.4rem',

                }}>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={updatedData?.firstName || userProfile.firstName}
                                onChange={(e) => setUpdatedData({ ...updatedData, firstName: e.target.value })}
                                required
                                sx={{ width: "50%" }}
                                inputProps={{
                                    minLength: 3, // Minimum character length
                                    maxLength: 10, // Maximum character length
                                }}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={updatedData?.lastName || userProfile.lastName}
                                onChange={(e) => setUpdatedData({ ...updatedData, lastName: e.target.value })}
                                required
                                sx={{ width: "50%" }}
                                inputProps={{
                                    minLength: 3, // Minimum character length
                                    maxLength: 10, // Maximum character length
                                }}
                            />
                        </Stack>
                    </Stack>
                    <TextField
                        label="Contact Number"
                        type="phone"
                        name="contactNumber"
                        value={updatedData?.contactNumber || userProfile.contactNumber}
                        onChange={(e) => setUpdatedData({ ...updatedData, contactNumber: e.target.value })}
                        inputProps={{
                            minLength: 10, // Minimum character length
                            maxLength: 10, // Maximum character length
                        }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={user.email}
                        disabled
                    />
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="City"
                                name="City"
                                inputProps={{
                                    minLength: 3, // Minimum character length
                                    maxLength: 15, // Maximum character length
                                }}
                                value={updatedData?.Address?.City || userProfile?.Address?.City || ""}
                                onChange={(e) => setUpdatedData({ ...updatedData, Address: { ...updatedData.Address, City: e.target.value } })}
                                required
                                sx={{ wilastNamedth: "50%" }}
                            />
                            <TextField
                                label="District"
                                name="District"
                                inputProps={{
                                    minLength: 3, // Minimum character length
                                    maxLength: 15, // Maximum character length
                                }}
                                value={updatedData?.Address?.District || userProfile?.Address?.District || ""}
                                onChange={(e) => setUpdatedData({ ...updatedData, Address: { ...updatedData.Address, District: e.target.value } })}
                                required
                                sx={{ width: "50%" }}
                            />
                            <FormControl sx={{ minWidth: "35%" }}>
                                <InputLabel>State</InputLabel>
                                <Select
                                    name="state"
                                    value={updatedData?.Address?.State || userProfile?.Address?.State || ""}
                                    onChange={(e) => setUpdatedData({ ...updatedData, Address: { ...updatedData.Address, State: e.target.value } })}
                                    required
                                    sx={{ width: '100%' }} // Adjust the width as needed
                                >
                                    <MenuItem value="Koshi">Koshi</MenuItem>
                                    <MenuItem value="Madhesh">Madhesh</MenuItem>
                                    <MenuItem value="Bagmati">Bagmati</MenuItem>
                                    <MenuItem value="Gandaki">Gandaki</MenuItem>
                                    <MenuItem value="Lumbani">Lumbani</MenuItem>
                                    <MenuItem value="Karnali">Karnali</MenuItem>
                                    <MenuItem value="Sudur Pachim">Sudur Pachim</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <TextField
                        label="Date Of Birth"
                        type="date"
                        name="DateOfBirth"
                        value={updatedData?.DateOfBirth || DateFormatter(userProfile.DateOfBirth)}
                        onChange={(e) => setUpdatedData({ ...updatedData, DateOfBirth: e.target.value })}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px" }} >
                        Update Staff
                    </Button>

                </FormControl>


            </Box>
        </>) : <><LinearProgress color="inherit" title='Loading' /></>}
    </Box>
}

export default Profile
