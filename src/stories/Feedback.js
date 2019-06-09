import React from 'react';
import { storiesOf } from '@storybook/react';
import { Toast } from '../components/Toast';
import Progressbar from "../components/Progressbar";

const stories = storiesOf('Feedback elements', module)

stories.add("Toast Input", () => <Toast status="error" title="Error" showToast autoClose>An error occured</Toast>)
stories.add("Progressbar", () => <Progressbar width={20} />)