import {gql} from "graphql-tag";

export const GET_ALL_SALES = gql`
query getSalesByFilter($input:FilterSalesInput!){
  sales{
    getSalesByFilter(input:$input){
      data{
        id
        product{
          name
          category{
            name
          }
        }
        unitsSold
        soldAt
        soldBy{
          email
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


export const GET_SALES_BY_ID = gql`
query getSaleByID($input:GetSalesByIDInput!){
  sales{
    getSaleByID(input:$input){
        data{
        id
        product{
          name
          category{
            name
          }
        }
        unitsSold
        soldAt
        soldBy{
          email
        }
        createdAt
      }
      error{
        message
        code
      }
    }
  }
}
`;