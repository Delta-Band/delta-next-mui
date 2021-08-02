import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, useMotionValue, AnimateSharedLayout } from 'framer-motion';
import move from 'array-move';
import { clamp, distance } from '@popmotion/popcorn';

const useStyles = makeStyles((theme) => ({
  sortableRoot: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    position: 'relative'
  },
  sortableItem: {
    borderRadius: '10px',
    cursor: 'pointer',
    width: '100%',
    position: 'relative'
  }
}));

const buffer = 0;

function findIndex(i, yOffset, positions) {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  // If moving down
  if (yOffset > bottom) {
    target = i + 1;

    // If moving up
  } else if (yOffset < top) {
    target = i - 1;
  }

  return clamp(0, positions.length, target);
}

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

function Item({
  item,
  i,
  setPosition,
  moveItem,
  itemBuilder,
  order,
  onChange
}) {
  const ref = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  return (
    <motion.li
      ref={ref}
      layout
      initial={false}
      className={classes.sortableItem}
      animate={isDragging ? onTop : flat}
      whileTap={{ scale: 1.12 }}
      drag='y'
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        setDragging(false);
        onChange(order);
      }}
      onDrag={(e, { point }) => moveItem(i, point.y)}
    >
      {itemBuilder(item)}
    </motion.li>
  );
}

function Sortable({ items = [], itemBuilder, onChange }) {
  const classes = useStyles();
  const [_items, setItems] = useState(items);
  const ref = useRef(null);

  const positions = useRef([]).current;

  function setPosition(i, offset) {
    positions[i] = offset;
  }

  function moveItem(i, dragOffset) {
    const listOffset = ref.current.offsetTop;
    const targetIndex = findIndex(i, dragOffset - listOffset, positions);
    if (targetIndex !== i) {
      setItems(move(_items, i, targetIndex));
    }
  }

  return (
    <AnimateSharedLayout>
      <motion.ul className={classes.sortableRoot} layout ref={ref}>
        {_items.map((item, i) => (
          <Item
            key={item.id}
            i={i}
            item={item}
            setPosition={setPosition}
            moveItem={moveItem}
            itemBuilder={itemBuilder}
            order={_items}
            onChange={onChange}
          />
        ))}
      </motion.ul>
    </AnimateSharedLayout>
  );
}

export default Sortable;
