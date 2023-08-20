import React from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { useGQLQuery } from '../../../useRequest';
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';

const ViewProduct = () => {
    const {productID}= useParams();
    const navigate = useNavigate();
  return (
    <div>
      Individual Product Page
    </div>
  )
}

export default ViewProduct
