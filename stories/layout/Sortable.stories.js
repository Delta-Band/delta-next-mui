import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Sortable } from '../../src';
// console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Layout/Sortable',
  component: Sortable,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: '100vh',
    width: '100%',
    position: 'absolute'
  }
}));

const Template = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Sortable {...args} />
    </div>
  );
};

function items() {
  const data = [
    { text: 'aaa', color: 'red' },
    { text: 'bbb', color: 'green' },
    { text: 'ccc', color: 'blue' }
  ];
  return data.reduce((acc, item) => {
    acc.push(
      <div
        style={{ backgroundColor: item.color, padding: 10, marginBottom: 20 }}
      >
        <Typography>{item.text}</Typography>
      </div>
    );
    return acc;
  }, []);
}

export const Default = Template.bind({});
Default.args = {
  items: items()
};

Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
