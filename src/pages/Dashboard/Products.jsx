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


} from "@mui/material";
import Header from '../../components/Header';
import { useGQLQuery } from '../../useRequest';
import { GET_ALL_PRODUCTS } from "../../Query/products";
import { getToken } from "../../utils/token";
import { useSelector } from "react-redux";
import { GetHeader } from "../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DateFormatter } from '../../utils/utils.functions';

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
  let products = [];
  let pages = {}
  const { data, error, isLoading } = useGQLQuery({
    key: "all_products",
    query: GET_ALL_PRODUCTS,
    headers: header,
    variables: {
      input: {
        params: {},
        page: {}
      }
    }

  });
  if (error) {
    console.log("React-Query Error Occurred", error)
    toast.error(error)
  }
  if (data) {
    if (data?.product?.getProductsByFilter?.error) {
      toast.error(data?.product?.getProductsByFilter?.error.message)
      console.log("React Query Error",error)
    }
    if (data?.product?.getProductsByFilter?.data) {
      products = data?.product?.getProductsByFilter?.data;
      console.log("The Product Unit is",products[0].units)
      console.log("The Products are",products)
    }
    if (data?.product?.getProductsByFilter.pageInfo) {
      pages = data?.product?.getProductsByFilter?.pageInfo
    }

  }
  const isNonMobile = useMediaQuery("(min-width:1000px)");
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
      <Header title="Products" subtitle="See your products here" />
      {data || !isLoading ? (
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
      </>)}
    </Box>
  )
}

export default Products
