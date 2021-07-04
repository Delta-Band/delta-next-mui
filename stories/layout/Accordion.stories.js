import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Typography } from '@material-ui/core';
import { Accordion } from '../../src';

// console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Layout/Accordion',
  component: Accordion,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const Template = (args) => (
  <div style={{ height: '200vh', width: '80vw' }}>
    <Accordion {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  content: [
    {
      summary: <Typography>Summary 1</Typography>,
      details: <Typography>Details</Typography>
    },
    {
      summary: <Typography>Summary 2</Typography>,
      details: <Typography>Details</Typography>
    },
    {
      summary: <Typography>Summary 3</Typography>,
      details: [
        {
          summary: <Typography>Summary</Typography>,
          details: <Typography>Details</Typography>
        },
        {
          summary: <Typography>Summary</Typography>,
          details: <Typography>Details</Typography>
        }
      ]
    }
  ]
};
Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
