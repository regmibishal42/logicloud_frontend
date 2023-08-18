import React, { useState } from 'react';
import { useGQLQuery } from '../../useRequest';
import { GET_ALL_SALES } from '../../Query/Sales/sales.query';
import {GetHeader} from "../../utils/getHeader";
import { getToken } from "../../utils/token";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Sales = () => {
    const token = getToken();
    const header = GetHeader(token);
    const [page,setPage] = useState(1);
    let sales = [];
    const {data:salesData,isLoading:salesDataLoading} = useGQLQuery({
      key:"sales_data",
      query:GET_ALL_SALES,
      headers:header,
      variables: {
        input: {
          params: {
            filterType:"YEARLY"
          },
          page: {
            limit:10,
            sort:"ASC",
            page:page,
          }
        }
      }

    })
  if(salesData){
    console.log("The Sales Data",salesData);
    if(salesData?.sales?.getSalesByFilter?.error){
      console.log("Sales Data Fetching Error",salesData?.sales?.getSalesByFilter?.error)
      toast.error(salesData?.sales?.getSalesByFilter?.error.message)
    }
    if(salesData?.sales?.getSalesByFilter?.data){
      sales = salesData?.sales?.getSalesByFilter?.data
      console.log("The Sales Variable has",sales)
    }
  }
  return (
    <div>
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
        Sales
    </div>
  )
}

export default Sales
