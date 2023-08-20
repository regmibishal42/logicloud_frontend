import { gql } from "graphql-request";

export const CREATE_CATEGORY = gql`
mutation createCategory($input:CreateCategoryInput!){
  product{
    category{
      createCategory(input:$input){
        id
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
}
`;

export const DELETE_CATEGORY = gql`
mutation deleteCategory($input:DeleteCategoryInput!){
  product{
    category{
      deleteCategory(input:$input){
        id
        error{
          message
          code
        }
}
    }
  }
}
`;