import { gql } from "graphql-request";


export const GET_USER_ORGANIZATION = gql`
query getUserOrganization{
  organization{
    getUserOrganization{
      data{
        id
        Name 
        email
        contact
        Address{
          City
          District
          State
        }
        PanNumber
      }
      error{
        message
        code
      }
    }
  }
}
`;