import {gql} from "graphql-tag";

export const GET_DASHBOARD_DATA = gql`
query getDashboardSalesData{
  sales{
    getDashboardSalesData{
      data{
        totalYearlySales
        totalMonthlySales
        totalWeeklySales
        totalDailySales
      }
      error{
        message
        code
      }
    }
  }
}
`;