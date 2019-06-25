
import React from "react";
import Table from "../../../../components/Table";

export default function AssetTable({
    data,
    model,
    pageSize,
    totalPages,
    onClickRow,
    onEdit,
    onDelete,
    currentPage,
    columns
  }) {
    return (
      <Table
        mt="30px"
        resized={[
          {
            id: "name",
            value: "20%",
          },
          {
            id: "actions",
            value: "80%",
          },
        ]}
        height="100%"
        onClickRow={onClickRow}
        pageSize={pageSize}
        currentPage={currentPage}
        showPagination={data && data.length > pageSize}
        totalPages={totalPages}
        data={data}
        noDataText={`No ${model} Added Yet`}
        errorText="Oops! There was an issue fetching your assets"
        columns={columns(model, {
          onEdit,
          onDelete,
        })}
      />
    );
  };