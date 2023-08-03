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