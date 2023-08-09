import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/token';

const Dashboard = () => {
  const token  = getToken()
  const navigate = useNavigate();
  useEffect(()=>{
    const token  = getToken()
    if (token == null){
      navigate('/login')
    }
  },[])
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
