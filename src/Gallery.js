import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';
import { wrap } from 'popmotion';

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    display: 'inline-flex'
  },
  galleryItem: {
    flexShrink: 0,
    width: '100%'
  }
}));

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? '100vw' : '-100vw',
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100vw' : '-100vw',
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Gallery = ({
  children,
  className,
  infinte = false,
  forcePage = 0,
  onChange = () => {}
}) => {
  // HOOKS
  const [[page, direction], setPage] = useState([forcePage, 0]);
  const classes = useStyles();

  const imageIndex = infinte ? wrap(0, children.length, page) : page;

  // METHODS
  function paginate(newDirection) {
    if (infinte) {
      setPage([page + newDirection, newDirection]);
    } else if (
      page + newDirection < children.length &&
      page + newDirection > -1
    ) {
      setPage([page + newDirection, newDirection]);
    }
  }

  // EFFECTS
  useEffect(() => {
    if (forcePage != page) {
      debugger;
      setPage([forcePage, forcePage - page]);
    }
  }, [forcePage]);

  useEffect(() => {
    if (forcePage !== page) {
      onChange(page);
    }
  }, [page]);

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          className={cx(classes.galleryContainer, className)}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <div className={classes.galleryItem}>{children[imageIndex]}</div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Gallery;
