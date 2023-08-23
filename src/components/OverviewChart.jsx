import React,{useMemo} from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { getToken } from '../utils/token';
import { GetHeader } from '../utils/getHeader';
import { useGQLQuery } from '../useRequest';
import { GET_OVERALL_STAT } from '../Query/Sales/sales.stat.query';

// import api call



const OverviewChart = ({isDashboard = false,view}) => {
    const theme = useTheme();
  //  const salesData = {}
    const token = getToken();
    const header = GetHeader(token);
    let data ={}
    //get salesStat data from the server
    const {data:salesDataFromServer,isLoading:salesDataLoading} = useGQLQuery({
      key: "sales_stat",
      query: GET_OVERALL_STAT,
      variables: {
        input: {}
      },
      headers:header,
    });
    if (salesDataFromServer){
      if(salesDataFromServer?.sales?.getSalesStat?.error){
        console.log("Sales Stat Query Error",salesDataFromServer?.sales?.getSalesStat?.error)
      }
      if(salesDataFromServer?.sales?.getSalesStat?.data){
        data = salesDataFromServer?.sales?.getSalesStat?.data 
      }
    }
   
    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
      console.log("Memo Data",data)
      if (Object.keys(data).length === 0){
        console.log("Returning Data")
        return [];
      }
  
      const { monthlyData } = data;
      const totalSalesLine = {
        id: "totalSales",
        color: theme.palette.secondary.main,
        data: [],
      };
      const totalUnitsLine = {
        id: "totalUnits",
        color: theme.palette.secondary[600],
        data: [],
      };
  
      Object.values(monthlyData).reduce(
        (acc, { month, totalSales, totalUnits }) => {
          const curSales = acc.sales + totalSales;
          const curUnits = acc.units + totalUnits;
  
          totalSalesLine.data = [
            ...totalSalesLine.data,
            { x: month, y: curSales },
          ];
          totalUnitsLine.data = [
            ...totalUnitsLine.data,
            { x: month, y: curUnits },
          ];
  
          return { sales: curSales, units: curUnits };
        },
        { sales: 0, units: 0 }
      );
  
      return [[totalSalesLine], [totalUnitsLine]];
    }, [data]);
  if(!data || salesDataLoading) return "Loading...."
    
  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v.trim();
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  )
}

export default OverviewChart
