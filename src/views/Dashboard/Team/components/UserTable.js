import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';
import { setProfilePicture } from "../../../../helpers/functions";

const user_columns = (onUserEdit, onUserDelete) => [
  {
    Header: '',
    accessor: '',
    id: 'contact_initals',
    Cell: ({ original: { first_name, last_name, profile_picture } }) => {
      return (
        <Avatar
          isRound
          size="38px"
          photo_url={setProfilePicture(profile_picture)}
          color="#ff9901"
          bgColor="rgba(255,153,1,.15)"
          initial={first_name && last_name ? `${first_name[0]}${last_name[0]}` : `U`}
        />
      );
    },
  },
  {
    Header: 'First Name',
    Cell: ({ original }) => (
      <span>
        {original.first_name || "-"}
      </span>
    ),
    id: 'first_name',
  },
  {
    Header: 'Middle Name',
    Cell: ({ original }) => (
      <span>
        {original.other_name || "-"}
      </span>
    ),
    id: 'middle_name',
  },

  {
    Header: 'Last Name',
    Cell: ({ original }) => (
      <span>
        {original.last_name || "-"}
      </span>
    ),
    id: 'last_name',
  },
  {
    Header: 'Email',
    Cell: ({ original }) => (
      <span>
        {original.email || "-"}
      </span>
    ),
    id: 'email',
  },
  {
    Header: 'Phone',
    Cell: ({ original }) => (
      <span>
        {original.phone_number || "-"}
      </span>
    ),
    id: 'phone_number',
  },
  
  {
    Header: '',
    accessor: '',
    id: 'actions',
  
    Cell: ({ original }) => (
      <TableActions
        model="user"
        placement="bottom"
        onEdit={() => onUserEdit(original)}
        onDelete={() => onUserDelete(original)}
      />
    ),
  },
];

const UserTable = ({
  isLoading,
  pageSize,
  currentPage,
  totalPages,
  onClickRow,
  hasError,
  onRefresh,
  teams,
  onPageChange,
  onPageSizeChange,
  onFetchData,
  onUserEdit,
  onUserDelete,
}) => {
  return (
    <Table
      resized={[
        {
          id: 'contact_initals',
          value: 80,
        },
        
        {
          id: 'actions',
          value: 80,
        },
      ]}
      onClickRow={onClickRow}
      isLoading={isLoading}
      hasError={hasError}
      onRefresh={onRefresh}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSize={pageSize}
      currentPage={currentPage}
      showPagination={teams && teams.length > pageSize}
      totalPages={totalPages}
      onFetchData={onFetchData}
      data={teams}
      noDataText="No Team Added Yet"
      errorText="Oops! There was an issue fetching your users"
      columns={user_columns(onUserEdit, onUserDelete)}
    />
  );
};

export default UserTable;

UserTable.defaultProps = {
  teams: [
    {
      firstName: 'Faith',
     
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'pending',
   
      photo_url:
        'https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1',
    },
    {
      firstName: 'Faith',
     
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'pending',
   
      photo_url:
        'https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1',
    },
    {
      firstName: 'Faith',
     
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'pending',
   
      photo_url:
        'https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1',
    },
    {
      firstName: 'Faith',
     
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'pending',
   
      photo_url:
        'https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1',
    },
    {
      firstName: 'Faith',
    
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'assigned',
   
      photo_url:
        'https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1',
    },
  ],
};
