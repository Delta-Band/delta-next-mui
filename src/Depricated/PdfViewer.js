import React, { useState, useRef, useEffect } from 'react';
import usePortal from 'react-useportal';
import { Document, Page, pdfjs } from 'react-pdf';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AnimatePresence, motion } from 'framer-motion';
import cx from 'classnames';
import { Button, IconButton, Typography } from '@material-ui/core';
import { Expand as ExpandIcon } from '@styled-icons/fa-solid/Expand';
import { FullscreenExit as ExitIcon } from '@styled-icons/material/FullscreenExit';
import { ChevronUpCircle as ChevronUp } from '@styled-icons/boxicons-solid/ChevronUpCircle';
import { RestartAlt as RestartIcon } from '@styled-icons/material/RestartAlt';
import { ArrowLeft as ChevronLeft } from '@styled-icons/bootstrap/ArrowLeft';
import { ArrowRight as ChevronRight } from '@styled-icons/bootstrap/ArrowRight';
import Carousel from './Carousel';
import Gallery from './Gallery';
import GA from '../GA';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative'
  },
  canvas: {
    border: '1px solid',
    borderColor: theme.palette.text.primary.main,
    boxSizing: 'border-box',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    background: 'white'
  },
  galleryWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gallery: {
    position: 'absolute'
  },
  canvasFullScreen: {
    border: '1px solid',
    borderColor: theme.palette.text.primary.main,
    boxSizing: 'border-box',
    borderRadius: theme.spacing(1),
    // position: 'absolute !important',
    background: 'white',
    height: '100%',
    flexShrink: 0,
    transformOrigin: 'top left'
  },
  fullScreenPageContainer: {
    display: 'inline-flex'
  },
  fullScreenBtn: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: 'absolute',
    bottom: 0,
    '&:hover': {
      '& $expandIcon': {
        opacity: 1,
        transitionDuration: '.2s'
      }
    }
  },
  expandIcon: {
    marginLeft: theme.spacing(1),
    marginTop: -1,
    transition: '1s ease-in-out',
    transformOrigin: 'center left',
    opacity: 0.3
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const toolsStyles = makeStyles((theme) => ({
  tools: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: theme.spacing(7),
    width: '100%',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  toolsInner: {
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(2px)',
    width: '100%',
    height: '100%',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(2),
    boxSizing: 'border-box'
  },
  toggle: {
    zIndex: 1
  },
  chveron: {
    color: theme.palette.secondary.main
  },
  btnTxt: {
    fontSize: 15,
    color: '#FFF'
  },
  exitIcon: {
    marginLeft: theme.spacing(0.5),
    margintop: -1
  },
  marginRight: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2)
    }
  },
  arrows: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
    // width: theme.spacing(10)
  }
}));

function Tools({ onLeft, onRight, onExit, onRestart, gaCategory }) {
  const classes = toolsStyles();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (gaCategory) {
      GA.event(gaCategory, `${show ? 'Opened' : 'Closed'} Full Screen Tools`);
    }
  }, [show]);

  return (
    <div className={classes.tools}>
      <motion.div
        className={classes.toolsInner}
        animate={{
          y: show ? '0%' : '100%'
        }}
      >
        <div>
          <Button
            size='small'
            color='secondary'
            className={cx(classes.btn, classes.marginRight)}
            onClick={onExit}
          >
            <Typography className={classes.btnTxt}>Exit</Typography>{' '}
            <ExitIcon size={24} className={classes.exitIcon} color='#FFF' />
          </Button>
          <Button
            size='small'
            color='secondary'
            className={classes.btn}
            onClick={onRestart}
          >
            <Typography className={classes.btnTxt}>Restart</Typography>{' '}
            <RestartIcon size={24} className={classes.exitIcon} color='#FFF' />
          </Button>
        </div>
        <div className={classes.arrows}>
          <IconButton color='secondary' onClick={onLeft}>
            <ChevronLeft size={32} color='#FFF' />
          </IconButton>
          <IconButton color='secondary' onClick={onRight}>
            <ChevronRight size={32} color='#FFF' />
          </IconButton>
        </div>
      </motion.div>
      <IconButton
        className={classes.toggle}
        onClick={() => {
          setShow(!show);
        }}
      >
        <motion.div
          animate={{
            rotate: show ? 180 : 0
          }}
        >
          <ChevronUp size={36} className={classes.chveron} />
        </motion.div>
      </IconButton>
    </div>
  );
}

function PdfViewer({ file, gaCategory }) {
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));
  const [numPages, setNumPages] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [width, setWidth] = useState(0);
  const inputRef = useRef();
  const pageViewStartTime = useRef(new Date().getTime());
  const { Portal } = usePortal();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function GoFullScreenBtn() {
    return (
      <Button
        className={classes.fullScreenBtn}
        size='small'
        onClick={() => {
          setFullScreen(true);
        }}
      >
        Full Screen <ExpandIcon size={18} className={classes.expandIcon} />
      </Button>
    );
  }

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
    const timeSpent = (pageViewStartTime - timestamp) / 1000;
    if (timeSpent >= 2 && gaCategory) {
      GA.event(gaCategory, `time spent on slide ${slide}`, timeSpent);
    }
    pageViewStartTime.current = timestamp;
  }, [slide]);

  return (
    <div className={classes.root}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        inputRef={inputRef}
      >
        <Carousel
          visibleItems={1.1}
          forceControls
          forceIndex={slide}
          onItemWidthChange={(width) => {
            setWidth(width - 2);
          }}
          onChange={setSlide}
        >
          {[...Array(numPages)].map((j, i) => (
            <Page
              key={i}
              className={classes.canvas}
              pageNumber={i + 1}
              width={width}
            />
          ))}
          {}
        </Carousel>
        <GoFullScreenBtn />
      </Document>
      <AnimatePresence>
        {fullScreen && (
          <motion.div
            className={cx(classes.backdrop)}
            initial={{ opacity: 0 }}
            // animate={{ opacity: fullScreen ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Document
              className={classes.galleryWrapper}
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              inputRef={inputRef}
            >
              <Gallery
                className={classes.gallery}
                forcePage={slide}
                onChange={setSlide}
              >
                {[...Array(numPages)].map((j, i) => (
                  <Page
                    key={i}
                    className={classes.canvas}
                    pageNumber={i + 1}
                    width={width * 1.1}
                  />
                ))}
                {}
              </Gallery>
            </Document>
            <Tools
              onLeft={() => {
                setSlide(Math.max(0, slide - 1));
                if (gaCategory) {
                  GA.event(gaCategory, 'Used arrows to navigate');
                }
              }}
              onRight={() => {
                setSlide(Math.min(numPages - 1, slide + 1));
                if (gaCategory) {
                  GA.event(gaCategory, 'Used arrows to navigate');
                }
              }}
              onExit={() => setFullScreen(false)}
              onRestart={() => {
                setSlide(0);
                if (gaCategory) {
                  GA.event(gaCategory, 'Used Restart button');
                }
              }}
              gaCategory={gaCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PdfViewer;