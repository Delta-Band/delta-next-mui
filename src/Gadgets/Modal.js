import React, { useEffect, useRef } from 'react';
import usePortal from 'react-useportal';
import screenfull from 'screenfull';
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
  className,
  fullScreen = false,
  backDropColor = 'rgba(0, 0, 0, 0.8)'
}) {
  const classes = useStyles();
  const { Portal } = usePortal();
  const ref = useRef();

  useEffect(() => {
    if (show) {
      if (fullScreen && screenfull.isEnabled) {
        screenfull.request(ref.current);
      }
      disableScroll.on();
    } else {
      disableScroll.off();
      if (fullScreen && screenfull.isEnabled) {
        screenfull.exit();
      }
    }
  }, [show]);

  return (
    <Portal>
      <AnimatePresence>
        <div ref={ref}>
          {show && (
            <motion.div
              className={classes.screenCover}
              style={{
                background: backDropColor
              }}
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
                className={cx(classes.modal, className)}
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
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </Portal>
  );
}
