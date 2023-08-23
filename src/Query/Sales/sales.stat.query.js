import {gql} from "graphql-tag";


export const GET_OVERALL_STAT = gql`
query getSalesStat($input: SalesStatInput!){
  sales{
    getSalesStat(input:$input){
      data{
        totalYearlySales
        totalYearlyUnitsSold
        totalMonthlySales
        totalMonthlyUnitsSold
        totalDailySales
        totalDailyUnitsSold
        monthlyData{
          month
          totalSales
          totalUnits
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

export const DAILY_SALES_STAT = gql`
query getDailySalesStat{
 sales{
  getDailySalesStat{
    data{
      date
      totalSales
      totalUnits
    }
    error{
      message
      code
    }
  }
}
}
`;