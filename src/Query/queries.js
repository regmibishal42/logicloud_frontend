import gql from "graphql-tag";

export const GET_ALL_USERS = gql`
        query{
  auth{
    getUserDetails{
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

export const GET_USER = gql`
            query{
  auth{
    getUserDetails{
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