import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ReactSortable } from 'react-sortablejs';
import isEqual from 'lodash/isEqual';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import move from 'array-move';
import { clamp } from '@popmotion/popcorn';

const useStyles = makeStyles((theme) => ({
  sortableRoot: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    position: 'relative'
  },
  sortableItem: {
    cursor: 'pointer',
    width: '100%',
    position: 'relative',
    border: '2px solid',
    borderColor: 'transparent',
    overflow: 'hidden',
    '&.sortable-gost': {
      borderColor: theme.palette.primary.main
    }
  }
}));

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
      layout
      ref={ref}
      layout
      initial={false}
      className={classes.sortableItem}
      style={{
        zIndex: isDragging ? 1 : 0
      }}
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

function SortableList({
  items = [],
  itemBuilder,
  onChange = console.log,
  itemRadius = 7
}) {
  const classes = useStyles();
  const [_items, setItems] = useState(items);
  const ref = useRef(null);
  const idList = useRef(_items.map((item) => item.id));

  useEffect(() => {
    setItems(items);
    idList.current = items.map((item) => item.id);
  }, [items]);

  useEffect(() => {
    const _idList = _items.map((item) => item.id);
    if (!isEqual(idList.current, _idList)) {
      onChange(
        _items.map((itm) => {
          delete itm.chosen;
          return itm;
        })
      );
      idList.current = _idList;
    }
  }, [_items]);

  return (
    <ReactSortable
      list={_items}
      setList={setItems}
      animation={200}
      delayOnTouchStart={true}
      delay={2}
      ghostClass='sortable-gost'
    >
      {_items.map((item) => (
        <div
          key={item.id}
          className={classes.sortableItem}
          style={{ borderRadius: itemRadius }}
        >
          {itemBuilder(item)}
        </div>
      ))}
    </ReactSortable>
  );
}

export default SortableList;
