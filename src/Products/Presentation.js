import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Typography, IconButton } from '@material-ui/core';
import { motion } from 'framer-motion';
import { Fullscreen as ExpandIcon } from '@styled-icons/remix-line/Fullscreen';
import cx from 'classnames';
import { FullscreenExit as ExitIcon } from '@styled-icons/remix-fill/FullscreenExit';
import { DividerShort as DividerIcon } from '@styled-icons/fluentui-system-regular/DividerShort';
import Carousel from '../Layout/Carousel';
import Modal from '../Gadgets/Modal';
import GA from '../GA';
import DropMenu from '../Gadgets/DropMenu';

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
    justifyContent: 'center',
    '& ::-webkit-scrollbar': {
      width: 0,
      height: 0
    }
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    maxHeight: 'calc(100% - 50px)',
    [theme.breakpoints.up('laptop')]: {
      height: 'calc(100% - 50px)'
    },
    [theme.breakpoints.up('desktop')]: {
      height: 'calc(100% - 60px)'
    }
  },
  carousel: {
    height: '100%'
  },
  slider: {
    maxHeight: '100%',
    [theme.breakpoints.up('laptop')]: {
      height: '100%'
    }
  },
  slide: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: 'white',
    width: '100%',
    maxHeight: '100%',
    objectFit: 'fill',
    [theme.breakpoints.up('laptop')]: {
      height: '100%'
    }
  },
  menuRoot: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    overflowY: 'auto',
    flexShrink: 0,
    height: 50,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    boxSizing: 'border-box',
    [theme.breakpoints.up('ipad')]: {
      height: 50
    },
    [theme.breakpoints.up('laptop')]: {
      height: 60
    },
    [theme.breakpoints.up('desktop')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    [theme.breakpoints.up('widescreen')]: {}
  },
  menuItem: {
    flexShrink: 0,
    '& .MuiButton-label': {
      [theme.breakpoints.up('ipad')]: {
        fontSize: 16
      }
    }
  },
  active: {
    // color: theme.palette.secondary.main,
    '& .MuiButton-label': {
      color: `${theme.palette.secondary.main} !important`
    }
  },
  divider: {
    flexShrink: 0,
    mrginLeft: 2,
    mrginRight: 2,
    opacity: 0.3,
    transform: 'translateY(-1px)'
  }
}));

function SlideMenu({ setIndex, index, slides, classNames }) {
  const classes = useStyles();
  const slidMenuRef = useRef();

  useEffect(() => {
    if (!slidMenuRef) return;
    const buttons = Array.from(slidMenuRef.current.children).filter(
      (child) => child.type === 'button'
    );
    const offsetLeft = buttons[index].offsetLeft;
    slidMenuRef.current.scroll({ left: offsetLeft - 50, behavior: 'smooth' });
  }, [index]);

  return (
    <div className={classes.menuRoot} ref={slidMenuRef}>
      {slides.map((slide, i) => (
        <>
          <Button
            key={i}
            className={cx(classes.menuItem, classNames.menuBtn, {
              [classes.active]: index === i
            })}
            key={i}
            size='small'
            onClick={() => {
              setIndex(i);
            }}
          >
            {slide.label}
          </Button>
          {i < slides.length - 1 && (
            <DividerIcon
              size={26}
              color
              className={cx(classes.divider, classNames.menuBtn)}
            />
          )}
        </>
      ))}
    </div>
  );
}

function Presentation({
  slides,
  gaCategory,
  classNames = {
    menuBtn: undefined
  }
}) {
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
        <div className={classes.carouselContainer}>
          <Carousel
            visibleItems={1}
            hideControls
            controllsOnTop
            forceIndex={index}
            onChange={setIndex}
            spacing={0}
            className={classes.carousel}
            speed={1}
            // moreControlls={
            //   <SlideMenu setIndex={setIndex} index={index} slides={slides} />
            // }
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
        </div>

        <SlideMenu
          setIndex={setIndex}
          index={index}
          slides={slides}
          classNames={classNames}
        />
      </div>
    </>
  );
}

export default Presentation;
