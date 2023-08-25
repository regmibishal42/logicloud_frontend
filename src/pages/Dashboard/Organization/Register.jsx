import React, { useState } from 'react';
import { Box, FormControl, Select, Button, Stack, MenuItem, TextField, InputLabel, Divider } from "@mui/material";
import Header from '../../../components/Header';
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';
import { useGQLMutation } from '../../../useRequest';
import { CREATE_ORGANIZATION } from "../../../Query/Organization/Organization.mutation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [initialData, setInitialData] = useState({
        Name: "",
        email: "",
        contact: "",
        Address: {
            City: "",
            District: "",
            State: "",
        },
        PanNumber: ""
    });
    const token = getToken();
    const header = GetHeader(token);
    const { data, isLoading, mutate } = useGQLMutation(CREATE_ORGANIZATION,header);
    if(data){
        if(data?.organization?.createOrganization?.error){
            console.log("Register Organization Query Error",data?.organization?.createOrganization?.error)
            toast.error(data?.organization?.createOrganization?.error.message)
        }
        if(data?.organization?.createOrganization?.data){
            toast("Registered Successfully")
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Submitted Data",initialData)
        mutate(initialData)
    }

    return <>
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
            <Header title="Register Your Organization" subtitle="Register your organization from here" />
            <Divider sx={{ borderColor: 'grey' }} />
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
                        label="Organization Name"
                        type='text'
                        name="Name"
                        value={initialData.Name}
                        onChange={(e) => setInitialData({ ...initialData, Name: e.target.value })}
                        required
                        sx={{ width: "70%" }}
                    />
                    <TextField
                        label="Organization Email"
                        type='email'
                        name="email"
                        value={initialData.email}
                        onChange={(e) => setInitialData({ ...initialData, email: e.target.value })}
                        required
                        sx={{ width: "70%" }}
                    />
                    <TextField
                        label="Organization Contact"
                        name="contact"
                        value={initialData.contact}
                        onChange={(e) => setInitialData({ ...initialData, contact: e.target.value })}
                        required
                        sx={{ width: "70%" }}
                    />

                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="City"
                                name="City"
                                value={initialData.Address.City}
                                onChange={(e) => setInitialData({...initialData,Address:{...initialData.Address,City:e.target.value}})}
                                required
                                sx={{ width: "50%" }}
                            />
                            <TextField
                                label="District"
                                name="District"
                                value={initialData.Address.District}
                                onChange={(e) => setInitialData({...initialData,Address:{...initialData.Address,District:e.target.value}})}
                                required
                                sx={{ width: "50%" }}
                            />
                            <FormControl sx={{ minWidth: "35%" }}>
                                <InputLabel>State</InputLabel>
                                <Select
                                    name="state"
                                    value={initialData.Address.State}
                                    onChange={(e) => setInitialData({...initialData,Address:{...initialData.Address,State:e.target.value}})}
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
                        label="PAN NO."
                        type='number'
                        name="PanNumber"
                        value={initialData.PanNumber}
                        onChange={(e) => setInitialData({ ...initialData, PanNumber: e.target.value })}
                        required
                        sx={{ width: "70%" }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px",maxWidth:"70%" }}>
                        Register Organization
                    </Button>
                </FormControl>
            </Box>
        </Box>
    </>
}

export default Register
