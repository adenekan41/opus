import styled, {css} from 'styled-components';

export const TableRowItem = styled.div`
  color: #8c8c8c;
  padding: 16px;
  font-size: 14px;
  width: ${props => props.width || '25%'};
  @media (max-width: ${props => props.hideAt}) {
    display: none;
  }

  ${props =>
    props.shouldTruncate &&
    css`
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `}
`;

export const HomeContainer = styled.div`
  padding: 40px;

  .card-icon__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 46px;
    height: 46px;
    background-color: rgba(41, 203, 152, 0.1);
    border-radius: 50%;
  }

  .data-summary__table {
    margin-bottom: 24px;
    &__header {
      padding: 16px;
      border-bottom: 1px solid #e8e8e8;

      a {
        text-decoration: none;
        color: #ff9901;
      }
    }
    &__body {
      &__item {
        padding: 16px;
        border-bottom: 1px solid #e8e8e8;
      }
    }
  }
`;
