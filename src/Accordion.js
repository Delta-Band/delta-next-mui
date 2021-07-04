import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails
} from '@material-ui/core';
import { Important } from 'styled-icons/fluentui-system-filled';

const useStyles = makeStyles((theme) => ({
  subItemSummary: {
    paddingLeft: 0,
    paddingRight: 0
  },
  // subItemDetails: {
  //   // paddingLeft: `${theme.spacing(3)}px !important`
  // },
  subAccordion: {
    paddingLeft: '29px !important'
  }
}));

const Accordion = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    },
    width: '100%',
    boxSizing: 'border-box'
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
    paddingLeft: 0,
    paddingRight: 0,
    borderBottom: 'none',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {},
  expandIcon: {
    marginRight: 0,
    marginLeft: -12
  }
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(4.5),
    paddingRight: theme.spacing(2),
    flexDirection: 'column'
  }
}))(MuiAccordionDetails);

function DeltaAccordion({ content = [] }) {
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));
  function AccordionItem({ item, isSubItem = false }) {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ChevronDown size={24} />}
          className={cx({ [classes.subItemSummary]: isSubItem })}
        >
          {item.summary}
        </AccordionSummary>
        <AccordionDetails
        // className={cx({ [classes.subItemDetails]: isSubItem })}
        >
          {item.details}
        </AccordionDetails>
      </Accordion>
    );
  }

  return content.map((item, i) => {
    if (Array.isArray(item.details)) {
      return (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ChevronDown size={24} />}>
            {item.summary}
          </AccordionSummary>
          <AccordionDetails className={classes.subAccordion}>
            {item.details.map((subItem, j) => (
              <AccordionItem key={`${i}-${j}`} item={subItem} isSubItem />
            ))}
          </AccordionDetails>
        </Accordion>
      );
    } else {
      return <AccordionItem key={i} item={item} />;
    }
  });
}

DeltaAccordion.proptypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      summary: PropTypes.node,
      details: PropTypes.oneOf([
        PropTypes.node,
        PropTypes.arrayOf(
          PropTypes.shape({
            summary: PropTypes.node,
            details: PropTypes.node
          })
        )
      ])
    })
  )
};

export default DeltaAccordion;
