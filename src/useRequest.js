import {useQuery,useMutation} from "react-query";
import {GraphQLClient} from "graphql-request";
import React from "react";

const API_URL = "http://localhost:8080/query"


export const useGQLQuery = ({key,query,variables,headers={},config={}})=>{
  console.log("The Variables are:",variables)
  console.log("Header is ",headers)
  const graphQLClient = new GraphQLClient(API_URL,headers);
  const fetchData = async() => await graphQLClient.request(query,variables);
 // const fetchData = async () => await request(endpoint,query,variables);
  return useQuery(key,fetchData,config);
};

export const useGQLMutation = (mutation,headers={})=>{
  const graphQLClient = new GraphQLClient(API_URL, headers);

  const mutateData = async (input) => {
    console.log("The Variables are:",input);
    const response = await graphQLClient.request(mutation, {input});
    return response;
  };
  return useMutation(mutateData);
}