import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as AdminAPI from "../../api/AdminAPI";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Box } from "@mui/material";

const AccountAdmin = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mylessonData"],
    queryFn: AdminAPI.getUsers,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const rows = data.map((item, index) => ({
    id: index + 1,
    avatar: item?.imageUrl,
    name: item?.name,
    email: item?.email,
    phoneNumber: item?.phoneNumber || "null",
    dateOfBirth: moment(item?.dateOfBirth?.split("T")[0]).format("DD-MM-YYYY"),
    createdAt: moment(item?.createdAt?.split("T")[0]).format(
      "DD-MM-YYYY, h:mm:ss a"
    ),
    isPremium: item?.isPremium ? "Premium" : "Thường",
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
    { field: "phoneNumber", headerName: "Số điện thoại", width: 130 },
    { field: "dateOfBirth", headerName: "Ngày sinh", width: 150 },
    { field: "createdAt", headerName: "Ngày tạo tài khoản", width: 150 },
    { field: "isPremium", headerName: "Loại tài khoản", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 100,
    },
  ];

  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <Box className="h-[700px]" display="grid">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        onRowClick={(e) => handleClick(e)}
      />
    </Box>
  );
};

export default AccountAdmin;
