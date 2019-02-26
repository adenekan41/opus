import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';
import TeamForm from './TeamForm';

const Dot = styled.span`
  display: inline-flex;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const admin_team_columns = (onTeamEdit, onTeamDelete) => [
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
    Header: 'FullName',
    Cell: ({ original: { firstName, lastName } }) => {
      return (
        <span>
          {firstName} {lastName}
        </span>
      );
    },
    id: 'firstName',
  },
  {
    Header: 'Email',
    accessor: 'email',
    id: 'email',
  },
  {
    Header: 'Models Permission',
    id: 'models_permission',
    Cell: ({ original: { models_permission } }) => (
      <Flex>
        {models_permission ? (
          <span>
            <Dot color="#70c889" /> YES
          </span>
        ) : (
          <span>
            <Dot color="#f66262" /> NO
          </span>
        )}
      </Flex>
    ),
  },
  {
    Header: 'Messages Permission',
    id: 'messages_permission',
    Cell: ({ original: { messages_permission } }) => (
      <Flex>
        {messages_permission ? (
          <span>
            <Dot color="#70c889" /> YES
          </span>
        ) : (
          <span>
            <Dot color="#f66262" /> NO
          </span>
        )}
      </Flex>
    ),
  },
  {
    Header: 'Date Added',
    accessor: 'date',
    id: 'date',
  },
  {
    Header: '',
    accessor: '',
    id: 'actions',

    Cell: ({ original }) => (
      <TableActions
        model="user"
        data={original}
        onEdit={onTeamEdit}
        onDelete={onTeamDelete}
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

const AdminTeamTable = ({
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
      errorText="Oops! There was an issue fetching your users"
      columns={admin_team_columns(onTeamEdit, onTeamDelete)}
    />
  );
};

export default AdminTeamTable;

AdminTeamTable.defaultProps = {
  teams: [
    {
      firstName: 'Faith',
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      models_permission: true,
      messages_permission: false,
    },
    {
      firstName: 'Faith',
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'pending',
      models_permission: false,
      messages_permission: true,
    },
    {
      firstName: 'Faith',
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'pending',
      models_permission: true,
      messages_permission: false,
    },
    {
      firstName: 'Faith',
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'pending',
      models_permission: false,
      messages_permission: true,
    },
    {
      firstName: 'Faith',
      lastName: 'Odia',
      email: 'faithdoe@gmail.com',
      date: '08 January, 2019',
      status: 'assigned',
      models_permission: true,
      messages_permission: false,
    },
  ],
};
