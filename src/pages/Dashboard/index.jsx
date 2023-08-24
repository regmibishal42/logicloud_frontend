import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlexBetween from "../../components/FlexBetween";
import Header from '../../components/Header';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "../../components/BreakdownChart";
import OverviewChart from "../../components/OverviewChart";
import { GetHeader } from '../../utils/getHeader';
import { getToken } from '../../utils/token';
import { useGQLQuery } from '../../useRequest';
import { GET_DASHBOARD_DATA } from "../../Query/Dashboard/Dashboard.query";
import StatBox from '../../components/StatBox';
import Sales from './Sales/Sales';


const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const token = getToken();
  const header = GetHeader(token);
  let dashboardData = {};
  //get dashboard data
  const { data, isLoading } = useGQLQuery({
    key: "dashboard_data",
    query: GET_DASHBOARD_DATA,
    headers: header,
  });
  if (data) {
    if (data?.sales?.getDashboardSalesData?.error) {
      console.log("DASHBOARD data query error", data?.sales?.getDashboardSalesData?.error)
    }
    if (data?.sales?.getDashboardSalesData?.data) {
      dashboardData = data?.sales?.getDashboardSalesData?.data
      console.log("Dashboard Data", dashboardData)
    }
  }
  return <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="Dashboard" subtitle="welcome to your dashboard" />
    </FlexBetween>
    <Box
      mt="20px"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="160px"
      gap="20px"
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      {/* Row 1 */}
      <StatBox
        title="Sales This Year"
        value={dashboardData && dashboardData.totalYearlySales}
        increase="N/A"
        description="Since last year"
        icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
      />
      <StatBox
        title="Sales This Month"
        value={dashboardData && dashboardData.totalMonthlySales}
        increase="N/A"
        description="Since last month"
        icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
      />
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        borderRadius="0.55rem"
      >
        <OverviewChart view="sales" isDashboard={true} />
      </Box>
      <StatBox
        title="Sales this week"
        value={dashboardData && dashboardData.totalWeeklySales}
        increase="N/A"
        description="Since last week"
        icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
      />
      <StatBox
        title="Sales today"
        value={dashboardData && dashboardData.totalDailySales}
        increase="N/A"
        description="Since yesterday"
        icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        {/* Row 2 */}
        <Box
        gridColumn="span 8"
        gridRow="span 3"
        >
          <Sales isDashboard={true}/>
        </Box>
        <Box
        gridColumn="span 4"
        gridRow="span 3"
        backgroundColor={theme.palette.background.alt}
        p="1.4rem"
        borderRadius="0.55rem"
        mt="2.5rem"
        >
          <Header title="By Category" subtitle="" />
          <Typography variant='h6' sx={{color:theme.palette.secondary[100]}}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} filterType="YEARLY"/>
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}}>
            Breakdown 
          </Typography>
        </Box>
    </Box>

  </Box>
}

export default Dashboard
