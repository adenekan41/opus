import React from 'react';
import { storiesOf } from '@storybook/react';
import DashboardLayout from '../shared/Layout/DashboardLayout';

const stories = storiesOf('Dashboard Layout', module);

stories.add('Dashboard Layout', () => <DashboardLayout />);
