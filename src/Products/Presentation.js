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
    height: '100%',
    position: 'fixed',
    background: '#000',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  carousel: {
    maxHeight: '100%'
  },
  slider: {
    maxHeight: 'calc(100% - 56px)'
  },
  slide: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: 'white',
    width: '100%',
    maxHeight: '100%',
    objectFit: 'fit'
  },
  menuRoot: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 1,
    paddingRight: theme.spacing(25),
    boxSizing: 'border-box',
    pointerEvents: 'none'
  },
  btnTxt: {
    fontSize: 15,
    marginRight: theme.spacing(1)
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
  },
  textColor: {
    color: '#FFF'
  }
}));

function SlideMenu() {
  const classes = useStyles();

  return (
    <div className={classes.menuRoot}>
      <Typography className={classes.textColor}>Slide Menu</Typography>
    </div>
  );
}

function Tools({ setFullScreen, onRestart, isFullScreen }) {
  // HOOKS
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <motion.div
      className={classes.toolsRoot}
      animate={{
        opacity: 1
      }}
      transition={{
        delay: 1
      }}
    >
      <SlideMenu />
      {/* <div>
        <IconButton
          color='secondary'
          onClick={() => {
            setFullScreen(!isFullScreen);
          }}
        >
          {isFullScreen ? <ExitIcon size={32} /> : <ExpandIcon size={32} />}
        </IconButton>
        <IconButton color='secondary' onClick={onRestart}>
          <RestartIcon size={26} />
        </IconButton>
      </div> */}
    </motion.div>
  );
}

function SlideManager({
  slides,
  index,
  setIndex,
  setFullScreen,
  gaCategory,
  fullScreen
}) {
  const classes = useStyles();

  return (
    <>
      {/* <Tools
        setFullScreen={setFullScreen}
        isFullScreen={fullScreen}
        onRestart={() => {
          setIndex(0);
          if (gaCategory) {
            GA.event(gaCategory, 'Used Restart button');
          }
        }}
      /> */}
      <Carousel
        visibleItems={1}
        forceControls
        controllsOnTop
        forceIndex={index}
        onChange={setIndex}
        spacing={0}
        className={classes.carousel}
        // speed={0}
        moreControlls={<SlideMenu />}
        sliderClassName={classes.slider}
        objectFit='fit'
      >
        {slides.map((slide, i) => (
          <img
            src={slide.image}
            key={i}
            className={classes.slide}
            draggable='false'
          />
        ))}
      </Carousel>
    </>
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
        <SlideManager
          slides={slides}
          index={index}
          setIndex={setIndex}
          setFullScreen={setFullScreen}
          gaCategory={gaCategory}
        />
      </div>
      {/* <Modal
        show={fullScreen}
        backdropOpacity={1}
        fullScreen
        classNames={{
          modal: classes.gallery
        }}
      >
        <SlideManager
          slides={slides}
          index={index}
          setIndex={setIndex}
          setFullScreen={setFullScreen}
          gaCategory={gaCategory}
          fullScreen
        />
      </Modal> */}
    </>
  );
}

export default Presentation;
