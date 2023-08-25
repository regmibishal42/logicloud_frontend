import React, { useState } from 'react';
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { TextField, Button, MenuItem, FormControl, InputLabel, Box, Stack, Divider, Select,Checkbox ,FormControlLabel} from '@mui/material';

import Header from '../../../components/Header';
import { useGQLMutation } from '../../../useRequest';
import { getToken } from '../../../utils/token';
import { ServerDateFormatter } from '../../../utils/utils.functions';
import { CREATE_STAFF } from '../../../Query/Staffs/satff.mutation';

import { CreateStaffValidator } from '../../../utils/validation/satffValidator';

const AddStaff = () => {
    const token = getToken();
    const header = GetHeader(token);
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [staffData, setStaffData] = useState({
        contactNumber: "",
        email: "",
        firstName: "",
        lastName: "",
        post: "",
        joinedOn: "",
        isAuthorized: isAuthorized,
        salary: 0,
        address: {
            City: "",
            District: "",
            State: "",
        }
    });
    //create staff mutation
    const { data: staffMutateData, isLoading: staffDataLoading, mutate } = useGQLMutation(CREATE_STAFF, header);
    if (staffMutateData) {
        if (staffMutateData?.staff?.createStaff?.error) {
            console.log("Create Staff Query Error", staffMutateData?.staff?.createStaff?.error.message)
            toast.error(staffMutateData?.staff?.createStaff?.error.message)
        }
        if (staffMutateData?.staff?.createStaff?.data) {
            console.log("Staff Created with", staffMutateData?.staff?.createStaff?.data)
            toast("staff created")
        }
    }

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
        mutate(staffData)
        setStaffData({
            contactNumber: "",
            email: "",
            firstName: "",
            lastName: "",
            post: "",
            joinedOn: "",
            isAuthorized: isAuthorized,
            salary: 0,
            address: {
                City: "",
                District: "",
                State: "",
            }
        })
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
            <Box height="75vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%">
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
                                inputProps={{
                                    minLength: 3, // Minimum character length
                                    maxLength: 10, // Maximum character length
                                  }}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={staffData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                        value={staffData.contactNumber}
                        inputProps={{
                            minLength: 10, // Minimum character length
                            maxLength: 10, // Maximum character length
                          }}
                        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                        required
                    />
                    <TextField
                        label="email"
                        type="email"
                        name="email"
                        inputProps={{
                            minLength: 5, // Minimum character length
                            maxLength: 25, // Maximum character length
                          }}
                        value={staffData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                    />
                    <TextField
                        label="Post"
                        type="text"
                        name="post"
                        inputProps={{
                            minLength: 3, // Minimum character length
                            maxLength: 15, // Maximum character length
                          }}
                        value={staffData.post}
                        onChange={(e) => handleInputChange("post", e.target.value)}
                        required
                    />
                    <TextField
                        label="Salary"
                        type="number"
                        name="salary"
                        value={staffData.salary}
                        onChange={(e) => handleInputChange("salary", e.target.value)}
                        required
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
                                value={staffData.address.City}
                                onChange={(e) => handleInputChange("address.City", e.target.value)}
                                required
                                sx={{ width: "50%" }}
                            />
                            <TextField
                                label="District"
                                name="District"
                                inputProps={{
                                    minLength: 3, // Minimum character length
                                    maxLength: 15, // Maximum character length
                                  }}
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
                                    onChange={(e) => handleInputChange("address.State", e.target.value)}
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
                    <FormControlLabel
                        control={<Checkbox value={isAuthorized} color="primary" onChange={(e) => {setIsAuthorized(!isAuthorized);handleInputChange("isAuthorized",isAuthorized)}} />}
                        label="Allow Dashboard Access?"
                        defaultChecked={false}
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
