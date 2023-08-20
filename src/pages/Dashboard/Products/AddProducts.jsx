import React, { useState } from 'react';
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Stack, Divider, Typography } from '@mui/material';

import Header from '../../../components/Header';
import { useGQLQuery,useGQLMutation } from '../../../useRequest';
import { GET_ALL_CATEGORY } from '../../../Query/Category/category.query';
import { getToken } from '../../../utils/token';
import { CREATE_CATEGORY } from '../../../Query/Category/category.mutation';

const AddProducts = () => {
    const token = getToken();
    const header = GetHeader(token);
    const dispatch = useDispatch();
    const [newCategory,setNewCategory] = useState("");
    let categories = useSelector((state) => state.global.category) || []
    if (categories.length < 1) {
        //get categories from the query
        const {data:categoriesData,isLoading:categoryLoading} = useGQLQuery({
            key:"all_category",
            query:GET_ALL_CATEGORY,
            headers:header
        });
    if (categoriesData){
        if(categoriesData?.product?.category?.getAllCategory?.error){
            console.log("Cannot get Category(React-Query)",categoriesData?.product?.category?.getAllCategory?.error.message)
            toast.error(categoriesData?.product?.category?.getAllCategory?.error.message)
        }
        if(categoriesData?.product?.category?.getAllCategory?.data){
            categories = categoriesData?.product?.category?.getAllCategory?.data
        }
    }
    }
    //category mutation
    const {mutate:categoryMutate,isLoading:categoryMutationLoading,data:categoryMutationData} = useGQLMutation(CREATE_CATEGORY,header);
    if(categoryMutationData){
        if(categoryMutationData?.product?.category?.createCategory?.error){
            console.log("React-Query Cannot Create Category",categoryMutationData?.product?.category?.createCategory.error.message)
            toast.error(categoryMutationData?.product?.category?.createCategory.error.message)
        }
        if(categoryMutationData?.product?.category?.createCategory?.data){
            console.log("Category Created",categoryMutationData?.product?.category?.createCategory?.data)
            if (categories.indexOf(categoryMutationData?.product?.category?.createCategory?.data) < 0){
                categories.push({
                    id:categoryMutationData?.product?.category?.createCategory?.data.id,
                    name:categoryMutationData?.product?.category?.createCategory?.data.name
                })
            }
        }

    }
    // Product Mutation
    const initialProductState = {
        productName: '',
        category: '',
        costPrice: '',
        sellingPrice: '',
        units: '',
        productBoughtOn: '',
    };
    const [product, setProduct] = useState(initialProductState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., send data to a server
        setProduct(initialProductState);
        console.log("Products From Submit", product);
    };
    const handleCategorySubmit = (event) =>{
        event.preventDefault();
        console.log("Submit Handler Clicked",newCategory.length,newCategory)
        if(newCategory.length > 3){
            console.log("New Category is",newCategory)
            categoryMutate({name:newCategory})
        }
        setNewCategory("");
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
            <Box className="myclass-bla" height="80vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%">
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
                                name="productName"
                                value={product.productName}
                                onChange={handleInputChange}
                                required
                                sx={{ width: "50%" }}
                            />
                            <FormControl sx={{ minWidth: "50%" }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={product.category}
                                    onChange={handleInputChange}
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
                        value={product.costPrice}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Selling Price"
                        type="number"
                        name="sellingPrice"
                        value={product.sellingPrice}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Units"
                        type="number"
                        name="units"
                        value={product.units}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Product Bought On"
                        type="date"
                        name="productBoughtOn"
                        value={product.productBoughtOn}
                        onChange={handleInputChange}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px" }}>
                        Add Product
                    </Button>
                </FormControl>
                <FormControl component="form" onSubmit={handleCategorySubmit}>
                    <Stack spacing="2">
                        <Stack direction="row" spacing="4">
                            <TextField
                                label="Add Category"
                                type="text"
                                name="New Category"
                                value={newCategory}
                                onChange={(e)=>setNewCategory(e.target.value)}
                                required
                                // InputLabelProps={{
                                //     shrink: true,
                                // }}
                                sx={{marginRight:"10px"}}
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: "16px"}}>
                                Add Category
                            </Button>
                        </Stack>
                    </Stack>
                </FormControl>
            </Box>
        </Box>
    )
}

export default AddProducts
