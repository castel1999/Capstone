import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const MyLessonContent = ({ data }) => {
  const rows = data.map((item, index) => ({
    id: index + 1,
    avatar: item.avatar,
    tutorName: item.tutorName,
    subject: item.subject,
    price: item.price,
  }));

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          className="size-11 object-cover rounded-full items-center"
        />
      ),
    },
    { field: "tutorName", headerName: "Tutor Name", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
  ];

  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <div className="h-[540px]">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        onRowClick={(e) => handleClick(e)}
      />
    </div>
  );
};

export default MyLessonContent;
