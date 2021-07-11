import React, { useRef, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useVisible } from 'react-hooks-visible';
import ReactGA from 'react-ga';
import { ArrowLeft as ChevronLeft } from '@styled-icons/bootstrap/ArrowLeft';
import { ArrowRight as ChevronRight } from '@styled-icons/bootstrap/ArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      overflow: 'hidden'
    }
  },
  slider: {
    width: '100%',
    display: 'inline-flex'
  },
  item: {
    flexShrink: 0,
    '& > *': {
      width: '100%'
    }
  },
  disableChildren: {
    '& > * > *': {
      pointerEvents: 'none'
    }
  },
  carouselControls: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  condensed: {
    width: theme.spacing(10),
    float: 'right'
  },
  btn: {
    cursor: 'pointer'
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  btn: {
    enable: {
      opacity: 1
    },
    disable: {
      opacity: 0
    }
  }
};

function CarouselItem({ children, itemWidth, spacing }) {
  const [targetRef, visible] = useVisible();
  const classes = useStyles();

  return (
    <motion.div
      ref={targetRef}
      className={cx(classes.item, { [classes.disableChildren]: visible < 0.9 })}
      animate={{
        opacity: visible <= 0.6 ? 0.4 : 1,
        filter: visible <= 0.6 ? 'grayscale(1)' : 'grayscale(0)',
        transition: {
          duration: visible <= 0.6 ? 0.2 : 0
        }
      }}
      style={{
        width: itemWidth - spacing,
        marginRight: spacing
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Carousel({
  children,
  className,
  leftControll = null,
  rightControll = null,
  visibleItems = 1.5,
  spacing = 16,
  debug = false,
  peekLeft = 16 / 2,
  gaEventId = 'not_scpecified',
  controlsVariant = 'spread',
  forceControls = false,
  onItemWidthChange = () => {}
}) {
  const classes = useStyles();
  const myRef = useRef();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const [index, setIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const clientXRef = useRef(0);
  const clientXMoveRef = useRef(0);
  const reachedTheEnd = useRef(false);
  const docBody = useRef();
  const timeout = useRef();
  const timeout2 = useRef();
  const visItems = useRef(visibleItems);
  reachedTheEnd.current = index >= children.length - visItems.current;

  const onSwipedLeft = () => {
    if (reachedTheEnd.current) return;
    setIndex((index) =>
      Math.min(children.length - 1, Math.floor(index + visItems.current))
    );
    gaEvent();
  };

  const onSwipedRight = () => {
    setIndex((index) => Math.max(0, Math.ceil(index - visItems.current)));
    gaEvent();
  };

  function gaEvent() {
    ReactGA.event({
      category: 'Carousel',
      action: 'User has interacted with a carousel',
      label: gaEventId
    });
  }

  function init() {
    if (!myRef.current) return;
    const containerRect = myRef.current.getBoundingClientRect();
    setContainerWidth(containerRect.width);
    // if (debug) {
    //   console.log('containerRect.width: ', containerRect.width);
    //   console.log('visibleItems: ', visibleItems);
    //   console.log(
    //     'itemWidth: ',
    //     Math.floor(containerRect.width / visibleItems)
    //   );
    // }
    // setItemWidth(Math.floor(containerRect.width / visibleItems));
  }

  const initDebounced = debounce(init, 250);

  function preventScroll(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  function onTouchStart(e) {
    clientXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    clientXMoveRef.current = e.touches ? e.touches[0].clientX : e.clientX;
  }

  function onTouchEnd() {
    docBody.current.removeEventListener('touchmove', preventScroll, true);
    if (clientXMoveRef.current - clientXRef.current < -30) {
      onSwipedLeft();
    } else if (clientXMoveRef.current - clientXRef.current > 30) {
      onSwipedRight();
    }
    clientXRef.current = clientXMoveRef.current;
  }

  function onTouchMove(e) {
    clientXMoveRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    if (Math.abs(clientXMoveRef.current - clientXRef.current) > 10) {
      docBody.current.addEventListener('touchmove', preventScroll, true);
    }
  }

  /** EFFECTS */

  useEffect(() => {
    setItemWidth(Math.floor(containerWidth / visItems.current));
  }, [containerWidth]);

  useEffect(() => {
    if (debug) {
      console.log('itemWidth: ', itemWidth);
    }
    setXPos(
      -index * itemWidth +
        (index === 0 ? 0 : (itemWidth * (visibleItems - 1)) / 2 + spacing / 2)
    );
    onItemWidthChange(itemWidth - spacing);
  }, [index, itemWidth]);

  useEffect(() => {
    timeout.current = setTimeout(init, 1000);
    window.addEventListener('resize', initDebounced);
    docBody.current = document.body;
    myRef.current.addEventListener('touchstart', onTouchStart, true);
    // myRef.current.addEventListener('mousedown', onTouchStart, true);
    myRef.current.addEventListener('touchmove', onTouchMove, true);
    // myRef.current.addEventListener('mousemove', onTouchMove, true);
    myRef.current.addEventListener('touchend', onTouchEnd, true);
    // myRef.current.addEventListener('mouseup', onTouchEnd, true);
    return () => {
      window.removeEventListener('resize', initDebounced);
      clearTimeout(timeout.current);
      if (myRef.current) {
        myRef.current.removeEventListener('touchstart', onTouchStart, true);
        // myRef.current.removeEventListener('mousedown', onTouchStart, true);
        myRef.current.removeEventListener('touchmove', onTouchMove, true);
        // myRef.current.removeEventListener('mousemove', onTouchMove, true);
        myRef.current.removeEventListener('touchend', onTouchMove, true);
        // myRef.current.removeEventListener('mouseup', onTouchMove, true);
      }
      if (docBody.current) {
        docBody.current.removeEventListener('touchend', onTouchEnd, true);
        // docBody.current.removeEventListener('mouseup', onTouchMove, true);
      }
    };
  }, []);

  useEffect(() => {
    timeout2.current = setTimeout(init, 1000);
    visItems.current = visibleItems;
    return () => {
      clearTimeout(timeout.current2);
    };
  }, [visibleItems]);

  return (
    <div className={cx(classes.root, className)} ref={myRef}>
      <motion.div
        className={classes.slider}
        animate={{ x: xPos }}
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.25 * visItems.current
        }}
      >
        {children.map((child, i) => (
          <CarouselItem key={i} spacing={spacing} itemWidth={itemWidth}>
            {child}
          </CarouselItem>
        ))}
      </motion.div>
      {(upMd || forceControls) && (
        <div
          className={cx(classes.carouselControls, {
            [classes.condensed]: upMd && controlsVariant === 'condensed'
          })}
        >
          <div>
            <motion.div
              variants={MOTION_VARIANTS.btn}
              className={classes.btn}
              onClick={onSwipedRight}
              initial='disable'
              whileHover={{
                scale: upMd ? 1.3 : 1
              }}
              animate={index === 0 ? 'disable' : 'enable'}
              style={{
                transformOrigin: 'center left',
                pointerEvents: index === 0 ? 'none' : 'all'
              }}
            >
              {leftControll || <ChevronLeft size={32} />}
            </motion.div>
          </div>
          <div>
            <motion.div
              variants={MOTION_VARIANTS.btn}
              className={classes.btn}
              onClick={onSwipedLeft}
              initial='disable'
              whileHover={{
                scale: upMd ? 1.3 : 1
              }}
              animate={reachedTheEnd.current ? 'disable' : 'enable'}
              style={{
                transformOrigin: 'center right',
                pointerEvents:
                  index >= children.length - visItems.current ? 'none' : 'all'
              }}
            >
              {rightControll || <ChevronRight size={32} />}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
