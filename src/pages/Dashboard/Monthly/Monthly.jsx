import React, { useState, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../../components/Header';
import { useGQLQuery } from "../../../useRequest";
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';

import { GET_OVERALL_STAT } from '../../../Query/Sales/sales.stat.query';
import { ResponsiveLine } from '@nivo/line';


const Monthly = () => {
    //start-end dates
    const theme = useTheme();
    const token = getToken();
    const header = GetHeader(token);

    let monthlyData = [];
    //get daily sales data
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
            monthlyData = salesDataFromServer?.sales?.getSalesStat?.data?.monthlyData
            if(monthlyData == null){
              monthlyData = []
            }
        }
      }
    //formatted data for charts
    const [formattedData] = useMemo(() => {
        if (monthlyData.length < 1){
            console.log("Returning Data")
            return [];
          }   
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

        monthlyData.forEach(({ month, totalSales, totalUnits }) => {
                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: month, y: totalSales },
                  ];
                  totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: month, y: totalUnits },
                  ];
            
        });

        const formattedData = [totalSalesLine, totalUnitsLine];
        return [formattedData]
    }, [monthlyData]);

    console.log("Formatted Data",formattedData)

    return <Box m="1.5rem 2.5rem">
        <Header title="Monthly Sales" subtitle="Chart of monthly sales" />
        <Box height="75vh">
            {monthlyData.length > 0 ? (
                    <ResponsiveLine
                    data={formattedData}
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
                    colors={{ datum: "color" }}
                    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      orient: "bottom",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 90,
                      legend: "Month",
                      legendOffset: 60,
                      legendPosition: "middle",
                    }}
                    axisLeft={{
                      orient: "left",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Total",
                      legendOffset: -50,
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
                    legends={[
                      {
                        anchor: "top-right",
                        direction: "column",
                        justify: false,
                        translateX: 50,
                        translateY: 0,
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
                    ]}
                  />
            ) : (<>Loading....</>)}
        </Box>
    </Box> 
}

export default Monthly
