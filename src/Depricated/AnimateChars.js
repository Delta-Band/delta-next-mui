// import React from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { motion } from 'framer-motion';
// import { Typography, Grid } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   animateCharsRoot: {}
// }));

// const VARIANTS = {
//   CONTAINER: {
//     show: {
//       opacity: 1,
//       y: '100%'
//     },
//     hide: {
//       opacity: 0,
//       y: '0%'
//     }
//   },
//   CHAR: {
//     show: {
//       opacity: 1,
//       y: '100%'
//     },
//     hide: {
//       opacity: 0,
//       y: '0%'
//     }
//   }
// };

// function AnimateChars({ string, show }) {
//   const classes = useStyles();
//   const stringArray = string.split('');

//   return (
//     <motion.div
//       variants={VARIANTS.CONTAINER}
//       initial='hide'
//       animate={show ? 'show' : 'hide'}
//       className={classes.animateCharsRoot}
//     >
//       {stringArray.map((char) => (
//         <motion.div>{char}</motion.div>
//       ))}
//     </motion.div>
//   );
// }

// export default AnimateChars;
