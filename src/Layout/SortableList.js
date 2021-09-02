// import React, { useRef, useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { ReactSortable } from 'react-sortablejs';
// import isEqual from 'lodash/isEqual';

const useStyles = makeStyles((theme) => ({
  sortableRoot: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    position: 'relative'
  },
  sortableItem: {
    // cursor: 'pointer !important',
    // width: '100%',
    // position: 'relative',
    // marginBottom: 4,
    // borderColor: 'transparent',
    boxSizing: 'border-box',
    '&:target': {
      // cursor: 'grap !important'
    },
    '&.mouseDown': {
      cursor: 'grap !important'
    }
    // '&.sortable-ghost': {
    //   borderColor: theme.palette.primary.main
    // }
    // '&.sortable-chosen': {
    //   // borderColor: theme.palette.primary.main
    // },
    // '&.sortable-drag': {
    //   borderColor: 'transparent'
    // }
  }
}));

function DraggableWrapper({ children, provided }) {
  const classes = useStyles();
  const [mouseIsDown, setMouseIsDown] = useState(false);
  return (
    <div
      className={cx(classes.sortableItem)}
      onMouseDown={() => setMouseIsDown(true)}
      onMouseUp={() => setMouseIsDown(false)}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        cursor: mouseIsDown ? 'grab' : 'pointer'
      }}
    >
      {children}
    </div>
  );
}

function SortableList({ items = [], itemBuilder, onChange = console.log }) {
  const classes = useStyles();
  const [_items, setItems] = useState(items);

  useEffect(() => {
    setItems(items);
  }, [items]);
  // const ref = useRef(null);
  // const theme = useTheme();
  // const idList = useRef(_items.map((item) => item.id));
  // useEffect(() => {
  //   const notChanged = JSON.stringify(items) === JSON.stringify(_items);
  //   if (notChanged)
  //   setItems(items);
  //   idList.current = items.map((item) => item.id);
  // }, [items]);
  // useEffect(() => {
  //   const _idList = _items.map((item) => item.id);
  //   if (!isEqual(idList.current, _idList)) {
  //     onChange(
  //       _items.map((itm) => {
  //         delete itm.chosen;
  //         return itm;
  //       })
  //     );
  //     idList.current = _idList;
  //   }
  // }, [_items]);
  // return (
  //   <ReactSortable
  //     list={_items}
  //     setList={setItems}
  //     animation={200}
  //     delayOnTouchStart={true}
  //     delay={2}
  //     ghostClass='sortable-ghost'
  //   >
  //     {_items.map((item) => (
  //       <div
  //         key={item.id}
  //         className={classes.sortableItem}
  //         style={{ borderRadius: itemRadius }}
  //       >
  //         {itemBuilder(item)}
  //       </div>
  //     ))}
  //   </ReactSortable>
  // );

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const newOrder = reorder(
      _items,
      result.source.index,
      result.destination.index
    );

    setItems(newOrder);
    onChange(newOrder);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {_items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <DraggableWrapper provided={provided}>
                    {itemBuilder(item)}
                  </DraggableWrapper>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SortableList;
