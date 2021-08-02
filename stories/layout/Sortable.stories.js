import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Sortable } from '../../src';
// console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Layout/Sortable',
  component: Sortable,
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: '100vh',
    width: '100%',
    position: 'absolute',
    boxSizing: 'border-box',
    padding: theme.spacing(2)
  }
}));

const Template = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Sortable {...args} />
    </div>
  );
};

// function items() {
//   const data = [
//     { text: 'aaa', color: 'red', id: 10 },
//     { text: 'bbb', color: 'green', id: 11 },
//     { text: 'ccc', color: 'blue', id: 12 }
//   ];
//   return data.reduce((acc, item) => {
//     acc.push(
//       <div
//       key={item.id}
//         style={{ backgroundColor: item.color, padding: 10, marginBottom: 2 }}
//       >
//         <Typography>{item.text}</Typography>
//       </div>
//     );
//     return acc;
//   }, []);
// }

export const Default = Template.bind({});
Default.args = {
  items: [
    { text: 'aaa', color: 'red', id: 10 },
    { text: 'bbb', color: 'green', id: 11 },
    { text: 'ccc', color: 'blue', id: 12 },
    { text: 'ddd', color: 'yellow', id: 13 }
  ],
  itemBuilder: (item) => (
    <div
      style={{
        backgroundColor: item.color,
        padding: 10,
        // marginBottom: 2,
        height: 100
      }}
    >
      <Typography>{item.text}</Typography>
    </div>
  )
};

Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
