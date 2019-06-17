import React from "react";
import CustomerAdvisoryModuleTable from "./CustomerAdvisoryModuleTable";
import SelectSearch from "../../../../../components/SelectSearchInput";

class CustomerAdvisoryModules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      cities: [],
      customerModules: this.props.customerModules || [
        {
          name: "Blossom shower simulation",
        },
      ],
    };
  }

  formatSearchOptions = () => {
    const { advisory_modules = [] } = this.props;
    return advisory_modules.map(advisory_module => ({
      label: advisory_module.name,
      value: advisory_module.name,
    }));
  };

  addCustomerModule = value => {
    let { advisory_modules = [] } = this.props;
    let selectedModule = advisory_modules.find(
      advisory_module => advisory_module.station_name === value
    );
    let { id, name } = selectedModule;
    this.setState(({ customerModules }) => ({
      customerModules: [{ id, name }, ...customerModules],
    }));
  };

  deleteCustomerModule = value => {
    this.setState(({ customerModules }) =>
      customerModules.filter(({ id }) => id !== value)
    );
  };

  render() {
    let { buttonLoading, customerModules } = this.state;

    return (
      <div style={{ padding: "40px" }}>
        <div className="row">
          <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
            <SelectSearch
              mb="8px"
              options={this.formatSearchOptions()}
              placeholder="Search for an Advisory Module"
              onChange={advisory_module =>
                this.addCustomerModule(advisory_module.value)
              }
            />
          </div>
        </div>

        <CustomerAdvisoryModuleTable
          advisorymodules={customerModules}
          isLoading={buttonLoading}
          deleteModule={this.deleteCustomerModule}
        />
      </div>
    );
  }
}

export default CustomerAdvisoryModules;
