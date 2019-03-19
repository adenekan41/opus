import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchInput, { SelectSearch } from '../components/SearchInput';
import Input from '../components/Input';
import Dropdown from '../components/Select';
import DatePicker from '../components/DatePicker';

const stories = storiesOf('Form elements', module)

stories.add("Search Input", () => <SearchInput/>)
stories.add("Default Input", () => <Input/>)
stories.add("Input with icon", () => <Input icon="user"/>)
stories.add("Input with strip", () => <Input icon="user" hasStrip/>)
stories.add("Invalid Input", () => <Input isInvalid icon="lock"/>)
stories.add("Disabled Input", () => <Input disabled icon="lock"/>)
stories.add("Select", () => <Dropdown />)
stories.add("Disabled Select", () => <Dropdown isDisabled />)
stories.add("DatePicker", () => <DatePicker />)
stories.add("DatePicker with values", () => <DatePicker startDate="2019-02-27T11:00:00.000Z" endDate="2019-03-31T11:00:00.000Z" />)
stories.add("React Select Search Input", () => <SelectSearch />)