import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, InputLabel, Box, Select, LinearProgress } from '@mui/material';
import OverviewChart from '../../../components/OverviewChart';
import { useTheme } from '@mui/material';
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';
import { useGQLQuery } from '../../../useRequest';
import { SALES_BY_PRODUCTS } from '../../../Query/Sales/sales.stat.query';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../components/Header';
import { ResponsiveBar } from "@nivo/bar";
const ProductSales = () => {
    const theme = useTheme();
    const token = getToken();
    const header = GetHeader(token);
    let data = [];
    const [filterType, setFilterType] = useState("YEARLY");
    const [orderType, setOrderType] = useState("MOST_SOLD");
    const { data: salesData, isLoading, refetch } = useGQLQuery({
        key: "products_sales_data",
        query: SALES_BY_PRODUCTS,
        headers: header,
        variables: {
            input: {
                filterType: filterType,
                orderBy: orderType
            }
        }
    });
    if (salesData) {
        if (salesData?.sales?.getProductSalesStat?.error) {
            console.log("Products Sales Stat Error", salesData?.sales?.getProductSalesStat?.error)
            toast.error(salesData?.sales?.getProductSalesStat?.error.message)
        }
        if (salesData?.sales?.getProductSalesStat?.data) {
            data = salesData?.sales?.getProductSalesStat?.data
            console.log("Products Sales Data", data)
        }
    }
    useEffect(()=>{
        console.log("Refetch")
        refetch();
    },[orderType,filterType])
    return <Box m="1.5rem 2.5rem">
        <Header title="Sales By Products" subtitle="Sales data by products" />
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

        {data ? (
            <Box height="75vh">
                <FormControl sx={{ minWidth: "50%" }}>
                    <InputLabel>Data Filter Type</InputLabel>
                    <Select
                        name="filterType"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        required
                        sx={{ width: '50%', mt: "5px" }} // Adjust the width as needed
                    >
                        <MenuItem value={"YEARLY"}>YEARLY</MenuItem>
                        <MenuItem value={"MONTHLY"}>MONTHLY</MenuItem>
                        <MenuItem value={"WEEKLY"}>WEEKLY</MenuItem>
                        <MenuItem value={"DAILY"}>DAILY</MenuItem>

                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: "50%" }}>
                    <InputLabel>Order By</InputLabel>
                    <Select
                        name="orderType"
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        required
                        sx={{ width: '50%', mt: "5px" }} // Adjust the width as needed
                    >
                        <MenuItem value={"LEAST_SOLD"}>Least Sold</MenuItem>
                        <MenuItem value={"MOST_SOLD"}>Most Sold</MenuItem>

                    </Select>
                </FormControl>
                <ResponsiveBar
                    data={data}
                    keys={['totalUnits']}
                    indexBy="productName"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.6}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                },
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Product Name',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Total Units',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={theme.palette.secondary[300]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </Box>
        ) : (<LinearProgress />)}
    </Box>
}

export default ProductSales
