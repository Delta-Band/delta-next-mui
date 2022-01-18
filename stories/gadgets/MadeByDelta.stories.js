import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { MadeByDelta } from '../../src';

export default {
  title: 'Gadgets/MadeByDelta',
  component: MadeByDelta,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const Template = args => (
  <div style={{ background: 'black' }}>
    <MadeByDelta {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
