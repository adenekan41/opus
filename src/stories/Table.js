import React from "react";
import { storiesOf } from "@storybook/react";
import Table from "../components/Table";
import ContactTable from "../views/Dashboard/Contacts/components/ContactTable";

const stories = storiesOf("Table", module);

stories.add("Table Component", () => <Table data={[]} columns={[]} />);
stories.add("Contact Table", () => (
  <ContactTable
    cities={[]}
    isAdmin={true}
    contacts={[{first_name: "Tolu", last_name: "Kola", phone_numbers:["08078657912"]}]}
    crops={[]}
    countries={[]}
    isLoading={false}
    onContactEdit={() => {}}
    onContactDelete={() => {}}
    getCountryCities={() => {}}
  />
));
