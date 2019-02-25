import React from 'react';
import { storiesOf } from '@storybook/react';
import { Toast } from '../components/Toast';

const stories = storiesOf('Feedback elements', module)

stories.add("Toast Input", () => <Toast status="error" title="Error" showToast>An error occured</Toast>)