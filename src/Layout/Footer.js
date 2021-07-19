import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import { Typography, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import { default as NextLink } from 'next/link';
import { Linkedin as LinkedinIcon } from '@styled-icons/boxicons-logos/Linkedin';

const useStyles = makeStyles((theme) => ({
  footerRoot: {
    width: '100%',
    padding: theme.spacing(4),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('laptop')]: {
      padding: '4vw',
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(5)
    }
  },
  gridItem: {
    height: '100%'
  },
  logo: {
    [theme.breakpoints.up('ipad')]: {}
  },
  smallTxt: {
    fontWeight: 100,
    fontSize: 14,
    lineHeight: 2.5
  },
  bigTxt: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.8
  },
  link: {
    textDecoration: 'none'
  },
  inheritColor: {
    color: 'inherit'
  },
  title: {
    opacity: 0.5,
    marginBottom: theme.spacing(1),
    lineHeight: '1.2em',
    fontSize: 16,
    [theme.breakpoints.up('ipad')]: {
      marginTop: theme.spacing(1)
    }
  },
  alignOpisit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& $inheritColor': {
      display: 'inline-block'
    },
    [theme.breakpoints.up('ipad')]: {
      alignItems: 'flex-start'
    },
    [theme.breakpoints.up('desktop')]: {
      alignItems: 'flex-start',
      alignItems: 'flex-end'
    }
  },
  socialIconWrapper: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer'
  },
  socialLinks: {
    display: 'inline-flex'
  },
  privacyAndTermsContainer: {
    display: 'flex'
  },
  pipe: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
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
  address = [],
  phone,
  email = 'example@brand.com',
  emailSubject = '',
  emailBody = '',
  privacyPolicyLink,
  termsAndConditionsLink,
  maxWidth = 1920
}) {
  const classes = useStyles();
  const theme = useTheme();
  const upIpad = useMediaQuery(theme.breakpoints.up('ipad'));
  const upLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const upDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  return (
    <div
      className={classes.footerRoot}
      style={{
        backgroundColor: bgColor
      }}
    >
      <Grid
        container
        spacing={4}
        direction='row'
        justify='space-between'
        alignItems='flex-start'
        style={{
          maxWidth: maxWidth
        }}
      >
        <Grid
          item
          xs={upLaptop ? 'auto' : upIpad ? 6 : 12}
          className={classes.gridItem}
        >
          <NextLink href='/'>
            <a>
              <motion.img
                style={{
                  transformOrigin: 'left center'
                }}
                whileHover={{
                  scale: 1.1
                }}
                src={logo}
                className={classes.logo}
              />
            </a>
          </NextLink>
          <Typography
            className={cx(classes.smallTxt)}
            style={{
              color: textColor
            }}
          >
            ©2021. All rights reserved {companyName}
          </Typography>
        </Grid>
        <Grid
          item
          xs={upLaptop ? 'auto' : upIpad ? 6 : 12}
          className={classes.gridItem}
        >
          <Typography
            className={cx(classes.title)}
            style={{
              fontFamily: titlesFontFamily || 'inherit',
              color: textColor
            }}
          >
            {visitTxt}
          </Typography>
          {address.map((item) => (
            <Link href={item.link} color={textColor} key={item.text}>
              <BigTxt>{item.text}</BigTxt>
            </Link>
          ))}
        </Grid>
        <Grid
          item
          xs={upLaptop ? 'auto' : upIpad ? 6 : 12}
          className={classes.gridItem}
        >
          <Typography
            className={cx(classes.title)}
            style={{
              fontFamily: titlesFontFamily || 'inherit',
              color: textColor
            }}
          >
            {concatTxt}
          </Typography>
          {phone && (
            <Link href={`tel:${phone.replace(/\s/g, '')}`} color={textColor}>
              <BigTxt>{phone}</BigTxt>
            </Link>
          )}
          <Link
            href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`}
            color={textColor}
          >
            <BigTxt>{email}</BigTxt>
          </Link>
        </Grid>
        <Grid
          item
          xs={upDesktop ? 'auto' : upIpad ? 6 : 12}
          className={cx(classes.alignOpisit, classes.gridItem)}
        >
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
          <div className={classes.privacyAndTermsContainer}>
            <motion.a
              href={privacyPolicyLink}
              target='_blank'
              rel='noopener'
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
              <Typography
                className={cx(classes.inheritColor, classes.smallTxt)}
              >
                Privacy Policy
              </Typography>
            </motion.a>
            <Typography
              className={cx(classes.pipe, classes.smallTxt)}
              style={{
                color: textColor
              }}
            >
              |
            </Typography>
            <motion.a
              href={termsAndConditionsLink}
              target='_blank'
              rel='noopener'
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
              <Typography
                className={cx(classes.inheritColor, classes.smallTxt)}
              >
                Terms &amp; Conditions
              </Typography>
            </motion.a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
