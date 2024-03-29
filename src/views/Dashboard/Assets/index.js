import React, { Component } from "react";
import { Box, Heading } from "rebass";
import isEqual from "lodash.isequal";
import Card from "../../../components/Card";
import Modal, { Confirm } from "../../../components/Modal";
import SearchInput from "../../../components/Search";
import TableActions from "../../../components/Table/TableActions";
import { getApiErrors, errorCallback } from "../../../helpers/functions";
import toaster from "../../../components/Toaster";
import AssetForm from "./components/AssetForm";
import { AssetManagementStyle } from "./components/Layout";
import CreateAssetButton from "./components/CreateAssetButton";
import AssetTable from "./components/AssetTable";
import { FullScreenSpinner } from "../../../components/Spinner";

const assets_columns = (name, data) => {
  let { onEdit, onDelete } = data;
  return [
    {
      Header: name,
      Cell: ({ original }) => <span>{original.name || "-"}</span>,
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
          onEdit={() => onEdit(original)}
          onDelete={() => onDelete(original)}
        />
      ),
    },
  ];
};

export default class AssetManagement extends Component {
  state = {
    search: "",
    selectedAsset: { data: [] },
    showEditModal: false,
    showDeleteConfirm: false,
    assetToEdit: {},
    assetToDelete: {},
    loading: false,
    apiErrors: {},
    searchLoading: false,
  };

  componentDidMount() {
    const { formattedAssets } = this.props;
    this.setState({
      selectedAsset: formattedAssets[0],
    });
  }

  componentDidUpdate(prevProps) {
    const { formattedAssets: newFormattedAssets } = this.props;
    const { formattedAssets: prevFormattedAssets } = prevProps;

    if (!isEqual(prevFormattedAssets, newFormattedAssets)) {
      this.setState({
        selectedAsset: newFormattedAssets[0],
      });
    }
  }

  setSelectedAsset = asset => {
    this.setState({
      selectedAsset: asset,
    });
  };

  handleSearchChange = value => {
    this.setState({
      search: value,
    });
  };

  handleEditClick = values => {
    this.setState({
      assetToEdit: values,
      showEditModal: true,
      apiErrors: {},
    });
  };

  handleDeleteClick = values => {
    this.setState({
      assetToDelete: values,
      showDeleteConfirm: true,
      apiErrors: {},
    });
  };

  closeEditModal = () => {
    this.setState({ showEditModal: false, apiErrors: null });
  };

  closeDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false });
  };

  setApiErrors = errorPayload => {
    this.setState({
      apiErrors: errorPayload,
    });
  };

  setWeatherStationApiErrors = errorPayload => {
    const { non_field_errors } = errorPayload;
    this.setState({
      apiErrors: non_field_errors && non_field_errors[0],
    });
  };

  onAssetCreate = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    const { selectedAsset } = this.state;
    const payload =
      selectedAsset.name.toLowerCase() === "crop"
        ? {
            ...values,
            is_crop: true,
          }
        : {
            ...values,
            is_country: true,
          };

    this.setState({
      loading: true,
    });

    dispatch({ type: actions.CREATE_ASSET, value: payload })
      .then(() => {
        this.setState({
          loading: false,
          apiErrors: null,
        });
        closeModal();
        toaster.success("Asset created successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onAssetEdit = (values, closeModal) => {
    const { dispatch, actions } = this.props;

    this.setState({
      loading: true,
    });

    dispatch({
      type: actions.UPDATE_ASSET,
      value: values,
    })
      .then(() => {
        this.setState({ loading: false, apiErrors: null });
        closeModal();
        toaster.success("Asset updated successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onAssetDelete = (id, closeConfirm) => {
    const { dispatch, actions } = this.props;

    this.setState({
      loading: true,
    });

    dispatch({ type: actions.DELETE_ASSET, value: id })
      .then(() => {
        this.setState({
          loading: false,
        });
        closeConfirm();
        toaster.success("Asset deleted successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onAssetSearch = e => {
    e.preventDefault();
    const { dispatch, actions } = this.props;
    this.setState({
      searchLoading: true,
    });
    dispatch({ type: actions.SEARCH_ASSETS, value: this.state.search })
      .then(() => {
        this.setState({
          search: "",
          searchLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          searchLoading: false,
        });
        errorCallback(error);
      });
  };

  onWeatherStationCreate = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    const { name, id, ...rest } = values;
    const payload = { ...rest, station_name: name };

    this.setState({
      loading: true,
    });

    dispatch({ type: actions.CREATE_WEATHER_STATION, value: payload })
      .then(() => {
        this.setState({
          loading: false,
          apiErrors: null,
        });
        closeModal();
        toaster.success("Weather station created successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setWeatherStationApiErrors);
      });
  };

  onWeatherStationEdit = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    const { name, ...rest } = values;
    const payload = { ...rest, station_name: name };

    this.setState({
      loading: true,
    });

    dispatch({
      type: actions.UPDATE_WEATHER_STATION,
      value: payload,
    })
      .then(() => {
        this.setState({ loading: false, apiErrors: null });
        closeModal();
        toaster.success("Weather station updated successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setWeatherStationApiErrors);
      });
  };

  onWeatherStationDelete = (id, closeConfirm) => {
    const { dispatch, actions } = this.props;

    this.setState({
      loading: true,
    });

    dispatch({ type: actions.DELETE_WEATHER_STATION, value: id })
      .then(() => {
        this.setState({
          loading: false,
        });
        closeConfirm();
        toaster.success("Weather station deleted successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setWeatherStationApiErrors);
      });
  };

  render() {
    const {
      selectedAsset,
      assetToDelete,
      assetToEdit,
      loading,
      showEditModal,
      apiErrors,
      showDeleteConfirm,
      searchLoading,
    } = this.state;
    const { formattedAssets } = this.props;
    const isWeatherStation =
      selectedAsset &&
      selectedAsset.name &&
      selectedAsset.name.toLowerCase() === "weather station";

    return (
      <Box py="40px" px="40px">
        <AssetManagementStyle>
          <Heading pb="40px">Assets</Heading>
          <div className="row">
            <div className="col-md-4">
              <Card className="asset-list-section">
                {/* <SearchInput placeholder="Search assets" mb="8px" /> */}
                <ul className="assets-list">
                  {formattedAssets.map((asset, i) => (
                    <li
                      className={`asset-item ${selectedAsset.name ===
                        asset.name && "active"}`}
                      key={i}
                      onClick={() => this.setSelectedAsset(asset)}
                    >
                      <p className="asset-item-name">{asset.name}</p>
                      <div className="asset-item-count">
                        {asset.data.length}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="col-md-8">
              <div className="table-section">
                <div className="row">
                  <div className="col-md-7 col-xs-12">
                    <form onSubmit={e => this.onAssetSearch(e)}>
                      <SearchInput
                        placeholder={`Type ${selectedAsset.name &&
                          selectedAsset.name.toLowerCase()} name and press enter`}
                        mb="8px"
                        onChange={e => this.handleSearchChange(e.target.value)}
                      />
                    </form>
                  </div>
                  <div className="col-md-5 col-xs-12">
                    <CreateAssetButton
                      isLoading={loading}
                      label={selectedAsset.name}
                      onSubmit={
                        isWeatherStation
                          ? this.onWeatherStationCreate
                          : this.onAssetCreate
                      }
                      onCloseModal={() => this.setState({ apiErrors: null })}
                      apiErrors={getApiErrors(apiErrors)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {searchLoading ? (
                      <FullScreenSpinner
                        size={32}
                        thickness="4px"
                        height="calc(100vh - 140px)"
                        width="100%"
                      />
                    ) : (
                      <Box mb={4} className="asset-table-container">
                        <AssetTable
                          columns={assets_columns}
                          model={selectedAsset.name}
                          data={selectedAsset.data || []}
                          onEdit={this.handleEditClick}
                          onDelete={this.handleDeleteClick}
                        />
                      </Box>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AssetManagementStyle>

        <Modal
          showModal={showEditModal}
          heading={`Edit ${selectedAsset.name}`}
          onCloseModal={this.closeEditModal}
          size="medium"
        >
          <AssetForm
            {...assetToEdit}
            isLoading={loading}
            label={selectedAsset.name}
            onSubmit={
              isWeatherStation ? this.onWeatherStationEdit : this.onAssetEdit
            }
            onCancel={this.closeEditModal}
            apiErrors={getApiErrors(apiErrors)}
          />
        </Modal>

        <Confirm
          showModal={showDeleteConfirm}
          heading={`Delete ${selectedAsset.name &&
            selectedAsset.name.toLowerCase()}`}
          onConfirm={() => {
            isWeatherStation
              ? this.onWeatherStationDelete(
                  assetToDelete.id,
                  this.closeDeleteConfirm
                )
              : this.onAssetDelete(assetToDelete.id, this.closeDeleteConfirm);
          }}
          isLoading={loading}
          onCloseModal={this.closeDeleteConfirm}
          description={`Are you sure you want to delete this ${selectedAsset.name &&
            selectedAsset.name.toLowerCase()}?`}
        />
      </Box>
    );
  }
}
