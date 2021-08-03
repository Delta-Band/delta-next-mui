import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import disableScroll from 'disable-scroll';
import { motion } from 'framer-motion';
import useClickOutside from 'use-click-outside';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block'
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    width: '100vw',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.up('ipad')]: {
      bottom: '50%',
      left: '50%',
      width: 'auto'
    }
  },
  dropMenu: {
    position: 'absolute',
    top: '100%',
    marginTop: 10,
    zIndex: 1
  },
  triggerWrap: {
    cursor: 'pointer',
    position: 'relative'
  },
  bottomRight: {
    right: 0
  },
  bottomLeft: {
    left: 0
  }
}));

/** MOTION VARIANTS */
const backDropMotion = {
  open: {
    opacity: 1,
    transition: {
      type: 'spring',
      when: 'beforeChildren'
    }
  },
  close: {
    opacity: 0,
    transition: {
      type: 'spring',
      when: 'afterChildren'
    }
  }
};

const bottomDrawer = {
  open: {
    y: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      // restSpeed: 0.5,
      mass: 0.5,
      // stiffness: 50,
      damping: 15
    }
  },
  close: {
    y: '110%',
    opacity: 0,
    transition: {
      type: 'spring',
      // restSpeed: 0.5,
      mass: 0.5,
      // stiffness: 50,
      damping: 15
    }
  }
};

const dropMenu = {
  open: {
    opacity: 1,
    y: 0
    // transition: {
    //   type: 'spring',
    //   bounce: 0.25
    // }
  },
  close: {
    opacity: 0,
    y: 40
    // transition: {
    //   type: 'spring',
    //   bounce: 0
    // }
  }
};

function DropMenu({ children, menu, location = 'bottomLeft' }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const upIpad = useMediaQuery(theme.breakpoints.up('ipad'));
  const ref = useRef();
  useClickOutside(ref, closeMenu);

  /** METHODS */
  function openMenu() {
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  /** EFFECTS */
  useEffect(() => {
    if (open) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [open]);

  return (
    <div className={classes.root} ref={ref}>
      <div className={classes.triggerWrap}>
        <div onClick={openMenu} className={classes.trigger}>
          {children}
        </div>
        {upIpad && (
          <motion.div
            variants={dropMenu}
            initial='close'
            animate={open ? 'open' : 'close'}
            className={cx(classes.dropMenu, classes[location])}
            onClick={closeMenu}
          >
            {menu}
          </motion.div>
        )}
      </div>

      {!upIpad && (
        <motion.div
          className={classes.mobileMenu}
          variants={backDropMotion}
          onClick={closeMenu}
          initial='close'
          animate={open ? 'open' : 'close'}
          style={{
            pointerEvents: open ? 'all' : 'none'
          }}
        >
          <motion.div
            variants={bottomDrawer}
            className={classes.menu}
            onClick={closeMenu}
          >
            {menu}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default DropMenu;
