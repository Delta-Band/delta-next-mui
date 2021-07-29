import React, { useState } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Modal } from '../../src';

export default {
  title: 'Gadgets/Modal',
  component: Modal,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const useStyles = makeStyles((theme) => ({
  modal: {
    background: '#FFF',
    borderRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    width: '80vw',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '0 -2px 9px rgba(0, 0, 0, 0.42)',
    [theme.breakpoints.up('ipad')]: {
      width: 360
      // boxShadow: '0 2px 9px rgba(0, 0, 0, 0.42)',
      // borderRadius: theme.spacing(0.5)
    }
  }
}));

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  return (
    <div style={{ height: '100%', padding: 40 }}>
      <Button
        variant='contained'
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classes.modal}>
          <Typography>I am a Modal</Typography>
        </div>
      </Modal>
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
