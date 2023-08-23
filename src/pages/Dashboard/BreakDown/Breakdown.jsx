import React, { useState } from 'react'
import { Box, useTheme,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import Header from '../../../components/Header';
import BreakdownChart from '../../../components/BreakdownChart';

const Breakdown = () => {
    const [filterType, setFilterType] = useState("YEARLY")
    return <Box m="1.5rem 2.5rem">
        <Header title="Breakdown" subtitle="Breakdown of sales by category" />
        <Box mt="40px" height="75vh">
            <Box>
                <FormControl sx={{ minWidth: "50%" }}>
                    <InputLabel>Data Filter Type</InputLabel>
                    <Select
                        name="filterType"
                        value={filterType}
                        onChange={(e)=>setFilterType(e.target.value)}
                        required
                        sx={{ width: '50%',mt:"5px" }} // Adjust the width as needed
                    >
                            <MenuItem value={"YEARLY"}>YEARLY</MenuItem>
                            <MenuItem value={"MONTHLY"}>MONTHLY</MenuItem>
                            <MenuItem value={"WEEKLY"}>WEEKLY</MenuItem>
                            <MenuItem value={"DAILY"}>DAILY</MenuItem>
                     
                    </Select>
                </FormControl>
            </Box>
            <BreakdownChart filterType={filterType} />
        </Box>
    </Box>
}

export default Breakdown
