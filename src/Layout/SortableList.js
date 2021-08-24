import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ReactSortable } from 'react-sortablejs';
import isEqual from 'lodash/isEqual';

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
    // '&.sortable-ghost': {
    //   borderColor: theme.palette.primary.main
    // }
    '&.sortable-chosen': {
      borderColor: theme.palette.primary.main
    },
    '&.sortable-drag': {
      borderColor: 'transparent'
    }
  }
}));

function SortableList({
  items = [],
  itemBuilder,
  onChange = console.log,
  itemRadius = 7
}) {
  const classes = useStyles();
  const [_items, setItems] = useState(items);
  const ref = useRef(null);
  const theme = useTheme();
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
      ghostClass='sortable-ghost'
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
