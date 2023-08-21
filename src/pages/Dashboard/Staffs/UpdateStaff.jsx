import React, { useState } from 'react';
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Stack, Divider, FormControlLabel,Checkbox } from '@mui/material';

import Header from '../../../components/Header';
import { useGQLQuery, useGQLMutation } from '../../../useRequest';
import { GET_STAFF_BY_ID } from '../../../Query/Staffs/staff.query';
import { getToken } from '../../../utils/token';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_STAFF } from '../../../Query/Staffs/satff.mutation';


const UpdateStaff = () => {
    const { staffID } = useParams();
    const token = getToken();
    const header = GetHeader(token);
    let staff = {};

    const [updatedStaff, setUpdatedStaff] = useState({})
    //fetch staff data from server
    const { data: staffData, isLoading: isStaffDataLoading } = useGQLQuery({
        key: "staff",
        query: GET_STAFF_BY_ID,
        headers: header,
        variables: {
            input: {
                staffID: staffID
            }
        }
    });
    if (staffData) {
        if (staffData?.staff?.getStaffByID?.error) {
            console.log("Get Staff By ID Query Error", staffData?.staff?.getStaffByID?.error);
            toast.error(staffData?.staff?.getStaffByID?.error.message);
        }
        if (staffData?.staff?.getStaffByID?.data) {
            staff = staffData?.staff?.getStaffByID?.data
            console.log("Staff From Query", staff);

        }
    }
    //update the staff
    const {data:updatedStaffData,isLoading:updateStaffLoading,mutate} = useGQLMutation(UPDATE_STAFF,header)
    if(updatedStaffData){
        if(updatedStaffData?.staff?.updateStaff?.error){
            toast(updatedStaffData?.staff?.updateStaff?.error?.message)
            console.log("Update Staff Query Error",updatedStaffData?.staff?.updateStaff?.error?.message)
        }
        if(updatedStaffData?.staff?.updateStaff?.data){
           toast("Staff Updated")
        }
    }


    //mutation for update staff
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!updatedStaff.post && !updatedStaff.salary && !updatedStaff.isActive && !updatedStaff.isAuthorized) {
            toast.error("nothing to update");
            return;
        }
        if (updatedStaff.salary && updatedStaff.salary < 1) {
            toast.error("invalid salary");
            return;
        }
        updatedStaff.staffID = staffID;
        console.log("Submit Handler clicked", updatedStaff)
        mutate(updatedStaff);
    }
    return (
        <Box m="1.5rem 2.5rem">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Header title="Update Staff Details" subtitle="update staff from here" />
            <Divider sx={{ borderColor: 'grey' }} />
            {isStaffDataLoading && !staffData ? (<>Loading...</>) : (
                <Box height="80vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%">
                    {/* Add Products Form */}
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
                                    label="FirstName"
                                    name="firstName"
                                    value={staff?.staff?.profile?.firstName}
                                    disabled
                                    sx={{ width: "50%" }}
                                />
                                <TextField
                                    label="LastName"
                                    name="lastName"
                                    value={staff?.staff?.profile?.lastName}
                                    disabled
                                    sx={{ width: "50%" }}
                                />
                            </Stack>
                        </Stack>

                        <TextField
                            label="Post"
                            type="text"
                            name="post"
                            value={updatedStaff.post || staff.post}
                            onChange={(e) => setUpdatedStaff({ ...updatedStaff, post: e.target.value })}
                            required
                        />
                        <TextField
                            label="Salary"
                            type="number"
                            name="salary"
                            value={updatedStaff.salary || staff.salary}
                            onChange={(e) => setUpdatedStaff({ ...updatedStaff, salary: e.target.value })}
                            required
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" onChange={(e) => {setUpdatedStaff({...updatedStaff,isAuthorized:!staff.isAuthorized});;staff.isAuthorized=!staff.isAuthorized  }} />}
                            label="Allow Dashboard Access?"
                            checked={staff.isAuthorized}
                        />
                        <FormControlLabel
                            control={<Checkbox value={staff.isActive} color="primary" onChange={(e) => {setUpdatedStaff({...updatedStaff,isActive:!staff.isActive});staff.isActive=!staff.isActive }} />}
                            label="Active Staff?"
                            //defaultChecked={staff.isActive}
                            checked={staff.isActive}
                        />

                        <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px" }}>
                            Update Product
                        </Button>
                    </FormControl>
                </Box>
            )}
        </Box>)
}

export default UpdateStaff
