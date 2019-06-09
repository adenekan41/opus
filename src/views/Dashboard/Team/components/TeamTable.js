import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';
import TeamForm from './TeamForm';

const team_columns = (onUserEdit, onUserDelete) => [
  {
    Header: '',
    accessor: '',
    id: 'contact_initals',
    Cell: ({ original: { first_name, last_name } }) => {
      return (
        <Avatar
          isRound
          size="38px"
          photo_url=""
          color="#ff9901"
          bgColor="rgba(255,153,1,.15)"
          initial={first_name && last_name ? `${first_name[0]}${last_name[0]}` : `U`}
        />
      );
    },
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
    id: 'first_name',
  },
  {
    Header: 'Middle Name',
    accessor: 'middle_name',
    id: 'middle_name',
  },

  {
    Header: 'Last Name',
    accessor: 'last_name',
    id: 'last_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
    id: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'phone_number',
    id: 'phone_number',
  },
  
  {
    Header: '',
    accessor: '',
    id: 'actions',
  
    Cell: ({ original }) => (
      <TableActions
        model="user"
        data={original}
        onEdit={onUserEdit}
        onDelete={onUserDelete}
        editModalHeading="Edit User"
        renderEditForm={({ data, onEdit, closeModal }) => (
          <TeamForm
            {...data}
            isAdd={false}
            onsubmit={onEdit}
            onCancel={closeModal}
          />
        )}
      />
    ),
  },
];

const TeamTable = ({
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
      columns={team_columns(onUserEdit, onUserDelete)}
    />
  );
};

export default TeamTable;

TeamTable.defaultProps = {
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
