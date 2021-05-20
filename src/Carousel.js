import React from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  slider: {
    width: '100%',
    height: '100%',
    display: 'inline-flex'
  }
}));

export default function Carousel({
  children,
  xPosition = '0%',
  paddingLeft = 0
}) {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        paddingLeft: paddingLeft
      }}
    >
      <motion.div
        className={classes.slider}
        animate={{ x: xPosition }}
        transition={{ type: 'spring', bounce: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
