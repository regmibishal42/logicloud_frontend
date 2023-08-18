import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Stack


} from "@mui/material";
import Header from '../../components/Header';
import { useGQLQuery } from '../../useRequest';
import { GET_ALL_PRODUCTS } from "../../Query/products";
import {GET_ALL_CATEGORY} from "../../Query/Category/category.query";
import { getToken } from "../../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { GetHeader } from "../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DateFormatter } from '../../utils/utils.functions';
import { setCategory } from '../../state';
import { DataGrid } from '@mui/x-data-grid';

const Product = ({
  id,
  name,
  boughtOn,
  units,
  sellingPrice,
  categoryName,
})=>{
  const theme = useTheme();
  const formattedDate = DateFormatter(boughtOn)
  return (
    <Card 
    sx={{
      backgroundImage:"none",
      backgroundColor:theme.palette.background.alt,
      borderRadius:"0.55rem "
    }}
    
    >
      <CardContent>
        <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>
          {categoryName}
        </Typography>
        <Typography variant='h5' component="div">
          {name}
        </Typography>
        <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
        रु.{sellingPrice}
        </Typography>
        <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
          Units: {units}
        </Typography>
        <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
          BoughtAt: {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  )
}

const Products = () => {
  const token = getToken();
  const header = GetHeader(token);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [page,setPage] = useState(1);
  let products = [];
  let pages = {}
  const { data:productsData, error:productsError, isLoading:ProductsLoading } = useGQLQuery({
    key: "all_products",
    query: GET_ALL_PRODUCTS,
    headers: header,
    variables: {
      input: {
        params: {},
        page: {
          limit: 10,
          sort: "ASC",
          page: page,
        }
      }
    }

  });
  const {data:categoryData,isLoading:categoryLoading} = useGQLQuery({
    key:"all_categories",
    query:GET_ALL_CATEGORY,
    headers:header
  })
  if (productsError) {
    console.log("React-Query Error Occurred", productsError)
    toast.error(productsError)
  }
  if (productsData) {
    if (productsData?.product?.getProductsByFilter?.error) {
      toast.error(productsData?.product?.getProductsByFilter?.error.message)
    }
    if (productsData?.product?.getProductsByFilter?.data) {
      products = productsData?.product?.getProductsByFilter?.data;
    }
    if (productsData?.product?.getProductsByFilter.pageInfo) {
      pages = productsData?.product?.getProductsByFilter?.pageInfo
    }

  }
  if(categoryData){
    if(categoryData?.product?.category?.getAllCategory?.error){
      toast.error(categoryData?.product?.category?.getAllCategory?.error.message)
    }
    if(categoryData?.product?.category?.getAllCategory?.data){
        dispatch(setCategory(categoryData?.product?.category?.getAllCategory?.data))
    }
  }
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const editClickHandler = (rowClicked)=>{
    //e.preventDefault();
    console.log("Row",rowClicked)
    console.log("Edit Button Clicked")
  }
  const deleteClickHandler = (rowClicked)=>{
    console.log("Row",rowClicked)
    console.log("Delete Button Clicked")
  }
  const columns = [
    {
      field:"id",
      headerName:"ID",
      flex:1,
    },
    {
      field:"name",
      headerName:"productName",
      flex:1,
    },
    {
      field:"category",
      headerName:"categoryName",
      flex:1,
      valueGetter:params => params.row.category.name
    },
    {
      field:"boughtOn",
      headerName:"BoughtOn",
      flex:1,
    },
    {
      field:"units",
      headerName:"AvailableUnits",
      flex:1,
    },
    {
      field:"createdAt",
      headerName:"CreatedAt",
      flex:1,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      
      renderCell: (params) => { 
          return (
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="warning" size="small" onClick={()=>editClickHandler(params.row.id)}>Edit</Button>
              <Button variant="outlined" color="error" size="small" onClick={()=>deleteClickHandler(params.row.id)}>Delete</Button>
            </Stack>
          );
      },
    }
    
    

  ];  return (
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
      <Header title="Products" subtitle="See your products here" />
      {/* {productsData || !ProductsLoading ? (
        <Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{ "& >div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
          {products.map((product)=>(
            <Product 
            key={product.id}
            id={product.id}
            name={product.name}
            units={product.units}
            boughtOn={product.boughtOn}
            categoryID={product.category.id}
            categoryName={product.category.name}
            sellingPrice={product.sellingPrice}
            /> 
          ))

          }
        </Box>
      ) : (<>
        Loading...
      </>)} */}
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
      }}>

              <DataGrid 
        loading={ProductsLoading || !products}
        getRowId={(row)=>row.id}
        rows={(products) || []}
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

export default Products
