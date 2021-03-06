import React, { useState, useEffect } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { DropMenu } from '../../src';

export default {
  title: 'Gadgets/DropMenu',
  component: DropMenu,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const useStyles = makeStyles((theme) => ({
  page: {
    height: '100vh',
    width: '100vvw'
  },
  menuInner: {
    background: '#FFF',
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    width: '100%',
    margin: '0 auto',
    boxShadow: '0 -2px 9px rgba(0, 0, 0, 0.42)',
    [theme.breakpoints.up('ipad')]: {
      width: 160,
      boxShadow: '0 2px 9px rgba(0, 0, 0, 0.42)',
      borderRadius: theme.spacing(0.5)
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
    },
    [theme.breakpoints.up('ipad')]: {
      textAlign: 'left'
    }
  }
}));

const Template = (args) => {
  const classes = useStyles();
  const [item, selectItem] = useState('item 1');
  const [forceMenu, setForceMenu] = useState(null);

  useEffect(() => {
    if (forceMenu !== null) {
      setForceMenu(null);
    }
  }, [forceMenu]);

  return (
    <div
      className={classes.page}
      onClick={() => {
        setForceMenu('close');
      }}
    >
      <DropMenu
        {...args}
        force={forceMenu}
        menu={
          <div className={classes.menuInner}>
            {['item 1', 'item 2', 'item 3'].map((_item) => (
              <div
                key={_item}
                className={classes.menuItem}
                onClick={() => {
                  selectItem(_item);
                }}
              >
                <Typography>{_item}</Typography>
              </div>
            ))}
          </div>
        }
      >
        <Typography>{item}</Typography>
      </DropMenu>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  // location: 'bottomRight'
};
Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
