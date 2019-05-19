import React from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import { Icon } from '../Icon';
import Button from '../Button';
import { Spinner } from '../Spinner';
import { sharedProps } from '../Avatar';

const StyledTable = styled.div`
  height: calc(100vh - 128px);
  overflow: auto;
  background: #f5f6fa;
  ${sharedProps};

  .Table {
    background: transparent !important;
  }

  .rt-noData {
    top: 75% !important;
    background: transparent !important;
  }

  .Table__Wrapper {
    overflow: auto;
    position: relative;
  }

  .rt-td {
    text-align: center !important;
    justify-content: center !important;
  }

  .Table__Row {
    border-bottom: 4px solid #f5f6fa !important;
    border-radius: 4px !important;
    background: #ffffff !important;
    ${props => props.tableRowCSS};
  }

  .Table__Head {
    background: transparent !important;
    border-bottom: none !important;
    ${props => props.tableHeadCSS};
  }
  ${sharedProps};
`;

const Table = ({
  isLoading,
  onPageChange,
  onClickRow,
  onPageSizeChange,
  pageSize,
  currentPage,
  showPagination,
  totalPages,
  tableRowStyle,
  tableRowCSS,
  tableHeadCSS,
  hasError,
  onRefresh,
  errorText,
  data,
  columns,
  tableWrapperCSS,
  ...rest
}) => {
  const ReactTableFixedColumns = withFixedColumns(ReactTable);
  return (
    <StyledTable {...{ tableRowCSS, tableHeadCSS, tableWrapperCSS, ...rest }}>
      <div className="Table__Wrapper">
        <ReactTableFixedColumns
          style={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: 4,
          }}
          getTbodyProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                border: 'none',
              },
            };
          }}
          getTheadProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                boxShadow: 'none',
                borderBottom: '1px solid rgb(234, 239, 240)',
                textTransform: 'uppercase',
              },
              className: 'Table__Head',
            };
          }}
          getPaginationProps={() => {
            return {
              style: {
                boxShadow: 'none',
                borderTop: '1px solid rgb(234, 239, 240)',
              },
            };
          }}
          getTdProps={() => {
            return {
              style: {
                padding: '12px 24px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
              },
            };
          }}
          getTheadThProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                fontWeight: 'normal',
                padding: '16px 24px',
                color: 'rgba(36, 36, 36, .5)',
                fontSize: 12,
                width: 'auto',
                border: 'none',
                textAlign: 'left',
              },
            };
          }}
          getTrGroupProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                fontSize: 14,
                color: '#242424',
                userSelect: 'none',
                ...tableRowStyle,
              },
              onClick: onClickRow,
              className: 'Table__Row',
            };
          }}
          className="Table"
          data={data}
          loading={isLoading}
          columns={columns}
          resizable={false}
          minRows={1}
          pages={totalPages}
          page={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          LoadingComponent={({ isLoading, loadingText }) =>
            isLoading ? <LoadingOverlay>{loadingText}</LoadingOverlay> : null
          }
          onPageSizeChange={onPageSizeChange}
          showPagination={showPagination}
          //   PaginationComponent={props => {
          //     console.log(props);
          //     return <div />;
          //   }}
          {...rest}
        />
        {hasError && (
          <ErrorOverlay onRefresh={onRefresh}>{errorText}</ErrorOverlay>
        )}
      </div>
    </StyledTable>
  );
};

const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  opacity: 1;
  z-index: 2;
  pointer-events: all;
`;

const LoadingOverlay = ({ children }) => (
  <StyledLoading>
    <Spinner size={32} />
    <p style={{ marginTop: '12px', color: '#495566' }}>{children}</p>
  </StyledLoading>
);

const StyledError = styled(StyledLoading)`
  /* background-color: white; */
`;

const ErrorOverlay = ({ onRefresh, children }) => (
  <StyledError>
    <Icon size={48} color="ff5a5f" name="cancel" />
    <p style={{ marginTop: '24px', color: '#e85257', textAlign: 'center' }}>
      {children}
    </p>
    <Button size="small" marginTop="16px" onClick={onRefresh}>
      Refresh
    </Button>
  </StyledError>
);

export default Table;
