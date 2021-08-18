import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Presentation } from '../../src';

// console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Products/Presentation',
  component: Presentation,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const useStyles = makeStyles((theme) => ({
  page: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuBtn: {
    color: theme.palette.primary.contrastText,
    '& .MuiButton-label': {
      color: theme.palette.primary.contrastText
    }
  }
}));

const Template = (args) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.page}>
      <Presentation
        {...args}
        classNames={{
          menuBtn: classes.menuBtn
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  gaCategory: 'Investors Presentation',
  slides: [
    {
      label: 'Slide 1 Long Name',
      image:
        'https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/OHUMR4479PfGVcQoGe3uKrrLg233%2FgQN8jySJE3ErNmMakf9Z%2Fslide?alt=media&token=8e17c234-19f2-48cb-8978-fe7c1d48f558&noCache=1626181458474'
    },
    {
      label: 'Slide 2',
      image:
        'https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/OHUMR4479PfGVcQoGe3uKrrLg233%2Fd3lxK8SYFMwlCVYrNA99%2Fslide?alt=media&token=9afd981f-98ed-4e96-974a-55e83ab9de09&noCache=1626181487640'
    },
    {
      label: 'Slide 3 Very Long Name',
      image:
        'https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/OHUMR4479PfGVcQoGe3uKrrLg233%2FNZMrMkrkhOerWJokjH43%2Fslide?alt=media&token=04cffd76-2608-4a8d-9bce-932b01b4b09a&noCache=1626181498737'
    },
    {
      label: 'Slide 4',
      image:
        'https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/OHUMR4479PfGVcQoGe3uKrrLg233%2FnPXQ53aB0TDCwQq7lL6x%2Fslide.gif?alt=media&token=1402fd97-3199-4b43-a2b2-b230b8c8d865'
    },
    {
      label: 'Slide 5',
      image:
        'https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/OHUMR4479PfGVcQoGe3uKrrLg233%2FgQN8jySJE3ErNmMakf9Z%2Fslide?alt=media&token=8e17c234-19f2-48cb-8978-fe7c1d48f558&noCache=1626181458474'
    },
    {
      label: 'Slide 6',
      image:
        'https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/OHUMR4479PfGVcQoGe3uKrrLg233%2Fd3lxK8SYFMwlCVYrNA99%2Fslide?alt=media&token=9afd981f-98ed-4e96-974a-55e83ab9de09&noCache=1626181487640'
    },
    {
      label: 'Slide 7',
      image:
        'https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/OHUMR4479PfGVcQoGe3uKrrLg233%2FNZMrMkrkhOerWJokjH43%2Fslide?alt=media&token=04cffd76-2608-4a8d-9bce-932b01b4b09a&noCache=1626181498737'
    }
  ]
};

Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
