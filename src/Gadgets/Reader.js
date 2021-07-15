import React, { useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';
import usePortal from 'react-useportal';
import { ChevronBarDown as ChevronDown } from '@styled-icons/bootstrap/ChevronBarDown';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const useStyles = makeStyles((theme) => ({
  reader: {
    position: 'fixed',
    bottom: 0,
    left: '0',
    width: '100vw',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  readerInner: {
    maxWidth: 1200,
    background: '#FFF',
    width: '90vw',
    height: 'calc(100% - 90px)',
    lineHeight: '1.8em',
    padding: theme.spacing(5),
    paddingBottom: 0,
    overflowY: 'auto',
    borderTopRightRadius: theme.spacing(1),
    borderTopLeftRadius: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(7),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10)
    },
    '& br': {
      display: 'none'
    },
    '& ul': {
      listStyle: 'initial',
      paddingLeft: 21
    }
  },
  noBleed: {
    padding: 0
  },
  closePortal: {
    cursor: 'pointer',
    marginBottom: theme.spacing(2)
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  portal: {
    open: {
      opacity: 1,
      transition: {
        delayChildren: 0.5
      }
    },
    close: {
      opacity: 0,
      transition: { when: 'afterChildren' }
    }
  },
  reader: {
    open: {
      y: '0%'
    },
    close: {
      y: '100%'
    }
  },
  chevron: {
    open: {
      opacity: 1,
      y: '0%',
      transition: {
        delay: 1,
        bounce: 0
      }
    },
    close: {
      y: '-100%',
      opacity: 0,
      transition: {
        bounce: 0
      }
    }
  }
};

function Reader({ children, open, onClose, noBleed }) {
  const classes = useStyles();
  const { Portal } = usePortal();
  const readerRef = useRef();
  const theme = useTheme();
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));

  // useEffect(() => {
  //   if (open) {
  //     disableBodyScroll(readerRef.current);
  //   } else {
  //     enableBodyScroll(readerRef.current);
  //   }
  // }, [open]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            className={classes.reader}
            variants={MOTION_VARIANTS.portal}
            initial='close'
            style={{
              pointerEvents: open ? 'all' : 'none',
              zIndex: open ? 10 : 1
            }}
            onClick={onClose}
            exit={MOTION_VARIANTS.portal.close}
            animate={open ? 'open' : 'close'}
            transition={{ type: 'spring', bounce: 0 }}
          >
            <motion.div
              variants={MOTION_VARIANTS.chevron}
              exit={MOTION_VARIANTS.chevron.close}
              className={classes.closePortal}
            >
              <ChevronDown size={upXl ? 52 : 32} color='#FFF' />
            </motion.div>
            <motion.div
              ref={readerRef}
              className={cx(classes.readerInner, {
                [classes.noBleed]: noBleed
              })}
              variants={MOTION_VARIANTS.reader}
              exit={MOTION_VARIANTS.reader.close}
              transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default Reader;
