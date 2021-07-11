import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { PdfViewer } from '../../src';
import file from './pdf_test.pdf';

// console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Products/PdfViewer',
  component: PdfViewer,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const useStyles = makeStyles((theme) => ({
  page: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Template = (args) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <PdfViewer {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  file: file
};

Default.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
