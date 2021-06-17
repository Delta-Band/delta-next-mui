import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ScrollDownTip } from '../src';

console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Gadgets/Scroll Down Tip',
  component: ScrollDownTip,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const Template = (args) => <ScrollDownTip {...args} />;

export const Desktop = Template.bind({});
Desktop.args = {};
Desktop.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
