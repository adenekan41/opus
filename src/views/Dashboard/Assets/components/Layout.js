
import styled from "styled-components";

export const AssetManagementStyle = styled.div`
.asset-list-section {
  height: calc(100vh - 80px);

  .assets-list {
    list-style: none;
    margin: 0;
    padding: 0;

    .asset-item {
      display: flex;
      align-content: center;
      justify-content: space-between;
      border-bottom: 1px solid #efefef;
      padding: 12px 32px;
      transition: all 0.3s;

      &.active {
        background-color: #e5e5e5;
      }

      &:hover {
        cursor: pointer;
        background-color: #e5e5e5;
      }

      .asset-item-count {
        padding: 0 8px;
        border-radius: 3px;
        border: solid 1px #eff0f3;
        background-color: #f9fafb;
        color: #8c8c8c;
        width: 40px;
        text-align: center;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      p,
      div {
        padding: 0;
        margin: 0;
      }
    }
  }
  .footer {
    position: absolute;
    width: calc(100% - 32px);
    bottom: 0;
    padding: 16px 32px;
  }
}

.table-section {
  height: calc(100vh - 80px);
}
`;