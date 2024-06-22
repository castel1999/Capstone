import React from "react";
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Box, Pagination as MuiPagination, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as AdminAPI from "../../api/AdminAPI";
import { IoEyeOutline } from "react-icons/io5";

const TutorRequestAdmin = () => {
  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getTutorRegisterList"],
    queryFn: AdminAPI.getTutorRegisterList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const rows = data?.value?.map((item, index) => ({
    id: index + 1,
    // tutorId: item?.name,
    avatar: item?.imageUrl,
    name: item?.name,
    email: item?.email,
    status: item?.status,
  }));

  const columns = [
    {
      field: "avatar",
      headerName: "",
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          className="size-11 object-cover rounded-full items-center"
        />
      ),
    },
    { field: "name", headerName: "Tên", width: 200 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "status", headerName: "Trạng thái", width: 100 },
    {
      field: "details",
      headerName: "Chi tiết",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            navigate(`/dashboard/tutor-request-detail`, {
              state: params.row,
            })
          }
        >
          <IoEyeOutline className="size-6" />
        </Button>
      ),
    },
  ];

  function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <MuiPagination
        color="primary"
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }

  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="font-bold text-3xl">Quản lý đăng ký giảng viên</div>
      <Box className="h-[650px]" display="grid">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50, 100]}
          localeText={{
            toolbarColumns: "Cột",
            toolbarFilters: "Bộ lọc",
            toolbarDensity: "Mật độ",
            toolbarExport: "Tải xuống",
          }}
          slots={{ toolbar: GridToolbar, pagination: CustomPagination }}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
        />
      </Box>
    </div>
  );
};

export default TutorRequestAdmin;
