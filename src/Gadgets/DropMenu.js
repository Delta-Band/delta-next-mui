import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import usePortal from 'react-useportal';
import disableScroll from 'disable-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import useClickOutside from 'use-click-outside';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block'
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
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
      mass: 0.5,
      damping: 15
    }
  },
  close: {
    y: '110%',
    opacity: 0,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 15
    }
  }
};

const dropMenu = {
  open: {
    opacity: 1,
    y: 0
  },
  close: {
    opacity: 0,
    y: 40,
    transition: {
      y: {
        delay: 0.05
      }
    }
  }
};

function DropMenu({
  children,
  menu,
  location = 'bottomLeft',
  force = null,
  onToggle = () => {}
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const upIpad = useMediaQuery(theme.breakpoints.up('ipad'));
  const ref = useRef();
  // useClickOutside(ref, closeMenu);
  const { Portal } = usePortal();

  /** METHODS */
  function openMenu() {
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function toggleMenu() {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  /** EFFECTS */
  useEffect(() => {
    if (open) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
    onToggle(open);
  }, [open]);

  useEffect(() => {
    if (force === 'open') {
      openMenu();
    } else if (force === 'close') {
      closeMenu();
    }
  }, [force]);

  return (
    <div
      className={classes.root}
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={classes.triggerWrap}>
        <div onClick={toggleMenu} className={classes.trigger}>
          {children}
        </div>
        <AnimatePresence>
          {upIpad && open && (
            <motion.div
              key='menu'
              variants={dropMenu}
              initial='close'
              animate='open'
              exit='close'
              className={cx(classes.dropMenu, classes[location])}
              onClick={closeMenu}
            >
              {menu}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Portal>
        <AnimatePresence>
          {!upIpad && open && (
            <motion.div
              className={classes.mobileMenu}
              variants={backDropMotion}
              onClick={closeMenu}
              initial='close'
              animate='open'
              exit='close'
              style={{
                pointerEvents: open ? 'all' : 'none'
              }}
            >
              <motion.div
                key='bottom-drawer'
                variants={bottomDrawer}
                className={classes.menu}
                onClick={closeMenu}
              >
                {menu}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}

export default DropMenu;
