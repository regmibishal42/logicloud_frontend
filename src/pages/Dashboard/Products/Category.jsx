import React, { useState } from 'react';
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Button, Box, Divider, Typography, Table, TableRow, TableCell, TableBody,Paper,TableHead } from '@mui/material';

import Header from '../../../components/Header';
import { useGQLQuery, useGQLMutation } from '../../../useRequest';
import { GET_ALL_CATEGORY } from '../../../Query/Category/category.query';
import { getToken } from '../../../utils/token';
import { DELETE_CATEGORY } from '../../../Query/Category/category.mutation';


const Category = () => {
    const token = getToken();
    const header = GetHeader(token);
    let categories = useSelector((state) => state.global.category) || []
    if (categories.length < 1) {
        //get categories from the query
        const { data: categoriesData, isLoading: categoryLoading } = useGQLQuery({
            key: "all_category",
            query: GET_ALL_CATEGORY,
            headers: header
        });
        if (categoriesData) {
            if (categoriesData?.product?.category?.getAllCategory?.error) {
                console.log("Cannot get Category(React-Query)", categoriesData?.product?.category?.getAllCategory?.error.message)
                toast.error(categoriesData?.product?.category?.getAllCategory?.error.message)
            }
            if (categoriesData?.product?.category?.getAllCategory?.data) {
                categories = categoriesData?.product?.category?.getAllCategory?.data
            }
        }
    }
    const { mutate: deleteCategoryMutate, data: deleteCategoryData, isLoading: deleteCategoryLoading } = useGQLMutation(DELETE_CATEGORY, header)
    const deleteEventHandler = (categoryID) => {
        if (categoryID) {
            deleteCategoryMutate({ categoryID })
        }
    }
    if (deleteCategoryData) {
        if (deleteCategoryData?.product?.category?.createCategory?.error) {
            console.log("Delete Category Query Error", deleteCategoryData?.product?.category?.createCategory?.error)
            toast.error(deleteCategoryData?.product?.category?.createCategory?.error)
        }
        if (deleteCategoryData?.product?.category?.createCategory?.id) {
            console.log("Category Deleted", deleteCategoryData?.product?.category?.createCategory?.id)
            categories = categories.filter((category) => category.id != deleteCategoryData?.product?.category?.createCategory?.id)
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
            <Header title="Categories" subtitle="list of product categories" />
            <Divider sx={{ borderColor: 'grey' }} />
            <Box height="80vh" sx={{ mt: "2rem" }} display="flex" justifyContent="flex-start" gap={5} width="100%" overflow="auto">
                    <Table>
                        <TableHead>
                            <TableRow style={{ maxHeight: '5px',padding:"0",margin:"0"}}>
                                <TableCell><Typography variant="subtitle1">Category Name</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1">Action</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id} style={{ maxHeight: '5px' }}>
                                    <TableCell style={{ maxHeight: '5px' }}>
                                        <Typography>{category.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="secondary" onClick={() => deleteEventHandler(category.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </Box>
        </Box>
    )
}

export default Category
