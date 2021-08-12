import React, { useState } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Modal } from '../../src';

export default {
  title: 'Gadgets/Modal',
  component: Modal,
  argTypes: {
    onClose: { action: 'closed' }
  },
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

  const array = [];

  for (let i = 0; i < 40; i++) {
    array.push(i);
  }

  return (
    <div style={{ height: '100vh', padding: 40, boxSizing: 'border-box' }}>
      <Button
        variant='contained'
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      {array.map((i) => (
        <Typography>Content {i}</Typography>
      ))}
      <Modal
        show={isOpen}
        className={classes.modal}
        onClose={() => setIsOpen(false)}
        disableScroll={false}
      >
        <Typography>I am a Modal</Typography>
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
