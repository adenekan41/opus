import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import './Navbar';
import './Sidebar';
import './DashboardLayout';

storiesOf('Welcome', module).add('to Storybook', () => {
  return <Welcome showApp={linkTo('Button')} />;
});
