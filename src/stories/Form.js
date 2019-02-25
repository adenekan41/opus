import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchInput from '../components/SearchInput';
import Input from '../components/Input';

const stories = storiesOf('Form elements', module)

stories.add("Search Input", () => <SearchInput/>)
stories.add("Default Input", () => <Input/>)
stories.add("Input with icon", () => <Input icon="user"/>)
stories.add("Input with strip", () => <Input icon="user" hasStrip/>)
stories.add("Invalid Input", () => <Input isInvalid icon="lock"/>)
stories.add("Disabled Input", () => <Input disabled icon="lock"/>)