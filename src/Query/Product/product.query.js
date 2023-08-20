import {gql} from "graphql-tag";

export const GET_PRODUCT_BY_ID = gql`
    query getProductByID($input:GetProductByIDInput!){
  product{
    getProductByID(input:$input){
            data{
        id
        name
        boughtOn
        units
        costPrice
        sellingPrice
        category{
          id
          name
        }
        createdAt
        
            }error{
        message
        code
      }
}
  }
}
`;