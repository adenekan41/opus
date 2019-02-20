import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchInput from '../components/SearchInput';

const stories = storiesOf('Navbar', module)

stories.add("Search Input", () => <SearchInput/>)