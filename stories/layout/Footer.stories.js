import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Footer } from '../../src';
import logo from './footer_logo.svg';

// console.log('INITIAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export default {
  title: 'Layout/Footer',
  component: Footer,
  // argTypes: { onChange: { action: 'changed' } },
  parameters: {
    viewport: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
}));

const Template = (args) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Footer {...args} />
    </div>
  );
};

export const Thin = Template.bind({});
Thin.args = {
  thin: true,
  logo: logo,
  companyName: 'Nucleai MD',
  titlesFontFamily: 'Zilla Slab',
  addressFirstLine: '20 W Kinzie St Chicago,',
  addressSecondLine: 'IL, USA 60654',
  addressLink: 'https://goo.gl/maps/btMpX6B2JHnJqoZJA',
  phone: '+972 3 171 4324',
  email: 'info@brand.com',
  emailSubject: 'Nice to Meet you',
  emailBody: 'Dear Brand team, ',
  privacyPolicyLink: 'https:/delta.band'
};

Thin.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
