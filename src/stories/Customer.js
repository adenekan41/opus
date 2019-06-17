import React from "react";
import { storiesOf } from "@storybook/react";
import NewCustomer from "../views/Dashboard/Customer/components/NewCustomer";

const stories = storiesOf("Customer page", module);

stories.add("New Customer Page", () => (
  <NewCustomer
    assets={[
      { name: "Cashew", id: "0", is_crop: true },
      { name: "Nigeria", id: "1", is_country: true },
    ]}
  />
));
