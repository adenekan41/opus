import React from "react";
import CustomerAdvisoryModuleTable from "./CustomerAdvisoryModuleTable";
import SearchInput from "../../../../../components/Search";

class CustomerAdvisoryModules extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLoading: false,
      cities: [],
      advisorymodules: [
        {
          name: "Blossom shower simulation",
        },
      ],
    };
  }

  onCustomerCreate = (values, callback) => {};

  onCustomerEdit = (values, callback) => {};

  onCustomerDelete = (id, callback) => {};

  render() {
    let { buttonLoading, advisorymodules } = this.state;
    return (
      <div style={{ padding: "40px" }}>
        <div className="row">
          <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
            <SearchInput placeholder="Search for an Advisory Module" mb="8px" />
          </div>
        </div>

        <CustomerAdvisoryModuleTable
          advisorymodules={advisorymodules}
          isLoading={buttonLoading}
          onCustomerEdit={this.onCustomerEdit}
          onCustomerDelete={this.onCustomerDelete}
        />
      </div>
    );
  }
}

export default CustomerAdvisoryModules;
