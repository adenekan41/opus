import React from 'react';
import Navbar from '../components/Navbar';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Navbar', module)

stories.add("Navbar", () => <Navbar/>)