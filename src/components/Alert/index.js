import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from '../Icon';
import Button from '../Button';
import { Spinner } from '../Spinner';

const StyledTable = styled.div`
  .alert__card {
    border-radius: 2px !important;
    border: none;
    .alert__message {
      font-size: 16px !important;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.2px;
      color: #707070 !important;
    }
    .alert__type {
      span {
        text-transform: capitalize;
      }
    }
    p {
      font-size: 15px;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.2px;
      color: #242424;
    }
    h4 {
      font-size: 18px;
      font-weight: 900;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.3px;
      color: #242424;
      b {
        font-size: 15px !important;
        font-weight: 500 !important;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        float: right;
        color: #8c8c8c;
      }
    }
  }
`;

const Alert = ({
  isLoading,
  onPageChange,
  onClickRow,
  onPageSizeChange,
  pageSize,
  currentPage,
  showPagination,
  totalPages,
  hasError,
  onRefresh,
  errorText,
  data,
  columns,

  ...rest
}) => {
  return (
    <StyledTable {...{}}>
      <div className="Table__Wrapper">
        <div
          className="Table"
          loading={isLoading}
          columns={columns}
          resizable={false}
          pages={totalPages}
          page={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          LoadingComponent={({ isLoading, loadingText }) =>
            isLoading ? <LoadingOverlay>{loadingText}</LoadingOverlay> : null
          }
          onPageSizeChange={onPageSizeChange}
          showPagination={showPagination}
          {...rest}
        >
          {data.map((alert, i) => (
            <div className="alert__card card mb-2" key={i.toString()}>
              <div className="card-body">
                <h4>
                  {alert.subject}{' '}
                  <b className="alert__date">
                    {moment(alert.created_at).format('hh:mm a - MMM DD, YYYY')}
                  </b>
                </h4>
                <p className="alert__type">
                  <b>Type</b>: <span>{alert.type}</span>
                </p>
                <p>
                  <b>To</b>: <span>{alert.to.first_name} {alert.to.last_name}</span>
                </p>
                <hr />
                <p className="alert__message">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
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

export default Alert;
