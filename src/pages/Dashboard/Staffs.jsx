import React, { useState } from 'react';
import { useGQLQuery } from '../../useRequest';
import { GET_ALL_SALES } from '../../Query/Sales/sales.query';
import { GetHeader } from "../../utils/getHeader";
import { getToken } from "../../utils/token";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';


const Staffs = () => {
    const theme = useTheme();
    const token  = getToken();
    const header = GetHeader(token);
    
  return (
    <div>
      Staffs
    </div>
  )
}

export default Staffs
