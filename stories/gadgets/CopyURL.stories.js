import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Button } from '@material-ui/core';
import { CopyURL } from '../../src';

export default {
  title: 'Gadgets/Copy URL',
  component: CopyURL,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const Template = (args) => (
  <div
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <CopyURL {...args}>
      <Button>Click Me</Button>
    </CopyURL>
  </div>
);

export const Default = Template.bind({});
Default.args = { url: 'https://delta.band' };
Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
