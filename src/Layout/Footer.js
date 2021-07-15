import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import { Typography, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import { Linkedin as LinkedinIcon } from '@styled-icons/boxicons-logos/Linkedin';

const useStyles = makeStyles((theme) => ({
  footerRoot: {
    width: '100%',
    padding: theme.spacing(4),
    boxSizing: 'border-box'
  },
  smallTxt: {
    fontWeight: 100,
    fontSize: 14
  },
  bigTxt: {
    fontSize: 20,
    fontWeight: 700
  },
  link: {
    textDecoration: 'none'
  },
  inheritColor: {
    color: 'inherit'
  },
  title: {
    opacity: 0.5
  },
  alignOpisit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& $inheritColor': {
      display: 'inline-block'
    }
  },
  socialIconWrapper: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(0.5)
  },
  socialLinks: {
    display: 'inline-flex'
  }
}));

function Link({ children, href, color }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <motion.a
      href={href}
      target='_blank'
      rel='noopener'
      className={cx(classes.link)}
      style={{
        color
      }}
      whileHover={{
        color: theme.palette.secondary.main
      }}
    >
      {children}
    </motion.a>
  );
}

function BigTxt({ children }) {
  const classes = useStyles();
  return (
    <Typography className={cx(classes.bigTxt, classes.inheritColor)}>
      {children}
    </Typography>
  );
}

function SocialIcon({ children, bgColor, textColor }) {
  const classes = useStyles();

  return (
    <motion.div
      className={classes.socialIconWrapper}
      style={{
        color: textColor
      }}
      whileHover={{
        backgroundColor: textColor,
        color: bgColor
      }}
    >
      {children}
    </motion.div>
  );
}

function Footer({
  thin = false,
  logo,
  bgColor = '#000',
  textColor = '#FFF',
  lang = 'en',
  companyName,
  visitTxt = 'VISIT US',
  concatTxt = 'CONTACT US',
  titlesFontFamily,
  addressFirstLine = '',
  addressSecondLine = '',
  addressLink,
  phone = '+972 54 12 23',
  email = 'example@brand.com',
  emailSubject = '',
  emailBody = '',
  privacyPolicyLink
}) {
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <div
      className={classes.footerRoot}
      style={{
        backgroundColor: bgColor
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <img src={logo} />
          <Typography
            className={cx(classes.smallTxt)}
            style={{
              color: textColor
            }}
          >
            ©2021. All rights reserved {companyName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={cx(classes.title)}
            style={{
              fontFamily: titlesFontFamily || 'inherit',
              color: textColor
            }}
          >
            {visitTxt}
          </Typography>
          <Link href={addressLink} color={textColor}>
            <BigTxt>{addressFirstLine}</BigTxt>
            <BigTxt>{addressSecondLine}</BigTxt>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={cx(classes.title)}
            style={{
              fontFamily: titlesFontFamily || 'inherit',
              color: textColor
            }}
          >
            {concatTxt}
          </Typography>
          <Link href={`tel:${phone.replace(/\s/g, '')}`} color={textColor}>
            <BigTxt>{phone}</BigTxt>
          </Link>
          <Link
            href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`}
            color={textColor}
          >
            <BigTxt>{email}</BigTxt>
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.alignOpisit}>
          <div
            className={cx(classes.socialLinks)}
            style={{
              color: textColor
            }}
          >
            <SocialIcon bgColor={bgColor} textColor={textColor}>
              <LinkedinIcon size={32} color='inherit' />
            </SocialIcon>
          </div>
          <motion.a
            href={privacyPolicyLink}
            className={cx(classes.privacy)}
            style={{
              textDecorationThickness: 1,
              opacity: 0.5,
              color: textColor
            }}
            whileHover={{
              opacity: 1
            }}
          >
            <Typography className={cx(classes.inheritColor, classes.smallTxt)}>
              Privacy Policy + Terms &amp; Conditions
            </Typography>
          </motion.a>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
