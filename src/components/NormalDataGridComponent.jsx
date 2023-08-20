import React from 'react';
import {
 GridToolbarDensitySelector,
 GridToolbarContainer,
 GridToolbarExport,
 GridToolbarColumnsButton
} from "@mui/x-data-grid";
import FlexBetween from "../components/FlexBetween";


const NormalDataGridComponent = () => {
  return <GridToolbarContainer>
  <FlexBetween width="100%">
      <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
      </FlexBetween>
  </FlexBetween>
</GridToolbarContainer>
}

export default NormalDataGridComponent
