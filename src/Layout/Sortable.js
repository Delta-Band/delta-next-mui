import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    position: 'relative',
    border: '2px solid',
    borderColor: 'transparent'
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

function getCoords(elem) {
  // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

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
  const theme = useTheme();
  const [isDragging, setDragging] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const cords = getCoords(ref.current);
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: cords.top
    });
  });

  return (
    <motion.li
      ref={ref}
      layout
      initial={false}
      className={classes.sortableItem}
      animate={isDragging ? onTop : flat}
      whileTap={{ borderColor: theme.palette.primary.main }}
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

  useEffect(() => {
    setItems(items);
  }, [items]);

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
