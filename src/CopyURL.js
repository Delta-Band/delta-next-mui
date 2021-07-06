import React, { Fragment, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import usePortal from 'react-useportal';
import { Link as LinkIcon } from '@styled-icons/evaicons-solid/Link';

const useStyles = makeStyles((theme) => ({
  tip: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 100%)',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    borderRadius: theme.spacing(5)
  },
  txt: {
    fontSize: 12,
    display: 'inline-flex',
    alignItems: 'center'
  },
  linkIcon: {
    marginRight: theme.spacing(1)
  }
}));

function CopyURL({ children, classNames = {}, url }) {
  const classes = useStyles();
  const { Portal } = usePortal();
  const [showTip, setShowTip] = useState(false);
  const timeOut = useRef();

  function handleClick() {
    navigator.clipboard.writeText(url);
    setShowTip(true);
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      setShowTip(false);
    }, 3000);
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
              <Typography className={cx(classes.txt, classNames.tipTxt)}>
                <LinkIcon size={24} className={classes.linkIcon} /> LINK COPIED
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </Fragment>
  );
}

export default CopyURL;
