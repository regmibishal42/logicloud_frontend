import gql from "graphql-tag";


export const CREATE_PRODUCT = gql`
mutation createProduct($input:CreateProductInput!){
  product{
    createProduct(input:$input){
      id
      data{
        id
        name
        boughtOn
        units
        costPrice,
        sellingPrice,
        category{
          id
          name
        }  
      }
      error{
        message
        code
      }
    }
  }
}
`;


export const GET_ALL_PRODUCTS = gql`
query GetProductsByFilter($input:GetProductsByFilterInput!){
  product{
    getProductsByFilter(input:$input){
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
        
      }
      error{
        message
        code
      }
      pageInfo{
        page
        count
        totalRows
        totalPages
      }
    }
  }
}
`;



