import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Header from '../../../components/Header';
import { Box, useTheme,FormControl,InputLabel,Select,MenuItem, Stack } from "@mui/material";
import { useGQLQuery } from '../../../useRequest';
import { SALES_BY_STAFF } from "../../../Query/Sales/sales.stat.query";
import { getToken } from "../../../utils/token";
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid';

const Performance = () => {
    const user = useSelector((state) => state.global.user);
    const [filterType, setFilterType] = useState("YEARLY")
    const token = getToken();
    const header = GetHeader(token);
    const theme = useTheme();
    let formattedData = [];
    //fetch staffs sales data from the server
    const { data, isLoading,refetch } = useGQLQuery({
        key: "sales_by_staff",
        query: SALES_BY_STAFF,
        headers: header,
        variables: {
            input: {
                filterType: filterType
            }
        }
    });
    if (data) {
        if (data?.sales?.getSalesByStaff?.error) {
            console.log("Get Staff Sales Data error", data?.sales?.getSalesByStaff?.error);
            toast.error(data?.sales?.getSalesByStaff?.error.message)
        }
        if (data?.sales?.getSalesByStaff?.data) {
            formattedData = data?.sales?.getSalesByStaff?.data;
        }
    }

    const columns = [
        {
            field: "staffName",
            headerName: "StaffName",
            flex: 1,
        },
        {
            field: "totalSales",
            headerName: "totalSales",
            flex: 1,
        },
        {
            field: "totalUnits",
            headerName: "totalUnits",
            flex: 0.6,
        },
    ];
    useEffect(()=>{
        console.log("Refetching Data")
        refetch();
    },[filterType])
    return <Box m="1.5rem 2.5rem">
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

        {user && user.userType === "ADMIN" ? (<Box>
            <Stack direction="row" gap={5}>
            <Header title="Staff Performance" subtitle="List of staff sales" />
            <FormControl sx={{ minWidth: "30%",mt:"0.5rem"}}>
                    <InputLabel>Data Filter Type</InputLabel>
                    <Select
                        name="filterType"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        required
                        sx={{ width: '50%', mt: "5px" }} // Adjust the width as needed
                    >
                        <MenuItem value={"YEARLY"}>YEARLY</MenuItem>
                        <MenuItem value={"MONTHLY"}>MONTHLY</MenuItem>
                        <MenuItem value={"WEEKLY"}>WEEKLY</MenuItem>
                        <MenuItem value={"DAILY"}>DAILY</MenuItem>

                    </Select>
                </FormControl>
            </Stack>
            <Box height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}>

                <DataGrid
                    columns={columns}
                    rows={(formattedData) || []}
                    getRowId={(row) => row.staffName}
                    loading={isLoading || !formattedData}
                // components={{ Toolbar: NormalDataGridComponent }}
                />
            </Box>
        </Box>) : (<Box>
            <Header title="not authorized" subtitle="you are not authorized to access this information" />
        </Box>)}
    </Box>
}

export default Performance
