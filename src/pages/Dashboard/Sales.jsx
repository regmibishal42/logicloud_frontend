import React, { useState } from 'react';
import { useGQLQuery } from '../../useRequest';
import { GET_ALL_SALES } from '../../Query/Sales/sales.query';
import { GetHeader } from "../../utils/getHeader";
import { getToken } from "../../utils/token";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';


const Sales = () => {
  const theme = useTheme();
  const token = getToken();
  const header = GetHeader(token);
  const [page, setPage] = useState(1);
 // const [sort,setSort] = useState("");
  let sales = [];
  let pages = {};
  const { data: salesData, isLoading: salesDataLoading } = useGQLQuery({
    key: "sales_data",
    query: GET_ALL_SALES,
    headers: header,
    variables: {
      input: {
        params: {
          filterType: "YEARLY"
        },
        page: {
          limit: 10,
          sort: "ASC",
          page: page,
        }
      }
    }

  })
  if (salesData) {
    console.log("The Sales Data", salesData);
    if (salesData?.sales?.getSalesByFilter?.error) {
      console.log("Sales Data Fetching Error", salesData?.sales?.getSalesByFilter?.error)
      toast.error(salesData?.sales?.getSalesByFilter?.error.message)
    }
    if (salesData?.sales?.getSalesByFilter?.data) {
      sales = salesData?.sales?.getSalesByFilter?.data
      console.log("The Sales Variable has", sales)
    }
    if(salesData?.sales?.getSalesByFilter?.pageInfo){
      pages = salesData?.sales?.getSalesByFilter?.pageInfo
    }
  }
  const columns = [
    {
      field:"id",
      headerName:"ID",
      flex:1,
    },
    {
      field:"product",
      headerName:"productName",
      flex:1,
      valueGetter:params => params.row.product.name
    },
    {
      field:"category",
      headerName:"categoryName",
      flex:1,
      valueGetter:params => params.row.product.category.name
    },
    {
      field:"unitsSold",
      headerName:"unitsSold",
      flex:1,
    },
    {
      field:"soldAt",
      headerName:"sellingPrice",
      flex:1,
    },
    {
      field:"soldBy.email",
      headerName:"SoldBy",
      flex:1,
      valueGetter:params => params.row.soldBy.email
    },
    
    

  ];

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
      <Header title="Sales" subtitle="The entire list of transactions"/>
      <Box height = "80vh"
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
      }}
      >
        <DataGrid 
        loading={salesDataLoading || !salesData}
        getRowId={(row)=>row.id}
        rows={(sales) || []}
        columns={columns}
        rowCount={(pages && pages.totalPages) || 0}
        pagination
        page={page}
        pageSize={10}
        paginationMode='server'
        sortingMode='server'
        onPageChange = {(newPage)=>setPage(newPage)}
       // onPageSizeChnage
        />
      </Box>
    </Box>
  )
}

export default Sales
