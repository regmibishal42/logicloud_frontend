import React,{useState} from 'react';
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
import {GET_ALL_PRODUCTS} from "../../Query/products";
import {getToken} from "../../utils/token";
import {useSelector} from "react-redux";
import {GetHeader} from "../../utils/getHeader";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const token = getToken();
  const header = GetHeader(token);
  let products = [];
  let pages = {}
  const {data,error} = useGQLQuery({
    key:"all_products",
    query:GET_ALL_PRODUCTS,
    headers:header,
    variables:{
      input:{
        params:{},
      page:{}
      }
    }

  });
  if (error){
    console.log("React-Query Error Occurred",error)
    toast.error(error)
  }
  if(data){
    if(data?.product?.getProductsByFilter?.error){
      toast.error(data?.product?.getProductsByFilter?.error.message)
    }
    if(data?.product?.getProductsByFilter?.data){
      products = data?.product?.getProductsByFilter?.data;
    }
    if(data?.product?.getProductsByFilter.pageInfo){
      pages = data?.product?.getProductsByFilter?.pageInfo
    }

  }
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
      <Header title="Products" subtitle="See your products here" />
    </Box>
  )
}

export default Products
