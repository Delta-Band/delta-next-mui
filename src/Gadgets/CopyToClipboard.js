import React, { Fragment, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import usePortal from 'react-useportal';
import { Clipboard as ClipboardIcon } from '@styled-icons/bootstrap/Clipboard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  tip: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 100%)',
    background: theme.palette.primary.main,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: theme.spacing(5),
    zIndex: 12,
    display: 'flex',
    alignItems: 'center'
  },
  txt: {
    color: theme.palette.primary.contrastText,
    fontSize: 14,
    display: 'inline-flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.contrastText
  }
}));

function CopyToClipboard({
  children,
  classNames = {},
  string,
  autoHide = true,
  confirmationText = 'COPIED'
}) {
  const classes = useStyles();
  const { Portal } = usePortal();
  const [showTip, setShowTip] = useState(false);
  const timeOut = useRef();

  function handleClick(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(string);
    setShowTip(true);
    clearTimeout(timeOut.current);
    if (autoHide) {
      timeOut.current = setTimeout(() => {
        setShowTip(false);
      }, 3000);
    }
  }

  return (
    <Fragment>
      <div className={cx(classes.root, classNames.root)} onClick={handleClick}>
        {children}
      </div>
      <Portal>
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{
                opacity: 0,
                bottom: 0
              }}
              animate={{
                opacity: 1,
                bottom: 70
              }}
              exit={{
                opacity: 0,
                bottom: 0
              }}
              className={cx(classes.tip, classNames.tipBox)}
              onClick={() => setShowTip(false)}
            >
              <motion.div
                className={classes.icon}
                initial={{ y: -2, scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  delay: 0.15
                }}
              >
                <ClipboardIcon size={24} className={classNames.icon} />
              </motion.div>
              <Typography className={cx(classes.txt, classNames.tipTxt)}>
                {confirmationText}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </Fragment>
  );
}

export default CopyToClipboard;
