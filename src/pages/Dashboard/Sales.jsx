import React from 'react';
import { useGQLQuery } from '../../useRequest';
import { GET_ALL_SALES } from '../../Query/Sales/sales.query';
import {GetHeader} from "../../utils/getHeader";
import { getToken } from "../../utils/token";

const Sales = () => {
    const token = getToken();
    const header = GetHeader(token);
  return (
    <div>
        Sales
    </div>
  )
}

export default Sales
