import React from 'react';
import { storiesOf } from '@storybook/react';
import Breadcrumbs, { BreadcrumbItem } from '../components/Breadcrumb';

const stories = storiesOf('Breadcrumb component', module);

stories.add('Breadcrumb component', () => (
  <Breadcrumbs>
    <BreadcrumbItem url="">Map</BreadcrumbItem>
    <BreadcrumbItem url="">LCM Apapa</BreadcrumbItem>
    <BreadcrumbItem url="" isActive isLink={false}>Report</BreadcrumbItem>
  </Breadcrumbs>
));
