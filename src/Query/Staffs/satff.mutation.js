import {gql} from "graphql-tag";


export const CREATE_STAFF = gql`
mutation createStaff($input: CreateStaffInput!){
  staff{
    createStaff(input:$input){
      data{
        staffID
        joinedOn
      }
      error{
        message
        code
      }
    }
  }
}
`;


export const UPDATE_STAFF = gql``;

export const DELETE_STAFF = gql``;