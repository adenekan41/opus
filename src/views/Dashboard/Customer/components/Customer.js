import React from "react";
import CustomerTable from "./CustomersTable";
import SearchInput from "../../../../components/Search";
import EmptyState from "../../../../components/EmptyState";
import emptyStateImage from "../../../../assets/img/empty-states/contacts.png";
import { countries } from "../../../../helpers/countries";
import Modal, { ToggleModal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import CustomerForm from "./CustomerForm";

class Customers extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLoading: false,
      cities: [],
      customers: [
        {
          first_name: "geek",
          last_name: "tuts",
          phone_numbers: "08081210121",
          company: "geekTeck",
          middle_name: "sikiru",
          country: "Ethiopia",
          city: "Addis Ababa,",
        },
      ],
    };
  }

  getCountryCities = country => {
    this.setState({
      cities: [],
    });
  };

  newCustomer = () => {
    this.props.history.push("/dashboard/customers/new");
  };

  onCustomerCreate = (values, callback) => {};

  onCustomerEdit = (values, callback) => {};

  onCustomerDelete = (id, callback) => {};

  render() {
    const { profile, crops } = this.props;
    let { buttonLoading, cities, customers } = this.state;
    let isAdmin = profile.username === "admin";
    let formatCrops = crops.map(crop => ({
      label: crop.name,
      value: crop.name,
    }));
    return (
      <div style={{ padding: "40px" }}>
        <div className="row">
          <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
            <form>
              <SearchInput placeholder="Search customers" mb="8px" />
            </form>
          </div>
          <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
            <Button kind="green" block onClick={this.newCustomer}>
              <Icon name="add" color="#ffffff" />
              &nbsp;&nbsp;Add Customers
            </Button>
          </div>
        </div>
        
        {customers.length > 0 ? (
          <CustomerTable
            cities={cities}
            isAdmin={isAdmin}
            customers={customers}
            crops={formatCrops}
            countries={countries}
            isLoading={buttonLoading}
            onCustomerEdit={this.onCustomerEdit}
            onCustomerDelete={this.onCustomerDelete}
            getCountryCities={this.getCountryCities}
          />
        ) : (
          <EmptyState
            image={emptyStateImage}
            margin="80px"
            heading="No Customers Yet"
            helpText="You haven’t added any customers yet,
              click the button below to add a new one."
            renderButton={() => (
              <ToggleModal>
                {(show, openModal, closeModal) => (
                  <>
                    <Button kind="green" block onClick={openModal}>
                      <Icon name="add" color="#ffffff" />
                      &nbsp;&nbsp;Add Customers
                    </Button>
                    <Modal
                      size="medium"
                      showModal={show}
                      onCloseModal={closeModal}
                      heading={"Add Customers"}
                    >
                      <CustomerForm
                        crops={formatCrops}
                        cities={cities}
                        isAdmin={isAdmin}
                        onSubmit={this.onCustomerCreate}
                        countries={countries}
                        onCancel={closeModal}
                        isLoading={buttonLoading}
                        getCountryCities={this.getCountryCities}
                      />
                    </Modal>
                  </>
                )}
              </ToggleModal>
            )}
          />
        )}
      </div>
    );
  }
}

export default Customers;
