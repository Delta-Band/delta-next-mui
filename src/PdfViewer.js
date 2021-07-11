import React, { useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Carousel from './Carousel';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  canvas: {
    border: '1px solid',
    borderColor: theme.palette.text.primary.main,
    boxSizing: 'border-box',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    background: 'white'
  }
}));

function PdfViewer({ file }) {
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(0);
  const inputRef = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    // resize();
  }

  // function resize() {
  //   if (!inputRef.current) return;
  //   const rect = inputRef.current.getBoundingClientRect();
  //   setWidth(rect.width - 1);
  // }

  // const initResize = debounce(resize, 250);

  // useEffect(() => {
  //   window.addEventListener('resize', initResize);

  //   return () => {
  //     window.removeEventListener('resize', initResize);
  //   };
  // }, []);

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
          controlsVariant='condensed'
          onItemWidthChange={(width) => {
            setWidth(width - 2);
          }}
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
      </Document>
    </div>
  );
}

export default PdfViewer;
