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
import {GET_ALL_CATEGORY} from "../../Query/Category/category.query";
import { getToken } from "../../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { GetHeader } from "../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DateFormatter } from '../../utils/utils.functions';
import { setCategory } from '../../state';

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
  const dispatch = useDispatch();
  let products = [];
  let pages = {}
  const { data:productsData, error:productsError, isLoading:ProductsLoading } = useGQLQuery({
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
    console.log("Category Data",categoryData)
    if(categoryData?.product?.category?.getAllCategory?.error){
      toast.error(categoryData?.product?.category?.getAllCategory?.error.message)
    }
    if(categoryData?.product?.category?.getAllCategory?.data){
      console.log("Categories are",categoryData?.product?.category?.getAllCategory?.data)
        dispatch(setCategory(categoryData?.product?.category?.getAllCategory?.data))
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
      {productsData || !ProductsLoading ? (
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
