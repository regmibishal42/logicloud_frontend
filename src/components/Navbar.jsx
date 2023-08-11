import React from 'react';
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDown,
    LightModeRounded,
} from "@mui/icons-material";
import FlexBetween from './FlexBetween';
import { useDispatch } from "react-redux";
import { setMode } from "../state/index";
// import userImage from "../assets";
import { useTheme, AppBar, Toolbar,IconButton,InputBase } from "@mui/material"

const Navbar = ({
    user,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    return <AppBar
        sx={{
            position: "static",
            background: "none",
            boxShadow: "none"
        }}
    >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Left Side of NavBar */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
            
            <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
            >
                <InputBase placeholder="Search ..." />
                <IconButton>
                    <Search />
                </IconButton>
                </FlexBetween>
            </FlexBetween>

            {/* Right Side of the NavBar */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={()=>dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlined sx={{fontSize:"25px"}}/>
                    ): (<LightModeRounded sx={{fontSize:"25px"}}/>)}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{fontSize:"25px"}}/>
                </IconButton>
                {/* User Information */}
            </FlexBetween>
        </Toolbar>
    </AppBar>
}

export default Navbar;
