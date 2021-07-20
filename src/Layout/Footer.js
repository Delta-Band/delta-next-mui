import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import { Typography, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import { default as NextLink } from 'next/link';
import { Linkedin as LinkedinIcon } from '@styled-icons/boxicons-logos/Linkedin';
import Reader from '../Gadgets/Reader';
import Iframe from '../Gadgets/Iframe';
import GA from '../GA';

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
    textDecoration: 'none',
    cursor: 'pointer'
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
    display: 'flex',
    cursor: 'pointer'
  },
  pipe: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}));

function Link({ children, href, color, setOpenReader }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <motion.a
      onClick={() => {
        setOpenReader(href);
      }}
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

function SocialIcon({ children, bgColor, textColor, link }) {
  const classes = useStyles();

  return (
    <motion.a
      href={link}
      target='_blank'
      rel='noopener'
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
    </motion.a>
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
  maxWidth = 1920,
  linkedIn = ''
}) {
  const classes = useStyles();
  const theme = useTheme();
  const upIpad = useMediaQuery(theme.breakpoints.up('ipad'));
  const upLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const upDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const [openReader, setOpenReader] = useState(null);

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
                onClick={() => {
                  GA.event('Footer', 'User clicked on logo link');
                }}
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
            <Link
              href={item.link}
              color={textColor}
              key={item.text}
              setOpenReader={setOpenReader}
            >
              <BigTxt
                onClick={() => {
                  GA.event('Footer', 'User clicked on address link');
                }}
              >
                {item.text}
              </BigTxt>
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
              <BigTxt
                onClick={() => {
                  GA.event('Footer', 'User clicked on phone link');
                }}
              >
                {phone}
              </BigTxt>
            </Link>
          )}
          <Link
            href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`}
            color={textColor}
          >
            <BigTxt
              onClick={() => {
                GA.event('Footer', 'User clicked on email link');
              }}
            >
              {email}
            </BigTxt>
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
            <SocialIcon bgColor={bgColor} textColor={textColor} link={linkedIn}>
              <LinkedinIcon
                size={32}
                color='inherit'
                onClick={() => {
                  GA.event('Footer', 'User clicked linkedIn icon');
                }}
              />
            </SocialIcon>
          </div>
          <div className={classes.privacyAndTermsContainer}>
            <motion.a
              // href={privacyPolicyLink}
              // target='_blank'
              // rel='noopener'
              onClick={() => {
                setOpenReader(privacyPolicyLink);
                GA.event('Footer', 'User clicked on privacy link');
              }}
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
              // href={termsAndConditionsLink}
              // target='_blank'
              // rel='noopener'
              onClick={() => {
                setOpenReader(termsAndConditionsLink);
                GA.event('Footer', 'User clicked on terms link');
              }}
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
      <Reader
        noBleed
        open={openReader}
        onClose={() => {
          setOpenReader(null);
        }}
      >
        <Iframe src={openReader} />
      </Reader>
    </div>
  );
}

export default Footer;
