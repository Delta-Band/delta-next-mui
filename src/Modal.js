import React, { useEffect } from 'react';
import usePortal from 'react-useportal';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import cx from 'classnames';
import disableScroll from 'disable-scroll';
import { AnimatePresence, motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  screenCover: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '100vw',
    background: 'rgb(0, 0, 0)',
    backdropFilter: 'blur(17px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  modal: {
    boxShadow: theme.shadows[15],
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative'
  }
}));

export default function DeltaModal({
  show,
  onClose,
  children,
  classNames = {},
  disableOrchstratedAnimation = false
}) {
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
    hidden: (disableOrchstratedAnimation) => ({
      pointerEvents: 'none',
      opacity: 0,
      transition: {
        bounce: 0,
        when: disableOrchstratedAnimation ? undefined : 'afterChildren'
      }
    }),
    show: (disableOrchstratedAnimation) => ({
      pointerEvents: 'all',
      opacity: 1,
      transition: {
        when: disableOrchstratedAnimation ? undefined : 'beforeChildren',
        bounce: 0
      }
    })
  };

  const modal = {
    hidden: (disableScaleAnimation) => ({
      opacity: 0,
      scale: disableScaleAnimation ? 1 : 0
    }),
    show: {
      opacity: 1,
      scale: 1
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <motion.div
            className={classes.screenCover}
            // variants={container}
            // custom={disableOrchstratedAnimation}
            initial={{
              pointerEvents: 'none',
              opacity: 0,
              transition: {
                bounce: 0,
                when: 'afterChildren'
              }
            }}
            animate={{
              pointerEvents: 'all',
              opacity: 1,
              transition: {
                when: 'beforeChildren',
                bounce: 0
              }
            }}
            exit={{
              pointerEvents: 'none',
              opacity: 0,
              transition: {
                bounce: 0,
                when: 'afterChildren'
              }
            }}
            onClick={onClose}
          >
            <motion.div
              onClick={onClose}
              className={cx(classes.modal, classNames.modal)}
              initial={{
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
