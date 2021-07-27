import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Carousel } from '../../src';

// console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Layout/Carousel',
  component: Carousel,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const useStyles = makeStyles((theme) => ({
  page: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    height: theme.spacing(10),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item1: {
    background: 'aquamarine'
  },
  item2: {
    background: 'blanchedalmond'
  },
  item3: {
    background: 'gainsboro'
  }
}));

const Template = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Carousel {...args}>
        <div key={1} className={cx(classes.item, classes.item1)}>
          1
        </div>
        <div key={2} className={cx(classes.item, classes.item2)}>
          2
        </div>
        <div key={3} className={cx(classes.item, classes.item3)}>
          3
        </div>
      </Carousel>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
