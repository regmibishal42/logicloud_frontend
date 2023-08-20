import React, { useState } from 'react';
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Stack,Divider} from '@mui/material';

import Header from '../../../components/Header';


const AddProducts = () => {
    const categories = useSelector((state) => state.global.category)
    if (!categories || categories.length < 1) {
        //get categories from the query
    }
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
        console.log("Products From Submit",product);
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
            <Header title="Add Products" subtitle="add new product from here" />
            <Divider sx={{ borderColor: 'grey' }} />
            <Box height="80vh" sx={{mt:"2rem"}}>
                <FormControl component="form" onSubmit={handleSubmit} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    maxWidth: '600px',
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
                                sx={{width:"50%"}}
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
                                    <MenuItem value="electronics">Electronics</MenuItem>
                                    <MenuItem value="clothing">Clothing</MenuItem>
                                    <MenuItem value="home">Home</MenuItem>
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
            </Box>
        </Box>
    )
}

export default AddProducts
