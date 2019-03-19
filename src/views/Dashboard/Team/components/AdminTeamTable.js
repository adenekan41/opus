import React from 'react';
import moment from 'moment';
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
    Cell: ({ original: { first_name, last_name } }) => {
      return (
        <Avatar
          isRound
          size="38px"
          photo_url=""
          color="#ff9901"
          bgColor="rgba(255,153,1,.15)"
          initial={
            first_name && last_name ? `${first_name[0]}${last_name[0]}` : `U`
          }
        />
      );
    },
  },
  {
    Header: 'FullName',
    Cell: ({ original: { first_name, last_name } }) => {
      return (
        <span>
          {first_name && last_name ? `${first_name} ${last_name}` : 'N/A'}
        </span>
      );
    },
    id: 'FullName',
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
    Cell: ({ original: { created_at } }) => (
      <span>{moment(created_at).format('DD MMMM, YYYY')}</span>
    ),
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
        renderEditForm={({ closeModal }) => (
          <TeamForm
            {...original}
            isAdd={false}
            onSubmit={onTeamEdit}
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
