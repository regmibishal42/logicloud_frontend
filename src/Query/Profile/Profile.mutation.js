import {gql} from "graphql-tag";

export const UPDATE_PROFILE = gql`
mutation updateProfile($input: UpdateProfileInput!){
  profile{
    updateProfile(input:$input){
      data{
        userID
        firstName
        lastName
        contactNumber
        DateOfBirth
      }
      error{
        message
        code
      }
    }
  }
}
`;

export const UPDATE_PASSWORD = gql`
mutation updatePassword($input: UpdatePasswordInput!){
  auth{
    updatePassword(input:$input){
      data{
        id
        email
        userType
      }
      error{
        message
        code
      }
    }
  }
}
`;