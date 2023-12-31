import React, { useState, useEffect } from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {
    ChevronLeft,
    HomeOutlined,
    ShoppingCartOutlined,
    ReceiptLongOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    TrendingUpOutlined,
    PieChartOutline,
    AdminPanelSettingsOutlined,
    CalendarMonthOutlined,
    ChevronRightOutlined,
    SettingsOutlined,
    BadgeOutlined,
    AddCardOutlined,
    BarChartOutlined,
    CorporateFareOutlined,
    PasswordOutlined,
    VerifiedOutlined

} from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from "./FlexBetween";
import profileImage from "../assets/userImage.png";

const NavItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Products Domain",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Add-Products",
        icon: <AddCardOutlined />
    },
    {
        text: "Category",
        icon: <AddCardOutlined />
    },
    {
        text: "Sales Details",
        icon: null
    },
    {
        text: "Sales",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "Product-Sales",
        icon: <BarChartOutlined />
    },
    {
        text: "Breakdown",
        icon: <PieChartOutline />
    },
    {
        text: "Staff Domain",
        icon: null
    },
    {
        text: "Staffs",
        icon: <BadgeOutlined />
    },
    {
        text: "Add-Staff",
        icon: <AddCardOutlined />
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    },
    {
        text: "Account",
        icon: null
    },
    {
        text: "Profile",
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: "Organization",
        icon: <CorporateFareOutlined />
    },
    {
        text: "Update-Password",
        icon: <PasswordOutlined />
    },

];

const Sidebar = ({
    user,
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])
    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        }
                    }}
                >

                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        LogiCloud
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {NavItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (<Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                        { text }
                                    </Typography>);
                                }
                                const lowerText = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton onClick={()=>{
                                            navigate(`/${lowerText}`);
                                            setActive(lowerText);
                                        }}
                                        sx={{
                                            backgroundColor:active === lowerText ? theme.palette.secondary[300] : "transparent",
                                            color:active === lowerText ? theme.palette.primary[600] : theme.palette.secondary[100],
                                        }}
                                        >
                                            <ListItemIcon
                                            sx={{ml:"1rem",
                                            color:active === lowerText ? theme.palette.primary[600] : theme.palette.secondary[200],
                                        }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lowerText && (
                                                <ChevronRightOutlined 
                                                sx={{ml:"auto"}}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                            <ListItem disablePadding>
                                        <ListItemButton onClick={()=>{
                                            navigate("/verify");
                                            setActive("verify");
                                        }}
                                        sx={{
                                            backgroundColor:active === "verify" ? theme.palette.secondary[300] : "transparent",
                                            color:active === "verify" ? theme.palette.primary[600] : theme.palette.secondary[100],
                                        }}
                                        >
                                            <ListItemIcon
                                            sx={{ml:"1rem",
                                            color:active === "verify" ? theme.palette.primary[600] : theme.palette.secondary[200],
                                        }}
                                            >
                                                <VerifiedOutlined />
                                            </ListItemIcon>
                                            <ListItemText primary={"Verify Account"} />
                                            {active === "verify" && (
                                                <ChevronRightOutlined 
                                                sx={{ml:"auto"}}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                        </List>
                    </Box>
                        {/* User Details
                        <Box position="absolute" bottom="2rem">
                            <Divider />
                            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                                <Box 
                                component="img"
                                alt="profile"
                                src={profileImage}
                                width="40px"
                                borderRadius="50%"
                                sx={{objectFit:"cover"}}
                                />
                                        <Box textAlign="left">
                                            <Typography fontWeight="bold" fontSize="0.9rem" sx={{color:theme.palette.secondary[100]}}>
                                                {user && "Bishal Regmi"}
                                            </Typography>
                                            <Typography fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}}>
                                                {user && "Admin"}
                                            </Typography>
                                        </Box>
                                        <SettingsOutlined sx={{color:theme.palette.secondary[300],fontSize:"25px"}}/>
                               
                            </FlexBetween>
                        </Box> */}
                </Drawer>
            )}
        </Box>
    )
}

export default React.memo(Sidebar);
