import React, { useEffect } from 'react';
import usePortal from 'react-useportal';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import disableScroll from 'disable-scroll';
import { AnimatePresence, motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  screenCover: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '100vw',
    backgroundColor: fade(theme.palette.primary.dark, 0.5),
    backdropFilter: 'blur(17px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  modal: {
    // backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[15],
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative'
  }
}));

export default function DeltaModal({ show, onClose, children }) {
  const classes = useStyles();
  const { Portal } = usePortal();

  useEffect(() => {
    if (show) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [show]);

  const container = {
    hidden: {
      pointerEvents: 'none',
      opacity: 0,
      transition: {
        bounce: 0,
        when: 'afterChildren'
      }
    },
    show: {
      pointerEvents: 'all',
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        bounce: 0
      }
    }
  };

  const modal = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    show: {
      opacity: 1,
      scale: 1
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <div>Hello</div>
          // <motion.div
          //   className={classes.screenCover}
          //   variants={container}
          //   initial='hidden'
          //   animate={show ? 'show' : 'hidden'}
          //   onClick={onClose}
          // >
          //   <motion.div
          //     onClick={onClose}
          //     className={classes.modal}
          //     variants={modal}
          //   >
          //     {children}
          //   </motion.div>
          // </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
