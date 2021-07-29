import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Typography, IconButton } from '@material-ui/core';
import { motion } from 'framer-motion';
import { Fullscreen as ExpandIcon } from '@styled-icons/remix-line/Fullscreen';
import cx from 'classnames';
import { FullscreenExit as ExitIcon } from '@styled-icons/remix-fill/FullscreenExit';
import { Restart as RestartIcon } from '@styled-icons/remix-line/Restart';
import Carousel from '../Layout/Carousel';
import Modal from '../Gadgets/Modal';
import GA from '../GA';

const useStyles = makeStyles((theme) => ({
  presentationRoot: {
    width: '100%',
    position: 'relative'
  },
  slide: {
    border: '1px solid',
    borderColor: theme.palette.text.primary.main,
    boxSizing: 'border-box',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    background: 'white',
    width: '100%',
    maxHeight: '100%',
    objectFit: 'cover'
  },
  fullScreenBtn: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '&:hover': {
      '& $icon': {
        opacity: 1,
        transitionDuration: '.2s'
      }
    }
  },
  btnsWrapper: {
    position: 'absolute',
    bottom: theme.spacing(1),
    opacity: 0,
    display: 'inline-flex'
  },
  btnTxt: {
    fontSize: 15,
    marginRight: theme.spacing(1)
  },
  icon: {
    marginTop: -1,
    transition: '1s ease-in-out',
    transformOrigin: 'center left',
    [theme.breakpoints.up('sm')]: {
      opacity: 0.3
    }
  },
  iconButton: {
    marginTop: 8
  },
  gallery: {
    width: '80%',
    marginTop: 18,
    [theme.breakpoints.up('md')]: {
      width: '90%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '80%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '90%'
    }
  }
}));

function Tools({ setFullScreen, onRestart, isFullScreen }) {
  // HOOKS
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <motion.div
      className={classes.btnsWrapper}
      animate={{
        opacity: 1
      }}
      transition={{
        delay: 1
      }}
    >
      {upSm ? (
        <Button
          className={cx(classes.fullScreenBtn)}
          size='small'
          color='secondary'
          onClick={() => {
            setFullScreen(!isFullScreen);
          }}
        >
          <Typography
            className={classes.btnTxt}
            style={{
              color: isFullScreen ? '#FFF' : theme.palette.text.primary.main
            }}
          >
            {isFullScreen ? 'Exit' : 'Full Screen'}
          </Typography>
          {isFullScreen ? (
            <ExitIcon size={24} className={classes.icon} />
          ) : (
            <ExpandIcon size={24} className={classes.icon} />
          )}
        </Button>
      ) : (
        <IconButton
          className={cx(classes.iconButton)}
          color='secondary'
          size='medium'
          onClick={() => {
            setFullScreen(!isFullScreen);
          }}
        >
          {isFullScreen ? (
            <ExitIcon size={24} className={classes.icon} />
          ) : (
            <ExpandIcon size={24} className={classes.icon} />
          )}
        </IconButton>
      )}
      {upSm ? (
        <Button
          size='small'
          color='secondary'
          className={cx(classes.fullScreenBtn)}
          onClick={onRestart}
        >
          <Typography
            className={classes.btnTxt}
            style={{
              color: isFullScreen ? '#FFF' : theme.palette.text.primary.main
            }}
          >
            Restart
          </Typography>
          <RestartIcon size={24} className={classes.icon} />
        </Button>
      ) : (
        <IconButton
          color='secondary'
          onClick={onRestart}
          size='medium'
          className={cx(classes.iconButton)}
        >
          <RestartIcon size={24} className={classes.icon} />
        </IconButton>
      )}
    </motion.div>
  );
}

function Presentation({ slides, gaCategory }) {
  // HOOKS
  const classes = useStyles();
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const slideViewStartTime = useRef(new Date().getTime());

  // METHODS
  function preloadImages() {
    const myimages = new Array();
    for (let i = 0; i < slides.length; i++) {
      myimages[i] = new Image();
      myimages[i].src = slides[i];
    }
  }

  // EFFECTS
  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    if (fullScreen) {
      document.body.style.overflowY = 'hidden';
      document.body.style.overflowX = 'hidden';
      if (gaCategory) {
        GA.event(gaCategory, 'Enter full screen mode');
      }
    } else {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
      if (gaCategory) {
        GA.event(gaCategory, 'Exit full screen mode');
      }
    }
  }, [fullScreen]);

  useEffect(() => {
    const timestamp = new Date().getTime();
    const timeSpent = (timestamp - slideViewStartTime.current) / 1000;
    if (timeSpent >= 1.5 && gaCategory) {
      GA.event(gaCategory, `time spent on slide ${index}`, timeSpent);
    }
    slideViewStartTime.current = timestamp;
  }, [index]);

  return (
    <>
      <div className={classes.presentationRoot}>
        <Carousel
          visibleItems={1.1}
          forceControls
          forceIndex={index}
          onChange={setIndex}
        >
          {slides.map((slide, i) => (
            <img
              src={slide}
              key={i}
              className={classes.slide}
              draggable='false'
            />
          ))}
        </Carousel>
        <Tools
          setFullScreen={setFullScreen}
          isFullScreen={false}
          onRestart={() => {
            setIndex(0);
            if (gaCategory) {
              GA.event(gaCategory, 'Used Restart button');
            }
          }}
        />
      </div>
      <Modal
        show={fullScreen}
        backdropOpacity={1}
        fullScreen
        classNames={{
          modal: classes.gallery
        }}
      >
        <Carousel
          visibleItems={1}
          forceControls
          forceIndex={index}
          spacing={0}
          controsColor={theme.palette.secondary.main}
          onChange={setIndex}
        >
          {slides.map((slide, i) => (
            <img
              src={slide}
              key={`${i}-fullscreen`}
              className={classes.slide}
              draggable='false'
            />
          ))}
        </Carousel>
        <Tools
          setFullScreen={setFullScreen}
          isFullScreen={true}
          onRestart={() => {
            setIndex(0);
            if (gaCategory) {
              GA.event(gaCategory, 'Used Restart button');
            }
          }}
        />
      </Modal>
    </>
  );
}

export default Presentation;
