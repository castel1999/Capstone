import React from "react";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const CustomGridToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton>Cột</GridToolbarColumnsButton>
      <GridToolbarFilterButton>Bộ lọc</GridToolbarFilterButton>
      <GridToolbarDensitySelector>Mật độ</GridToolbarDensitySelector>
      <GridToolbarExport>Xuất file</GridToolbarExport>
    </GridToolbarContainer>
  );
};

export default CustomGridToolbar;
