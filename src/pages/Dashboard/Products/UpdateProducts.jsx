import React, { useState } from 'react';
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Stack, Divider, useTheme } from '@mui/material';

import Header from '../../../components/Header';
import { useGQLQuery, useGQLMutation } from '../../../useRequest';
import { UPDATE_PRODUCT_DETAILS } from '../../../Query/Product/product.mutation';
import { getToken } from '../../../utils/token';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_PRODUCT_BY_ID } from '../../../Query/Product/product.query';



const UpdateProducts = () => {
    const [updateProduct, setUpdateProduct] = useState({});
    const token = getToken();
    const header = GetHeader(token);
    const theme = useTheme();
    const navigate = useNavigate();
    const params = useParams();
    let categories = useSelector((state) => state.global.category)
    let product = {}
    let initialData = {}
    //get product by id query
    const { data: productData, isLoading: productLoading } = useGQLQuery({
        key: "product",
        query: GET_PRODUCT_BY_ID,
        headers: header,
        variables: {
            input: {
                productID: params.productID,
            }
        }
    });
    if (productData) {
        if (productData?.product?.getProductByID?.error) {
            toast.error(productData?.product?.getProductByID?.error.message)
        }
        if (productData?.product?.getProductByID?.data) {
            product = productData?.product?.getProductByID?.data
            initialData = {
                name: product.name,
                boughtOn: product.boughtOn,
                units: product.units,
                categoryID: product?.category?.id,
                costPrice: product.costPrice,
                sellingPrice: product.sellingPrice,
            }
            console.log("Product", product)
            console.log("Product Initial", initialData)
        }
    }
    //update product mutation
    const {data:updateProductData,isLoading:updateProductLoading,mutate:updateProductMutate} = useGQLMutation(UPDATE_PRODUCT_DETAILS,header)
    if(updateProductData){
        if (updateProductData?.product?.updateProduct?.error) {
            toast.error(productData?.product?.updateProduct?.error.message)
        }
        if (updateProductData?.product?.updateProduct?.id) {
            toast("Product Updated")
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        updateProduct.productID = params.productID
        // Handle form submission here, e.g., send data to a server
        console.log("Update Product",updateProduct)
        updateProductMutate(updateProduct)
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
            <Header title="Update Product Details" subtitle="update product from here" />
            <Divider sx={{ borderColor: 'grey' }} />
            {productLoading && !productData ? (<>Loading...</>) : (
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
                                    value={updateProduct?.name || product.name}
                                    onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                                    required
                                    sx={{ width: "50%" }}
                                />
                                <FormControl sx={{ minWidth: "50%" }}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="categoryID"
                                        value={updateProduct?.categoryID || product?.category?.id}
                                        onChange={(e) => setUpdateProduct({ ...updateProduct, categoryID: e.target.value })}
                                        required
                                        sx={{ width: '100%' }} // Adjust the width as needed
                                    >
                                        {categories && categories.map((category) =>
                                            <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack>
                        <TextField
                            label="Cost Price"
                            type="number"
                            name="costPrice"
                            value={updateProduct?.costPrice || product.costPrice}
                            onChange={(e) => setUpdateProduct({ ...updateProduct, costPrice: e.target.value })}
                            required
                        />
                        <TextField
                            label="Selling Price"
                            type="number"
                            name="sellingPrice"
                            value={updateProduct?.sellingPrice || product.sellingPrice}
                            onChange={(e) => setUpdateProduct({ ...updateProduct, sellingPrice: e.target.value })}
                            required
                        />
                        <TextField
                            label="Units"
                            type="number"
                            name="units"
                            value={updateProduct?.units || product.units}
                            onChange={(e) => setUpdateProduct({ ...updateProduct, units: e.target.value })}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px" }}>
                            Update Product
                        </Button>
                    </FormControl>
                </Box>
            )}
        </Box>
    )
}

export default UpdateProducts
