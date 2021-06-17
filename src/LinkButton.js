import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  linkBtnRoot: {
    width: '100%',
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textTransform: 'uppercase',
    textAlign: 'center',
    textDecoration: 'none'
  },
  rootSmall: {
    height: 34
  },
  rootLarge: {
    height: 54
  },
  rootXLarge: {
    height: 64
  },
  contrastText: {
    color: theme.palette.primary.contrastText,
    fontSize: 16
  },
  textSmall: {
    fontSize: 12
  },
  textLarge: {
    fontSize: 18
  },
  textXlarge: {
    fontSize: 20
  }
}));

function LinkButton({
  href,
  children,
  small = false,
  large = false,
  xLarge = false,
  disable = false,
  onClick,
  className
}) {
  const classes = useStyles();

  return (
    <a
      className={cx(classes.linkBtnRoot, className, {
        [classes.rootSmall]: small,
        [classes.rootLarge]: large,
        [classes.rootXLarge]: xLarge
      })}
      href={href}
      onClick={onClick}
      rel='noopener noreferrer'
      target='_blank'
      style={
        disable
          ? {
              pointerEvents: 'none'
            }
          : {}
      }
    >
      <Typography
        className={cx(classes.contrastText, {
          [classes.textSmall]: small,
          [classes.textLarge]: large,
          [classes.textXlarge]: xLarge
        })}
      >
        {children}
      </Typography>
    </a>
  );
}

export default LinkButton;
