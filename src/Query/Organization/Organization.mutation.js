import {gql} from "graphql-tag";

export const CREATE_ORGANIZATION = gql`
mutation createOrganization($input: CreateOrganizationInput!){
  organization{
    createOrganization(input:$input){
      data{
        id
        Name
        email
        contact
      }
      error{
        message
        code
      }
    }
  }
}
`;