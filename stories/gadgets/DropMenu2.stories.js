import React, { useState } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { DropMenu } from '../../src';

export default {
  title: 'Gadgets/DropMenu',
  component: DropMenu,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const Template = (args) => (
  <div style={{ height: '100vh' }}>
    <DropMenu {...args} />
  </div>
);

const useStyles = makeStyles((theme) => ({
  menuInner: {
    background: '#FFF',
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    maxWidth: 600,
    margin: '0 auto',
    boxShadow: '0 -2px 9px rgba(0, 0, 0, 0.42)',
    [theme.breakpoints.up('ipad')]: {
      borderRadius: theme.spacing(2)
    }
  },
  menuItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    cursor: 'pointer',
    '&:last-child': {
      border: 'none'
    }
  }
}));

export const Default = Template.bind({});
const [item, selectItem] = useState('item 1');
const classes = useStyles();

Default.args = {
  target: <Typography>{item}</Typography>,
  menu: (
    <div className={classes.menuInner}>
      {['item 1', 'item 2', 'item 3'].map((_item) => (
        <div
          key={_item}
          className={classes.menuItem}
          onClick={() => selectItem(_item)}
        >
          <Typography>{_item}</Typography>
        </div>
      ))}
    </div>
  )
};
Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
