import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import Button from '../../../../components/Button';
import TableActions from '../../../../components/Table/TableActions';

const team_columns = (onTeamEdit, onTeamDelete) => [
  {
    Header: '',
    accessor: '',
    id: 'contact_initals',
    Cell: ({ original: { firstName, lastName } }) => {
      return (
        <Avatar
          isRound
          size="38px"
          photo_url=""
          color="#ff9901"
          bgColor="rgba(255,153,1,.15)"
          initial={`${firstName[0]}${lastName[0]}`}
        />
      );
    },
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    id: 'firstName',
  },

  {
    Header: 'Last Name',
    accessor: 'lastName',
    id: 'lastName',
  },
  {
    Header: 'Email',
    accessor: 'email',
    id: 'email',
  },
  {
    Header: 'Date Added',
    accessor: 'date',
    id: 'date',
  },
  {
    Header: 'Status',
    accessor: 'status',
    id: 'status',
      Cell: ({ original: {status} }) => (
      <Button
        background={status === 'pending' ? '#ffc502' : '#29cb98'}
        height="25px"
       
      >{status}</Button>
    ),
  },
  
  {
    Header: '',
    accessor: '',
    id: 'actions',
  
    Cell: ({ original }) => (
      <TableActions
        model="contact"
        data={original}
        onEdit={onTeamEdit}
        onDelete={onTeamDelete}
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
  onTeamEdit,
  onTeamDelete,
}) => {
  return (
    <Table
      mt="50px"
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
      errorText="Oops! There was an issue fetching your contacts"
      columns={team_columns(onTeamEdit, onTeamDelete)}
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
