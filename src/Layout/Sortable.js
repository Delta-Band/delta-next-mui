import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, useMotionValue } from 'framer-motion';
import move from 'array-move';
import { clamp, distance } from '@popmotion/popcorn';

const useStyles = makeStyles((theme) => ({
  sortableRoot: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
}));

const buffer = 5;

function findIndex(i, yOffset, positions) {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  // If moving down
  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > swapOffset) target = i + 1;

    // If moving up
  } else if (yOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
}

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

function Item({ item, i, setPosition, moveItem }) {
  const ref = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const dragOriginY = useMotionValue(0);

  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  return (
    <motion.li
      ref={ref}
      initial={false}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? onTop : flat}
      // whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag='y'
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          // If we're dragging, we want to "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y);
        }

        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return !isDragging;
      }}
    >
      {item}
    </motion.li>
  );
}

function Sortable({ items = [] }) {
  const classes = useStyles();
  const [_items, setItems] = useState(items);

  const positions = useRef([]).current;

  function setPosition(i, offset) {
    positions[i] = offset;
  }

  function moveItem(i, dragOffset) {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setItems(move(_items, i, targetIndex));
  }

  return (
    <ul className={classes.sortableRoot}>
      {_items.map((item, i) => (
        <Item
          key={i}
          i={i}
          item={item}
          setPosition={setPosition}
          moveItem={moveItem}
        />
      ))}
    </ul>
  );
}

export default Sortable;
