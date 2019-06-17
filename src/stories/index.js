import React from "react";
import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import "./Navbar";
import "./Sidebar";
import "./DashboardLayout";
import "./Table";
import "./Form";
import "./Feedback";
import "./Breadcrumb";
import "./Customer";

storiesOf("Welcome", module).add("to Storybook", () => {
  return <Welcome showApp={linkTo("Button")} />;
});
