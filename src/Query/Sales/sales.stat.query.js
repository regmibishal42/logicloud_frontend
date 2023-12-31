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

export const SALES_BREAKDOWN = gql`
query getSalesBreakdown($input:SalesBreakDownInput!){
 sales{
  getSalesBreakdown(input:$input){
    data{
      categoryName
      totalSales
    }
    error{
      message
      code
    }
  }
}
}
`;

export const SALES_BY_STAFF = gql`
query getSalesByStaff($input: SalesBreakDownInput!){
  sales{
    getSalesByStaff(input:$input){
      data{
        staffName
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

export const SALES_BY_PRODUCTS = gql`
query getProductSalesStat($input: ProductSalesInput!){
  sales{
    getProductSalesStat(input:$input){
      data{
        productName
        categoryName
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