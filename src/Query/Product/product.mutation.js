import { gql } from "graphql-request";


export const UPDATE_PRODUCT_DETAILS = gql `
mutation updateProduct($input:UpdateProductInput!){
  product{
    updateProduct(input:$input){
      id
      data{
        id
        name
        boughtOn
        units
        category{
          id
        }
        costPrice
        sellingPrice
      }
      error{
        message
        code
      }
}
  }
}
`;

export const DELETE_PRODUCT = gql`
mutation deleteProduct($input:DeleteProductInput!){
  product{
    deleteProduct(input:$input){
      id
      error{
        message
        code
      }
    }
  }
}
`;