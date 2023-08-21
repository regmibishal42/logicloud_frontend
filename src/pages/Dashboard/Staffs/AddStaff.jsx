import React, { useState } from 'react';
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { TextField, Button, MenuItem, FormControl, InputLabel, Box, Stack, Divider,Select } from '@mui/material';

import Header from '../../../components/Header';
import { useGQLMutation } from '../../../useRequest';
import { getToken } from '../../../utils/token';
import { ServerDateFormatter } from '../../../utils/utils.functions';
import { } from '../../../Query/Staffs/staff.query';

import { CreateStaffValidator } from '../../../utils/validation/satffValidator';

const AddStaff = () => {
    const token = getToken();
    const header = GetHeader(token);
    const [staffData, setStaffData] = useState({
        contactNumber: "",
        email: "",
        firstName: "",
        lastName: "",
        post: "",
        joinedOn: "",
        isAuthorized: false,
        salary: 0,
        address: {
            City: "",
            District: "",
            State: "",
        }
    });

    const handleInputChange = (field, value) => {
        // Handle nested fields (address) by splitting the field path
        if (field.includes(".")) {
            const [outerField, innerField] = field.split(".");
            setStaffData(prevData => ({
                ...prevData,
                [outerField]: {
                    ...prevData[outerField],
                    [innerField]: value,
                },
            }));
        } else {
            setStaffData(prevData => ({
                ...prevData,
                [field]: value,
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let validationError = CreateStaffValidator(staffData);
        if (validationError) {
            toast.error(validationError)
            return
        }
        // Handle form submission here, e.g., send data to a server
        const formattedDate = ServerDateFormatter(staffData.joinedOn)
        staffData.joinedOn = formattedDate
        console.log("Submitted Data", staffData)
    };

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
            <Header title="Add Staff" subtitle="add new staff from here" />
            <Divider sx={{ borderColor: 'grey' }} />
            <Box height="80vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%">
                {/* Add Staff Form */}
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
                                value={staffData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                required
                                sx={{ width: "50%" }}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={staffData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                required
                                sx={{ width: "50%" }}
                            />
                        </Stack>
                    </Stack>
                    <TextField
                        label="Contact Number"
                        type="phone"
                        name="contactNumber"
                        value={staffData.contactNumber}
                        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                        required
                    />
                    <TextField
                        label="email"
                        type="email"
                        name="email"
                        value={staffData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                    />
                    <TextField
                        label="Post"
                        type="text"
                        name="post"
                        value={staffData.post}
                        onChange={(e) => handleInputChange("post", e.target.value)}
                        required
                    />
                    <TextField
                        label="Salary"
                        type="number"
                        name="salary"
                        value={staffData.post}
                        onChange={(e) => handleInputChange("salary", e.target.value)}
                        required
                    />
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="City"
                                name="City"
                                value={staffData.address.City}
                                onChange={(e) => handleInputChange("address.City", e.target.value)}
                                required
                                sx={{ width: "50%" }}
                            />
                            <TextField
                                label="District"
                                name="District"
                                value={staffData.address.District}
                                onChange={(e) => handleInputChange("address.District", e.target.value)}
                                required
                                sx={{ width: "50%" }}
                            />
                            <FormControl sx={{ minWidth: "35%" }}>
                                <InputLabel>State</InputLabel>
                                <Select
                                    name="state"
                                    value={staffData.address.State}
                                    onChange={(e) => handleInputChange("address.District", e.target.value)}
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
                        label="Joined On"
                        type="date"
                        name="joinedOn"
                        value={staffData.joinedOn}
                        onChange={(e) => handleInputChange("joinedOn", e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px" }}>
                        Add Staff
                    </Button>
                </FormControl>
            </Box>
        </Box>
    )
}

export default AddStaff
