import React, { useState } from 'react';
import { useGQLQuery } from '../../../useRequest';
import { GET_ALL_STAFFS } from '../../../Query/Staffs/staff.query';
import { GetHeader } from "../../../utils/getHeader";
import { getToken } from "../../../utils/token";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../../components/Header';
import { useTheme } from '@emotion/react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { DateFormatter } from '../../../utils/utils.functions';
import NormalDataGridComponent from '../../../components/NormalDataGridComponent';
import { useEffect } from 'react';

const Staffs = () => {
  const theme = useTheme();
  const token = getToken();
  const header = GetHeader(token);
  const [isActive, setIsActive] = useState(true);
  let staffs = [];

  const user = useSelector((state) => state.global.user)
  let isAdmin = false
  if (user) {
    console.log("User Type is", user.userType)
    if (user.userType == "ADMIN") {
      isAdmin = true
    }
  }
  //fetch data
  const { data: staffsData, isLoading: staffsDataLoading, refetch } = useGQLQuery({
    key: "all_staffs",
    query: GET_ALL_STAFFS,
    headers: header,
    variables: {
      input: {
        isActive: isActive
      }
    }
  });
  if (staffsData) {
    if (staffsData?.staff?.getStaffByOrganization?.error) {
      console.log("React Query Error in Staffs", staffsData?.staff?.getStaffByOrganization?.error)
      toast.error(staffsData?.staff?.getStaffByOrganization?.error)
    }
    if (staffsData?.staff?.getStaffByOrganization?.data) {
      console.log("Staff Data Only", staffsData?.staff?.getStaffByOrganization?.data)
      staffs = staffsData?.staff?.getStaffByOrganization?.data
    }
    console.log(staffsData)
  }

  const columns = [
    {
      field: "staffID",
      headerName: "StaffID",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: params => params.row.staff.email
    },
    {
      field: "firstName",
      headerName: "FirstName",
      flex: 0.6,
      valueGetter: params => params.row.staff.profile.firstName
    },
    {
      field: "lastName",
      headerName: "LastName",
      flex: 1,
      valueGetter: params => params.row.staff.profile.lastName
    },
    {
      field: "joinedOn",
      headerName: "JoinedOn",
      flex: 1,
      valueGetter: params => DateFormatter(params.row.joinedOn)
    },
    {
      field: "post",
      headerName: "Post",
      flex: 0.6,
      valueGetter: params => params.row.post
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.6,
      valueGetter: params => params.row.salary ? params.row.salary : "N/A"
    },
    {
      field: "isAuthorized",
      headerName: "DashboardAuthorized",
      flex: 0.7,
      valueGetter: params => params.row.isAuthorized
    },



  ];
  useEffect(() => {
    console.log("Refetching Staffs")
    refetch();
  }, [refetch, isActive])

  return (
    <Box>
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
      {!isAdmin ? (<Header title="not authorized" subtitle="sorry only admin is authorized in this section" />) : (
        <Box>
          <Header title="Staffs" subtitle="The entire list of staffs in you organization" />
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={() => setIsActive(!isActive)} />}
              label="Active Users Only"
            />

            <DataGrid
              columns={columns}
              rows={(staffs) || []}
              getRowId={(row) => row.staffID}
              loading={staffsDataLoading || !staffsData}
              components={{ Toolbar: NormalDataGridComponent }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Staffs
