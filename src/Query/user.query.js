import gql from "graphql-tag";

export const LOGIN_USER = gql`
mutation Login($input: LoginInput!) {
  auth {
    loginUser(input: $input) {
      id
      data {
        accessToken
      }
      error {
        message
        code
      }
    }
  }
}
`;

export const CREATE_USER = gql`
mutation CreateUser($input:UserInput!){
  auth{
    createUser(input:$input){
data{
  id
  email
  userType
  isVerified
  status
  profile{
    firstName
    lastName
    contactNumber
    DateOfBirth
    Address{
      City
      District
      State
    }
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