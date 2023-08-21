import {gql} from "graphql-tag";


export const GET_ALL_STAFFS = gql`
query getStaffByOrganization($input:FilterStaffInput!){
  staff{
    getStaffByOrganization(input:$input){
      data{
        staffID
        staff{
          email
          profile{
            firstName
            lastName
          }
        }
        joinedOn
        post
        salary
        isAuthorized
      }
      error{
        message
        code
      }
    }
  }
}
`;