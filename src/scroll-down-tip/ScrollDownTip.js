import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useScrollYPosition } from 'react-use-scroll-position';
import mobileImg from './swipe-down.svg';
import desktopImg from './mouse-scroll-down.svg';

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
  scrollImg: {
    height: theme.spacing(7),
    [theme.breakpoints.up('xl')]: {
      height: theme.spacing(10)
    }
  }
}));

function ScrollDownTip() {
  const classes = useStyles();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
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
      <img src={upMd ? desktopImg : mobileImg} className={classes.scrollImg} />
    </motion.div>
  );
}

export default ScrollDownTip;
