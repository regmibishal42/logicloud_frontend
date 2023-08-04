import React,{useEffect} from 'react';
import Login from '../Auth/login';
import Dashboard from '../Dashboard';
import { getToken } from '../../utils/token';
import { Navigate } from 'react-router-dom';
const Home = () => {
    const token = getToken();
    console.log(token);
  if (token == null){
    return <Navigate to={'/login'} />
  }else{
    return <Navigate to="/dashboard" />
  }
 
}

export default Home
