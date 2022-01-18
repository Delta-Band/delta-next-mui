import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { motion } from 'framer-motion';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link as MuiLink, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px 0',
    color: '#FFF',
    marginTop: theme.spacing(5),
    maxWidth: 440,
    margin: '0 auto',
    [theme.breakpoints.up('xs')]: {
      padding: 0
    }
  },
  textStyle: {
    fontFamily: 'Rubik',
    fontStyle: 'italic',
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      padding: 0
    }
  },
  spacer: {
    marginBottom: theme.spacing(2)
  },
  linkWrapper: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    },
    '&:visited': {
      textDecoration: 'none'
    },
    '&:focus': {
      textDecoration: 'none'
    }
  },
  link: {
    marginLeft: theme.spacing(2),
    borderRadius: 40,
    border: '2px solid rgba(255, 255, 255 , 0.5)',
    padding: '5px 15px'
  },
  opacity: {
    opacity: 0.5
  }
}));

function GridElement({ children }) {
  const classes = useStyles();

  return (
    <Grid
      item
      // xs={12}
      // sm={6}
      className={cx(classes.textStyle)}
    >
      {children}
    </Grid>
  );
}

export default function MadeByDelta() {
  const classes = useStyles();
  // const theme = useTheme();
  // const upXS = useMediaQuery(theme.breakpoints.up('xs'));

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      direction='row'
      justify='space-between'
      alignItems='center'
    >
      <GridElement>
        <div className={classes.opacity}>Made By </div>
        <div>
          <MuiLink
            target='_blank'
            rel='noreferrer'
            href='https://delta.band'
            className={classes.linkWrapper}
          >
            <motion.div
              style={{
                color: '#FFF',
                background: 'rgba(255, 255, 255, 0)'
              }}
              whileHover={{
                background: 'rgba(255, 255, 255, 1)',
                color: '#FF0048'
              }}
              className={classes.link}
            >
              DELTA
            </motion.div>
          </MuiLink>
        </div>
      </GridElement>
      <GridElement>
        <div className={classes.opacity}>Guided by </div>
        <div>
          <MuiLink
            target='_blank'
            rel='noreferrer'
            href='https://rechter.co'
            className={classes.linkWrapper}
          >
            <motion.div
              className={classes.link}
              style={{
                color: '#FFF',
                background: 'rgba(255, 255, 255, 0)'
              }}
              whileHover={{
                background: 'rgba(255, 255, 255, 1)',
                color: '#000'
              }}
            >
              Rechter.
            </motion.div>
          </MuiLink>
        </div>
      </GridElement>
    </Grid>
  );
}
