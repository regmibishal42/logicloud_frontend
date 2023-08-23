import React, { useState, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../../components/Header';
import { useGQLQuery } from "../../../useRequest";
import { getToken } from '../../../utils/token';
import { GetHeader } from '../../../utils/getHeader';
import { DatePicker } from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { DAILY_SALES_STAT } from '../../../Query/Sales/sales.stat.query';
import { ResponsiveLine } from '@nivo/line';

const Daily = () => {
    //start-end dates
    const [startDate, setStartDate] = useState(new Date("2023-05-01"));
    const [endDate, setEndDate] = useState(new Date("2023-08-23"));
    const theme = useTheme();
    const token = getToken();
    const header = GetHeader(token);

    let data = [];
    //get daily sales data
    const { data: dailySalesData, isLoading } = useGQLQuery({
        key: "daily-data",
        query: DAILY_SALES_STAT,
        headers: header
    });
    if (dailySalesData) {
        if (dailySalesData?.sales?.getDailySalesStat?.error) {
            console.log("Daily Sales Data Query Error", dailySalesData?.sales?.getDailySalesStat?.error.message)
        }
        if (dailySalesData?.sales?.getDailySalesStat?.data) {
            data = dailySalesData?.sales?.getDailySalesStat?.data
            console.log("Daily Sales Data", data)
        }

    }
    //formatted data for charts
    const [formattedData] = useMemo(() => {
        console.log("Memo Data", data)
        if (data.length == 0) {
            console.log("Returning Data")
            return [];
        }

        const dailyData = data;
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

        Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
            const dateFormatted = new Date(date)

            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const dateObj = new Date(date);
                const options = { month: 'short', day: 'numeric' };
                const extractedDayAndMonth = dateObj.toLocaleDateString('en-US', options);
                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: extractedDayAndMonth, y: totalSales },
                  ];
                  totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: extractedDayAndMonth, y: totalUnits },
                  ];
            }
        });

        const formattedData = [totalSalesLine, totalUnitsLine];
        return [formattedData]
    }, [data,startDate,endDate]);

    console.log("Formatted Data",formattedData)

    return <Box m="1.5rem 2.5rem">
        <Header title="Daily Sales" subtitle="Chart of daily sales" />
        <Box height="75vh">
            <Box display="flex" justifyContent="flex-end">
               <Box>
               <DatePicker 
                selected={startDate}
                onChange={(date)=>setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                />
               </Box>
               <Box>
               <DatePicker 
                    selected={endDate}
                    onChange={(date)=>setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
               </Box>
            </Box>
            {data.length > 0 ? (
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
                    colors={{datum:"color"}}
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
                      tickValues: 5,
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
                    legends={
                      [
                            {
                              anchor: "top-right",
                              direction: "column",
                              justify: false,
                              translateX: 50,
                              translateY: -0,
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
                       
                    }
                  />
            ) : (<>Loading....</>)}
        </Box>
    </Box> 
}

export default Daily
