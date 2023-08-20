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