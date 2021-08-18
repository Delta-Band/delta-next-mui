import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import cx from 'classnames';
import { Next as NextIcon } from '@styled-icons/fluentui-system-regular/Next';
import { Previous as PreviousIcon } from '@styled-icons/fluentui-system-regular/Previous';
import { DividerShort as DividerIcon } from '@styled-icons/fluentui-system-regular/DividerShort';
import debounce from 'lodash/debounce';
import Carousel from '../Layout/Carousel';
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
    height: '100%'
  },
  slide: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: 'white',
    width: '100%',
    height: '100%',
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
  },
  controlers: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  controlerHotZone: {
    height: '100%',
    width: '33%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(2px)',
    boxSizing: 'border-box'
  },
  left: {
    borderRight: '2px solid #000'
  },
  right: {
    borderLeft: '2px solid #000'
  },
  disable: {
    pointerEvents: 'none'
  },
  controllerIconWrapper: {
    padding: theme.spacing(10),
    borderRadius: theme.spacing(20)
  },
  controllerIcon: {
    color: '#000',
    transform: 'traslateY(-5%)'
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
    slidMenuRef.current.scroll({
      left: offsetLeft - Math.max(window.innerWidth * 0.01, 100),
      behavior: 'smooth'
    });
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

function Controllers({ index, setIndex, slidesCount }) {
  const classes = useStyles();

  return (
    <div className={classes.controlers}>
      <motion.div
        className={cx(classes.controlerHotZone, classes.left, {
          [classes.disable]: index === 0
        })}
        initial={{
          opacity: 0
        }}
        whileHover={{
          opacity: index > 0 ? 1 : 0
        }}
        whileTap={{
          opacity: index > 0 ? 1 : 0
        }}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      >
        <div className={classes.controllerIconWrapper}>
          <PreviousIcon size={62} className={classes.controllerIcon} />
        </div>
      </motion.div>
      <motion.div
        className={cx(classes.controlerHotZone, classes.right, {
          [classes.disable]: index === slidesCount - 1
        })}
        initial={{
          opacity: 0
        }}
        whileHover={{
          opacity: index < slidesCount - 1 ? 1 : 0
        }}
        onClick={() => {
          if (index < slidesCount - 1) {
            setIndex(index + 1);
          }
        }}
      >
        <div className={classes.controllerIconWrapper}>
          <NextIcon size={62} className={classes.controllerIcon} />
        </div>
      </motion.div>
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
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const slideViewStartTime = useRef(new Date().getTime());

  function preloadImages() {
    const myimages = new Array();
    for (let i = 0; i < slides.length; i++) {
      myimages[i] = new Image();
      myimages[i].src = slides[i];
    }
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 39:
        setIndex((prevIndex) => Math.min(prevIndex + 1, slides.length - 1));
        break;
      case 37:
        setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    preloadImages();
    window.addEventListener('keydown', onKeyDown);
    return function () {
      return window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

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
          <Controllers
            index={index}
            setIndex={setIndex}
            slidesCount={slides.length}
          />
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
