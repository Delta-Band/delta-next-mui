import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';

const useStyles = makeStyles((theme) => ({}));

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
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
      x: direction < 0 ? 1000 : -1000,
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
  forcePage = null,
  onChange = () => {}
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const classes = useStyles();

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = infinte ? wrap(0, children.length, page) : page;

  const paginate = (newDirection) => {
    if (infinte) {
      setPage([page + newDirection, newDirection]);
    } else if (
      page + newDirection < children.length &&
      page + newDirection > -1
    ) {
      setPage([page + newDirection, newDirection]);
    }
  };

  useEffect(() => {
    if (forcePage != null && forcePage != page) {
      setPage([forcePage, forcePage - page]);
    }
  }, [forcePage]);

  useEffect(() => {
    onChange(page);
  }, [page]);

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          className={className}
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
          {children[imageIndex]}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Gallery;
