import {gql} from "graphql-tag";


export const GET_ALL_STAFFS = gql`
query getStaffByOrganization{
  staff{
    getStaffByOrganization{
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