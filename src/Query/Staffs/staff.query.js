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

export const GET_STAFF_BY_ID = gql`
query getStaffByID($input: GetStaffInput!){
  staff{
    getStaffByID(input:$input){
      data{
        staffID
        staff{
          id
          email
          status
          profile{
            firstName
            lastName
          }
        }
        joinedOn
        post
        salary
        isAuthorized
        isActive
      }
      error{
        message
        code
      }
    }
  }
}
`;