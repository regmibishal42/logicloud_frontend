import React, { useMemo, useEffect} from 'react'
import { getToken } from '../utils/token';
import { GetHeader } from '../utils/getHeader';
import { SALES_BREAKDOWN } from '../Query/Sales/sales.stat.query';
import { Box, useTheme,Typography } from '@mui/material';
import { useGQLQuery } from '../useRequest';
import { ResponsivePie } from '@nivo/pie';

const BreakdownChart = ({isDashboard = false,filterType}) => {
    const token = getToken();
    const header = GetHeader(token);
    const theme = useTheme();
    // Query to get data from the server
    let data = [];
    const {data:breakdownData,isLoading,refetch} = useGQLQuery({
        key:"breakdown_data",
        query:SALES_BREAKDOWN,
        headers:header,
        variables:{
            input:{
                filterType:filterType,
            }
        }
    });
    if(breakdownData){
        if(breakdownData?.sales?.getSalesBreakdown?.error){
            console.log("Breakdown Query Error",breakdownData?.sales?.getSalesBreakdown?.error);
        }
        if(breakdownData?.sales?.getSalesBreakdown?.data){
            data = breakdownData?.sales?.getSalesBreakdown?.data;

            console.log("Breakdown Query Data",data);
        }

    }
    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],
    ]
    const formattedData = useMemo(()=>{
        console.log("Formatting Data")
        if(data.length < 1){
            console.log("Empty Array Returned")
            return {};
        }
        const newData = data.map((item, index) => {
            const colorIndex = index < colors.length ? index : index % colors.length;
            return {
              id:item.categoryName ? item.categoryName :"deleted_category",
              label:item.categoryName ? item.categoryName :"deleted_category",
              value:item.totalSales,
              color: colors[colorIndex]
            };
          }); 
          return newData;
    },[data])
    console.log("Formatted Data",formattedData)

    useEffect(()=>{
        refetch();
        console.log("Breakdown UseEffect")
    },[filterType])
  return <Box
    height={isDashboard ? "400px" : "100%"}
    width={undefined}
    minHeight={isDashboard ? "325px" :undefined}
    minWidth={isDashboard ? "325px" :undefined}
    position="relative"
  >
    {formattedData.length > 1 ? (<><ResponsivePie
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
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
      position="absolute"
      top="50%"
      left="50%"
      color={theme.palette.secondary[400]}
      textAlign="center"
      pointerEvents="none"
      sx={{
        transform: isDashboard
          ? "translate(-75%, -170%)"
          : "translate(-50%, -100%)",
      }}
    >
      <Typography variant="h6">
        {!isDashboard && "Total:"} रु.{data.reduce((sum, item) => sum + item.totalSales, 0)}
      </Typography>
    </Box>
    </>
      ) : (<>Loading...</>)}
  </Box>
}

export default BreakdownChart
