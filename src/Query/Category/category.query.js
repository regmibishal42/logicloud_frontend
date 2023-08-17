import {gql} from "graphql-tag";

export const GET_ALL_CATEGORY = gql `query getAllCategory{
    product{
      category{
        getAllCategory{
          data{
            id
            name
          }
          error{
            message
            code
          }
        }
      }
    }
  }`;