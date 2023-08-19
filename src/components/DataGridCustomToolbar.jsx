import React from 'react';
import {Search} from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
 GridToolbarDensitySelector,
 GridToolbarContainer,
 GridToolbarExport,
 GridToolbarColumnsButton
} from "@mui/x-data-grid";
import FlexBetween from "../components/FlexBetween";

const DataGridCustomToolbar = ({searchInput,setSearchInput,setSearch}) => {
  return <GridToolbarContainer>
    <FlexBetween width="100%">
        <FlexBetween>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </FlexBetween>
        <TextField 
        label="search..."
        variant='standard'
        sx={{mb:"0.5rem",width:"15rem"}}
        value={searchInput}
        onChange={(e)=>setSearchInput(e.target.value)}
        InputProps={{
            endAdornment:(
                <InputAdornment position='end'>
                    <IconButton onClick={()=>{
                        setSearch(searchInput)
                        console.log("Search Clicked",searchInput)
                        setSearchInput("")
                    }}>
                        <Search />
                    </IconButton>
                </InputAdornment>
            )
        }}
        />
       
    </FlexBetween>
  </GridToolbarContainer>
}

export default DataGridCustomToolbar
