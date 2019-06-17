import React from "react";
import { storiesOf } from "@storybook/react";
import Input from "../components/Input";
import Dropdown from "../components/Select";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";
import CheckboxSelect from "../components/CheckboxSelect";
import SelectSearch from "../components/SelectSearchInput";
import SearchInput from "../components/Search";

let selected = ["sefwio1"];
const stories = storiesOf("Form elements", module);

stories.add("Search Input", () => <SearchInput />);
stories.add("Default Input", () => <Input />);
stories.add("Input with icon", () => <Input icon="user" />);
stories.add("Input with strip", () => <Input icon="user" hasStrip />);
stories.add("Invalid Input", () => <Input isInvalid icon="lock" />);
stories.add("Disabled Input", () => <Input disabled icon="lock" />);
stories.add("Select", () => <Dropdown />);
stories.add("Disabled Select", () => <Dropdown isDisabled />);
stories.add("DatePicker", () => <DatePicker />);
stories.add("DatePicker with values", () => (
  <DatePicker
    startDate="2019-02-27T11:00:00.000Z"
    endDate="2019-03-31T11:00:00.000Z"
  />
));
stories.add("React Select Search Input", () => <SelectSearch />);
stories.add("Checkbox Medium", () => (
  <Checkbox onChange={e => console.log(e.target.checked)} />
));
stories.add("Checkbox Small", () => (
  <Checkbox onChange={e => console.log(e.target.checked)} size="12px" />
));
stories.add("Checkbox Select", () => (
  <CheckboxSelect
    label="Weather Station"
    placeholder="Select a station"
    onChange={value => {
      if (selected.includes(value)) {
        selected = selected.filter(item => item !== value);
      } else {
        selected.push(value);
      }
      //make call to get stations data
      console.log(selected);
    }}
    options={[
      { value: "sefwio1", label: "Bodi" },
      { value: "sefwio2", label: "Western Region, Ghana" },
      { value: "sefwio3", label: "Western Region, Ghana" },
    ]}
    selected={selected}
  />
));
