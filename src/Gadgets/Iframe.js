import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles((theme) => ({
  iframeRoot: {
    width: '100%',
    height: '100%',
    border: 'none',
    position: 'reltaive',
    overflow: 'hidden'
  },
  iframe: {
    width: '100%',
    height: '100%'
  },
  spinner: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

function Iframe({ src, overflowHidden = false }) {
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <div className={classes.iframeRoot}>
      <iframe
        src={src}
        loading='loading...'
        className={classes.iframe}
        onLoad={() => setLoading(false)}
        marginHeight='0'
        marginWidth='0'
      />
      <motion.div
        className={classes.spinner}
        animate={{
          opacity: loading ? 1 : 0
        }}
      >
        <Loader
          type='Grid'
          color={theme.palette.secondary.main}
          height={50}
          width={50}
        />
      </motion.div>
    </div>
  );
}

export default Iframe;
