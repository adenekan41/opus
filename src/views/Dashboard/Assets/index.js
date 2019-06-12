import React, { Component } from "react";
import { Box, Flex } from "rebass";
import styled from "styled-components";
import Button from "../../../components/Button";
import SearchInput from "../../../components/SelectSearchInput";
import Card from "../../../components/Card";
import Modal, { ToggleModal } from "../../../components/Modal";
import Input from "../../../components/Input";
import { Icon } from "../../../components/Icon";
import Table from "../../../components/Table";
import TableActions from "../../../components/Table/TableActions";

const assets_columns = (name, data) => {
  let { onContactEdit, onContactDelete } = data;
  return [
    {
      Header: name,
      Cell: ({ original }) => <span>{original.first_name || "-"}</span>,
      id: "name",
    },
    {
      Header: "",
      accessor: "",
      id: "actions",
      Cell: ({ original }) => (
        <TableActions
          model="asset"
          placement="bottom"
          onDelete={() => onContactDelete(original)}
          onEdit={() => onContactEdit(original)}
        />
      ),
    },
  ];
};

const AssetManagementStyle = styled.div`
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

const AssetTable = ({
  data,
  model,
  pageSize,
  totalPages,
  onClickRow,
  onEdit,
  onDelete,
  currentPage,
}) => {
  return (
    <Table
      mt="30px"
      resized={[
        {
          id: model,
          value: 80,
        },
      ]}
      onClickRow={onClickRow}
      pageSize={pageSize}
      currentPage={currentPage}
      showPagination={data && data.length > pageSize}
      totalPages={totalPages}
      data={data}
      noDataText="No Asset Added Yet"
      errorText="Oops! There was an issue fetching your assets"
      columns={assets_columns(model, {
        onEdit,
        onDelete,
      })}
    />
  );
};

export default class AssetManagement extends Component {
  state = {
    assets: [{ name: "Crop", count: 5, data: [] }],
    assetType: "",
    selectedAsset: { data: [] },
  };

  componentDidMount() {
    const { assets } = this.state;
    this.setState({
      selectedAsset: assets[0],
    });
  }

  handleAssetTypeChange = e => {
    this.setState({
      assetType: e.target.value,
    });
  };

  handleAssetTypeSubmit = (e, closeModal) => {
    e.preventDefault();
    const { assetType } = this.state;
    this.setState(
      ({ assets }) => ({
        assets: [...assets, { name: assetType, count: 0 }],
      }),
      () => {
        closeModal();
      }
    );
  };

  render() {
    const { selectedAsset } = this.state;

    return (
      <Box py="40px" px="40px">
        <AssetManagementStyle>
          <div className="row">
            <div className="col-md-4">
              <Card className="asset-list-section">
                <SearchInput placeholder="Search contacts" mb="8px" />
                <ul className="assets-list">
                  {this.state.assets.map((asset, i) => (
                    <li className="asset-item" key={i}>
                      <p className="asset-item-name">{asset.name}</p>
                      <div className="asset-item-count">{asset.count}</div>
                    </li>
                  ))}
                </ul>
                <div className="footer">
                  <ToggleModal>
                    {(show, openModal, closeModal) => (
                      <>
                        <Button kind="green" width="100%" onClick={openModal}>
                          <Icon name="add" color="#ffffff" />
                          &nbsp;&nbsp;Add asset
                        </Button>
                        <Modal
                          size="medium"
                          showModal={show}
                          onCloseModal={closeModal}
                          heading="Add Asset Type"
                        >
                          <form
                            onSubmit={e =>
                              this.handleAssetTypeSubmit(e, closeModal)
                            }
                          >
                            <Input
                              label="Asset type"
                              onChange={this.handleAssetTypeChange}
                              value={this.state.assetType}
                              type="text"
                            />
                            <Flex
                              mt={3}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box width="48.5%">
                                <Button
                                  type="button"
                                  kind="gray"
                                  onClick={closeModal}
                                  block
                                >
                                  Cancel
                                </Button>
                              </Box>
                              <Box width="48.5%">
                                <Button type="submit" kind="orange" block>
                                  Add Asset
                                </Button>
                              </Box>
                            </Flex>
                          </form>
                        </Modal>
                      </>
                    )}
                  </ToggleModal>
                </div>
              </Card>
            </div>
            <div className="col-md-8">
              <div className="table-section">
                <div className="row">
                  <div className="col-md-8 col-xs-12 col-sm-8 col-lg-8">
                    <SearchInput
                      placeholder={`Search ${selectedAsset.name}`}
                      mb="8px"
                    />
                  </div>
                  <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4">
                    <Button kind="green" width="100%">
                      Add {selectedAsset.name}
                    </Button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <AssetTable
                      model={selectedAsset.name}
                      data={selectedAsset.data || []}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AssetManagementStyle>
      </Box>
    );
  }
}
