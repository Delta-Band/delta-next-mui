import React, { Fragment, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import usePortal from 'react-useportal';
import { Clipboard as ClipboardIcon } from '@styled-icons/bootstrap/Clipboard';

const useStyles = makeStyles((theme) => ({
  tip: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 100%)',
    background: theme.palette.primary.main,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    borderRadius: theme.spacing(5),
    zIndex: 12,
    display: 'flex',
    alignItems: 'center'
  },
  txt: {
    color: theme.palette.primary.contrastText,
    fontSize: 12,
    display: 'inline-flex',
    alignItems: 'center'
  },
  linkIcon: {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.contrastText
  }
}));

function CopyToClipboard({
  children,
  classNames = {},
  string,
  autoHide = false,
  confirmationText = 'COPIED'
}) {
  const classes = useStyles();
  const { Portal } = usePortal();
  const [showTip, setShowTip] = useState(false);
  const timeOut = useRef();

  function handleClick() {
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
      <div className={classes.root} onClick={handleClick}>
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
                className={classes.linkIcon}
                initial={{ y: -1, scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  delay: 0.15
                }}
              >
                <ClipboardIcon size={24} />
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
