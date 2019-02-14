import React from 'react';
import { storiesOf } from '@storybook/react';
import DashboardLayout from '../shared/DashboardLayout';

const stories = storiesOf('Dashboard Layout', module);

stories.add('Dashboard Layout', () => <DashboardLayout />);
