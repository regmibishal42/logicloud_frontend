import React from 'react';
import { useGQLQuery } from '../../../useRequest';
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';
import { Box, Divider, LinearProgress, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from '../../../components/Header';
import { GET_USER_ORGANIZATION } from '../../../Query/Organization/Organization.query';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ViewOrganization = () => {
    const token = getToken();
    const header = GetHeader(token);
    let data = {}
    const {data:organizationData,isLoading} = useGQLQuery({
        key:"user_organization",
        query:GET_USER_ORGANIZATION,
        headers:header
    });
    if(organizationData){
        if(organizationData?.organization?.getUserOrganization?.error){
            console.log("User Organization Query Error",organizationData?.organization?.getUserOrganization?.error.message)
            toast.error(organizationData?.organization?.getUserOrganization?.error.message);
        }
        if(organizationData?.organization?.getUserOrganization?.data){
           data = organizationData?.organization?.getUserOrganization?.data
           console.log("Organization Data",data)
        }
    }
  return <>
  <Box m="1.5rem 2.5rem">
  <Header title="Organization Information" subtitle="View organization information" />
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
    {data && Object.keys(data).length > 1 ? (
                <Box height="75vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%">
                {/* Add Staff Form */}
                <FormControl component="form" sx={{
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
                        value={data.Name}
                        disabled
                        sx={{ width: "70%" }}
                    />
                    <TextField
                        label="Organization Email"
                        type='email'
                        name="email"
                        value={data.email}
                        disabled
                        sx={{ width: "70%" }}
                    />
                    <TextField
                        label="Organization Contact"
                        name="contact"
                        value={data.contact}
                        disabled
                        sx={{ width: "70%" }}
                    />

                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="City"
                                name="City"
                                value={data?.Address?.City}
                                disabled
                                sx={{ width: "50%" }}
                            />
                            <TextField
                                label="District"
                                name="District"
                                value={data?.Address?.District}
                                disabled
                                sx={{ width: "50%" }}
                            />
                              <TextField
                                label="State"
                                name="State"
                                value={data?.Address?.State}
                                disabled
                                sx={{ width: "50%" }}
                            />
                            
                        </Stack>
                    </Stack>
                    <TextField
                        label="PAN NO."
                        type='number'
                        name="PanNumber"
                        value={data.PanNumber}
                        disabled
                        sx={{ width: "70%" }}
                    />
                </FormControl>
            </Box>
    ) :(<LinearProgress />)}
            
  </Box>
  </>
}

export default ViewOrganization
