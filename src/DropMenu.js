import React, { useState } from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';
// import { Typography, Grid } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {}
// }));

function DropMenu({ id, trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  // const classes = useStyles();
  // const theme = useTheme();

  return (
    <div onMouseLeave={() => setIsOpen(false)}>
      <div onMouseEnter={() => setIsOpen(true)}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: '20%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '20%' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropMenu;
