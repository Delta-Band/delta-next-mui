// import React, { useRef, useState, useEffect } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { ReactSortable } from 'react-sortablejs';
// import isEqual from 'lodash/isEqual';
import Sortable from 'sortablejs';

const useStyles = makeStyles(theme => ({
  sortableRoot: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    position: 'relative'
  },
  sortableItem: {
    boxSizing: 'border-box',
    '&.sortable-drag': {
      border: '2px solid',
      borderColor: theme.palette.error.main
    },
    '&.sortable-ghost': {
      zIndex: 1,
      position: 'relative'
    }
  }
}));

function DragableItem({ children }) {
  const classes = useStyles();

  return <li className={cx(classes.sortableItem)}>{children}</li>;
}

function SortableList({
  items = [],
  itemBuilder,
  onChange = console.log,
  sort = true
}) {
  const classes = useStyles();
  const listRef = useRef();
  const [_items, setItems] = useState(items);
  const itmsRef = useRef(items);
  const sortable = useRef(null);

  useEffect(() => {
    sortable.current = new Sortable(listRef.current, {
      sort,
      animation: 300,
      onEnd: evt => {
        if (evt.newIndex === evt.oldIndex) return;
        let newOrder;
        if (evt.newIndex > evt.oldIndex) {
          newOrder = itmsRef.current
            .slice(0, evt.oldIndex)
            .concat(itmsRef.current.slice(evt.oldIndex + 1, evt.newIndex + 1))
            .concat([itmsRef.current[evt.oldIndex]])
            .concat(
              itmsRef.current.slice(evt.newIndex + 1, itmsRef.current.length)
            );
        } else {
          newOrder = itmsRef.current
            .slice(0, evt.newIndex)
            .concat([itmsRef.current[evt.oldIndex]])
            .concat(itmsRef.current.slice(evt.newIndex, evt.oldIndex))
            .concat(
              itmsRef.current.slice(evt.oldIndex + 1, itmsRef.current.length)
            );
        }
        // console.log(newOrder.map((i) => i.label));
        onChange(newOrder);
      }
    });
  }, []);

  useEffect(() => {
    setItems(items);
    itmsRef.current = items;
  }, [items]);

  return (
    <ul ref={listRef} className={classes.sortableRoot}>
      {_items.map(itm => (
        <DragableItem key={itm.id}>{itemBuilder(itm)}</DragableItem>
      ))}
    </ul>
  );
}

export default SortableList;
