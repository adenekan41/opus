import React from "react";
import Table from "../../../../components/Table";
import Avatar from "../../../../components/Avatar";
import TableActions from "../../../../components/Table/TableActions";

const customers_columns = data => {
  let { onDelete, countries, onEdit } = data;
  return [
    {
      Header: "",
      accessor: "",
      id: "customer_initals",
      Cell: ({ original: { first_name, last_name } }) => {
        return (
          <Avatar
            isRound
            size="38px"
            photo_url=""
            color="#ff9901"
            bgColor="rgba(255,153,1,.15)"
            initial={`${first_name[0]}${last_name[0]}`}
          />
        );
      },
    },
    {
      Header: "First Name",
      accessor: "first_name",
      id: "first_name",
    },
    {
      Header: "Middle Name",
      id: "other_name",
      Cell: ({ original }) => <span>{original.other_name ? original.other_name : "-"}</span>,
    },
    {
      Header: "Last Name",
      accessor: "last_name",
      id: "last_name",
    },
    {
      Header: "Location",
      id: "location",
      Cell: ({ original }) => {
        let country = countries.find(
          country => country.value === original.country
        );
        return (
          <span>
            {original.city}, {country && country.label}
          </span>
        );
      },
    },

    {
      Header: "Phone",
      id: "phone_number",
      Cell: ({ original }) => <span>{original.phone_number}</span>,
    },
    {
      Header: "Company",
      accessor: "organisation_name",
      id: "organisation_name",
      Cell: ({ original }) => (
        <span>
          {original.organisation_name ? original.organisation_name : "-"}
        </span>
      ),
    },
    {
      Header: "",
      accessor: "",
      id: "actions",
      Cell: ({ original }) => (
        <TableActions
          model="customer"
          placement="bottom"
          onEdit={() => onEdit(original)}
          onDelete={() => onDelete(original)}
        />
      ),
    },
  ];
};

const CustomerTable = ({
  countries,
  pageSize,
  currentPage,
  totalPages,
  onClickRow,
  hasError,
  onRefresh,
  customers,
  onPageChange,
  onPageSizeChange,
  onFetchData,
  onCustomerEdit,
  onCustomerDelete,
}) => {
  return (
    <Table
      mt="50px"
      resized={[
        {
          id: "contact_initals",
          value: 30,
        },
        {
          id: "middle_name",
          value: 130,
        },
        {
          id: "location",
          value: 200,
        },
        {
          id: "company",
          value: 120,
        },
        {
          id: "phone_number",
          value: 250,
        },
        {
          id: "actions",
          value: 100,
        },
      ]}
      onClickRow={onClickRow}
      hasError={hasError}
      onRefresh={onRefresh}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSize={pageSize}
      currentPage={currentPage}
      showPagination={customers && customers.length > pageSize}
      totalPages={totalPages}
      onFetchData={onFetchData}
      data={customers}
      noDataText="No Customers Added Yet"
      errorText="Oops! There was an issue fetching your customers"
      columns={customers_columns({
        onDelete: onCustomerDelete,
        onEdit: onCustomerEdit,
        countries,
      })}
    />
  );
};

export default CustomerTable;
