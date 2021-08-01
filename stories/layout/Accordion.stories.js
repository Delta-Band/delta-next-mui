import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Typography } from '@material-ui/core';
import { Accordion } from '../../src';

// console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Layout/Accordion',
  component: Accordion,
  argTypes: { onKeyPress: { action: 'onKeyPress' } },
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
      id: '1',
      summary: <Typography>Summary 1</Typography>,
      details: <Typography>Details</Typography>
    },
    {
      id: '2',
      summary: <Typography>Summary 2</Typography>,
      details: <Typography>Details</Typography>
    },
    {
      id: '3',
      summary: <Typography>Summary 3</Typography>,
      details: [
        {
          id: '4',
          summary: <Typography>Summary</Typography>,
          details: <Typography>Details</Typography>
        },
        {
          id: '5',
          summary: <Typography>Summary</Typography>,
          details: [
            {
              id: '6',
              summary: <Typography>Summary</Typography>,
              details: <Typography>Details</Typography>
            }
          ]
        }
      ]
    }
  ],
  forceOpen: '2-0'
};
Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
