import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ScrollDownTip } from '../../src';

export default {
  title: 'Gadgets/Scroll Down Tip',
  component: ScrollDownTip,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const Template = (args) => (
  <div style={{ height: '200vh' }}>
    <ScrollDownTip {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
