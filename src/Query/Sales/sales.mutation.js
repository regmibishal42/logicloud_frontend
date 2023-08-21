import {gql} from "graphql-tag";


export const CREATE_SALES = gql`
mutation createSales($input:CreateSaleInput!){
  sales{
    createSales(input:$input){
      id
      data{
        id
        product{
          name
          units
        }
        unitsSold
        soldAt
        soldBy{
          email
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


export const UPDATE_SALES = gql`
mutation updateSales($input: UpdateSalesInput!){
  sales{
    updateSales(input:$input){
      id
      data{
        id
        unitsSold
        soldAt
      }
      error{
        message
        code
      }
}
  }
}
`;

export const DELETE_SALES = gql`
mutation deleteSales($input: DeleteSalesInput!){
  sales{
    deleteSales(input:$input){
      id
      error{
        message
        code
      }
    }
  }
}
`;
