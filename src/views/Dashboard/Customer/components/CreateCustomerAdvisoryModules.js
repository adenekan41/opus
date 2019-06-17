import React, { Component } from "react";
import { Flex } from "rebass";
import Button from "../../../../components/Button";
import CustomerAdvisoryModules from "./thisCustomer/CustomerAdvisory";

export default class CreateCustomerAdvisoryModules extends Component {
  submit = () => {
    this.props.onSubmit([]);
  };

  render() {
    const { goBack, payload, advisory_modules } = this.props;

    return (
      <div>
        <CustomerAdvisoryModules
          advisory_modules={advisory_modules}
          customerModules={payload.advisory_modules}
        />

        <Flex alignItems="center" justifyContent="space-between" mt={3}>
          <Button
            kind="gray"
            width="300px"
            onClick={goBack}
            type="button"
            mb="8px"
          >
            Back
          </Button>
          <Button kind="orange" width="300px" mb="8px" onClick={this.submit}>
            Next
          </Button>
        </Flex>
      </div>
    );
  }
}
