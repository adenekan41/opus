import React from "react";
import Table from "../../../../../components/Table";
import Button from "../../../../../components/Button";
import { Icon } from "../../../../../components/Icon";

const advisorymodules_columns = data => {
  let { onDelete } = data;
  return [
    {
      Header: "",
      accessor: "",
      id: "remove",
      Cell: ({ original }) => {
        return (
          <Button
            css={`
              height: 24px;
              padding: 0 10px;
              background-color: #fafafa;
            `}
            kind="ghost"
            onClick={() => onDelete(original.id)}
          >
            <Icon name="trash" color="#8c8c8c" />
          </Button>
        );
      },
    },
    {
      Header: "Advisory Module",
      accessor: "name",
      id: "name",
    },
  ];
};

const CustomerAdvisoryModuleTable = ({
  pageSize,
  currentPage,
  totalPages,
  onClickRow,
  hasError,
  onRefresh,
  deleteModule,
  advisorymodules,
  onPageChange,
  onPageSizeChange,
  onFetchData,
}) => {
  return (
    <Table
      mt="50px"
      resized={[
        {
          id: "remove",
          value: 50,
        },

        {
          id: "name",
          value: 250,
        },
      ]}
      onClickRow={onClickRow}
      hasError={hasError}
      onRefresh={onRefresh}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSize={pageSize}
      currentPage={currentPage}
      showPagination={advisorymodules && advisorymodules.length > pageSize}
      totalPages={totalPages}
      onFetchData={onFetchData}
      data={advisorymodules}
      noDataText="No Modules Added Yet"
      errorText="Oops! There was an issue fetching your Modules"
      columns={advisorymodules_columns({
        onDelete: deleteModule,
      })}
    />
  );
};

export default CustomerAdvisoryModuleTable;
