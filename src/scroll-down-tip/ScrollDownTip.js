import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useScrollYPosition } from 'react-use-scroll-position';
import { ChevronDown } from '@styled-icons/heroicons-outline/ChevronDown';

const TRANSITIONS = {
  BOUNCE: {
    duration: 0.72,
    yoyo: Infinity,
    ease: 'easeOut'
  }
};

const useStyles = makeStyles((theme) => ({
  scrollTipRoot: {
    position: 'fixed',
    top: 'calc(100vh - 50px)',
    left: '50%',
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {
      top: 'calc(100vh - 30px)'
    },
    [theme.breakpoints.up('lg')]: {},
    [theme.breakpoints.up('xl')]: {
      top: 'calc(100vh - 100px)'
    }
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
      display: 'block'
    }
  }
}));

function ScrollDownTip() {
  const classes = useStyles();
  const theme = useTheme();
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));
  const [showScrollTip, setShowScrollTip] = useState(true);
  const scrollY = useScrollYPosition();

  useEffect(() => {
    setShowScrollTip(scrollY === 0);
  }, [scrollY]);

  return (
    <motion.div
      animate={{
        scale: showScrollTip ? 1 : 0,
        opacity: showScrollTip ? 1 : 0,
        x: '-50%',
        y: '-100%'
      }}
      className={classes.scrollTipRoot}
    >
      <Typography className={classes.txt}>Scroll For More</Typography>
      <motion.div
        transition={TRANSITIONS.BOUNCE}
        className={classes.inner}
        animate={{
          y: ['30%', '-30%']
        }}
      >
        <ChevronDown size={upXl ? 62 : 46} />
      </motion.div>
    </motion.div>
  );
}

export default ScrollDownTip;
