import React, { useState } from 'react';
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Stack
} from "@mui/material";
import Header from '../../../components/Header';
import { useGQLQuery,useGQLMutation } from '../../../useRequest';
import { GET_ALL_PRODUCTS } from "../../../Query/products";
import { GET_ALL_CATEGORY } from "../../../Query/Category/category.query";
import { getToken } from "../../../utils/token";
import { useDispatch } from "react-redux";
import { GetHeader } from "../../../utils/getHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DateFormatter } from '../../../utils/utils.functions';
import { setCategory } from '../../../state';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import {DELETE_PRODUCT} from "../../../Query/Product/product.mutation";


const Products = () => {
  const token = getToken();
  const header = GetHeader(token);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [deleteID,setDeleteID] = useState("");
  let products = [];
  let pages = {}

  //products query
  const { data: productsData, error: productsError, isLoading: ProductsLoading } = useGQLQuery({
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
  // Category
  // category
  const { data: categoryData, isLoading: categoryLoading } = useGQLQuery({
    key: "all_categories",
    query: GET_ALL_CATEGORY,
    headers: header
  })
  if (categoryData) {
    if (categoryData?.product?.category?.getAllCategory?.error) {
      toast.error(categoryData?.product?.category?.getAllCategory?.error.message)
    }
    if (categoryData?.product?.category?.getAllCategory?.data) {
      dispatch(setCategory(categoryData?.product?.category?.getAllCategory?.data))
    }
  }
  //delete product Mutation
  const { data: deleteProductData, isLoading: deleteProductLoading, mutate: deleteProductMutation } = useGQLMutation(DELETE_PRODUCT, header)
  if (deleteProductData) {
    if (deleteProductData?.product?.deleteProduct.error) {
      console.log("Delete Product Error", deleteProductData?.product?.deleteProduct.error)
      toast.error(deleteProductData?.product?.deleteProduct.error.message)
    }
    if (deleteProductData?.product?.deleteProduct.id) {
      toast("product deleted")
    }

  }
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  //update products details
  const editClickHandler = (rowClicked) => {
    //e.preventDefault();
    console.log("Row", rowClicked)
    console.log("Edit Button Clicked")
    navigate(`/product/update/${rowClicked}`)
  }
  const deleteClickHandler = (rowClicked) => {
    console.log("Row", rowClicked)
    deleteProductMutation({
      productID:rowClicked
    })
    
  }
  const viewClickHandler = (rowClicked) => {
    console.log("View Button Clicked")
    navigate(`/product/${rowClicked}`)
  }
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "productName",
      flex: 1,
    },
    {
      field: "category",
      headerName: "categoryName",
      flex: 1,
      valueGetter: params => params.row.category.name
    },
    {
      field: "boughtOn",
      headerName: "BoughtOn",
      flex: 1,
      valueGetter: (params) => {
        const formattedDate = DateFormatter(params.row.boughtOn)
        return formattedDate;
      }
    },

    {
      field: "units",
      headerName: "AvailableUnits",
      flex: 0.5,
    },
    {
      field: "costPrice",
      headerName: "CostPrice",
      flex: 0.5,
    },
    {
      field: "sellingPrice",
      headerName: "SellingPrice",
      flex: 0.5,
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
            <Button variant="outlined" color="warning" size="small" onClick={() => editClickHandler(params.row.id)}>Edit</Button>
            <Button variant="outlined" color="error" size="small" onClick={() => deleteClickHandler(params.row.id)}>Delete</Button>
          </Stack>
        );
      },
    },
    {
      field: 'view',
      headerName: 'View',
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="warning" size="small" onClick={() => viewClickHandler(params.row.id)}>View Details</Button>
          </Stack>
        );
      },
    }




  ]; return (
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
      <Box height="80vh"
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
          getRowId={(row) => row.id}
          rows={(products) || []}
          columns={columns}
          rowCount={(pages && pages.totalPages) || 0}
          pagination
          page={page}
          pageSize={10}
          paginationMode='server'
          sortingMode='server'
          onPageChange={(newPage) => setPage(newPage)}
        // onPageSizeChnage
        />
      </Box>
    </Box>
  )
}

export default Products
