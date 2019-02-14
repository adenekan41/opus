import React from 'react';
import CombinedSidebar from '../components/Sidebar';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Sidebar', module)

stories.add("Combined Sidebar", () => <CombinedSidebar/>)