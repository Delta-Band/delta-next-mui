import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Button } from '@material-ui/core';
import { CopyToClipboard } from '../../src';

export default {
  title: 'Gadgets/Copy To Clipboard',
  component: CopyToClipboard,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const Template = (args) => (
  <div
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <CopyToClipboard {...args}>
      <Button>Click Me</Button>
    </CopyToClipboard>
  </div>
);

export const Default = Template.bind({});
Default.args = { string: 'https://delta.band' };
Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
