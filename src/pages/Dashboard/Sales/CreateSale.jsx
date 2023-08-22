import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGQLMutation, useGQLQuery } from '../../../useRequest';
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';
import { CREATE_SALES } from "../../../Query/Sales/sales.mutation";
import {
    Box,
    Button,
    Stack,
    Divider,
    FormControl,
    Typography,
    TextField,
    InputLabel,
    Select,
    MenuItem
  } from "@mui/material";
  import { ToastContainer, toast } from "react-toastify";
  import 'react-toastify/dist/ReactToastify.css';
import { GET_PRODUCT_BY_ID } from '../../../Query/Product/product.query';
import Header from '../../../components/Header';
import { DateFormatter } from '../../../utils/utils.functions';

const CreateSale = () => {
    const navigate = useNavigate();
    const { productID } = useParams();
    const token = getToken();
    const header = GetHeader(token);
    let product = {}
    const [initialData,setInitialData] = useState({});

    //get product by id query
    const { data: productData, isLoading: productLoading } = useGQLQuery({
        key: "product",
        query: GET_PRODUCT_BY_ID,
        headers: header,
        variables: {
            input: {
                productID: productID
            }
        }
    });
    if (productData) {
        if (productData?.product?.getProductByID?.error) {
            toast.error(productData?.product?.getProductByID?.error.message)
        }
        if (productData?.product?.getProductByID?.data) {
             console.log(productData?.product?.getProductByID?.data)
             product = productData?.product?.getProductByID?.data
        }
    }
    //create product mutation
    const {data:createSaleData,isLoading:createSaleLoading,mutate:CreateSaleMutation} = useGQLMutation(CREATE_SALES,header);
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(initialData)
        if(!initialData.soldAt){
            initialData.soldAt = product.sellingPrice
        }
        if(!initialData.units){
            initialData.units = product.units
        }
        initialData.productID = productID
        CreateSaleMutation(initialData);
    }
    //handle response from sale mutation
    if(createSaleData){
        console.log("Sales Data",createSaleData)
        if(createSaleData?.sales?.createSales?.error){
            console.log("Create Sale Error",createSaleData?.sales?.createSales?.error)
            toast.error(createSaleData?.sales?.createSales?.error.message)
        }
        if(createSaleData?.sales?.createSales?.data){
           toast("Product Sold")
        }
    }
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
            <Header title="Add Products" subtitle="add new product from here" />
            <Divider sx={{ borderColor: 'grey' }} />
            {productLoading || !productData ? (<>Loading...</>) : (
                <Box height="80vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%">
                {/* Add Products Form */}
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
                                label="Product Name"
                                name="name"
                                value={product?.name}
                                sx={{ width: "50%" }}
                                disabled
                            />
                            <FormControl sx={{ minWidth: "50%" }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="categoryID"
                                    value={product?.category?.name}
                                    disabled
                                    sx={{ width: '100%' }} // Adjust the width as needed
                                >

                                        <MenuItem value={product?.category?.name} >{product?.category?.name}</MenuItem>
                               
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <TextField
                        label="Cost Price"
                        type="number"
                        name="costPrice"
                        value={product?.costPrice}
                        disabled
                    />
                    <TextField
                        label="Selling Price"
                        type="number"
                        name="sellingPrice"
                        value={initialData.soldAt || product?.sellingPrice}
                        onChange={(e)=>setInitialData({soldAt:e.target.value})}
                        required
                    />
                    <TextField
                        label="Units"
                        type="number"
                        name="units"
                        value={initialData.units || product?.units}
                        onChange={(e)=>setInitialData({units:e.target.value})}
                        required
                    />
                    <TextField
                        label="Product Bought On"
                        type="text"
                        name="boughtOn"
                        value={DateFormatter(product?.boughtOn)}
                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px" }}>
                        Sell Product
                    </Button>
                </FormControl>
            </Box>
            )}
        </Box>
    )
}

export default CreateSale
