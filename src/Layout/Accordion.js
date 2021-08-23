import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ChevronRight } from '@styled-icons/heroicons-outline/ChevronRight';
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
  },
  accordion: {
    // marginLeft: '-8px !important'
  }
}));

const Accordion = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
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
    marginRight: -6,
    marginLeft: -10,
    transformOrigin: 'center center',
    '&$expanded': {
      transform: 'rotate(90deg) translateX(-1px)'
    }
  }
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingLeft: 46,
    paddingRight: theme.spacing(2),
    flexDirection: 'column'
  }
}))(MuiAccordionDetails);

function DeltaAccordion({ content = [], onChange, forceOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(forceOpen || '0');
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));

  const handleChange = (i, item) => (event, isExpanded) => {
    const asArray = i.split('-');
    asArray.pop();
    const father = asArray.join('-');
    setExpanded(isExpanded ? i : father);
  };

  function expandedArray() {
    return expanded.split('-').reduce((acc, i, j) => {
      if (j > 0) {
        acc.push(`${acc[j - 1]}-${i}`);
      } else {
        acc.push(i);
      }
      return acc;
    }, []);
  }

  function accordionItem(item, isSubItem = false, i) {
    return (
      <Accordion
        key={i}
        expanded={expandedArray().includes(i)}
        onChange={handleChange(i, item)}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ChevronRight size={26} />}
          className={cx({ [classes.subItemSummary]: isSubItem })}
          id={i}
          aria-controls={i}
        >
          {item.summary}
        </AccordionSummary>
        <AccordionDetails>
          {Array.isArray(item.details)
            ? item.details.map((subItem, j) =>
                accordionItem(subItem, true, `${i}-${j}`)
              )
            : item.details}
        </AccordionDetails>
      </Accordion>
    );
  }

  useEffect(() => {
    if (!onChange) return;
    const address = expanded.split('-');
    const item = address.reduce((acc, index, j) => {
      if (j === 0) {
        acc = acc[index];
      } else {
        acc = acc.details[index];
      }
      return acc;
    }, content);
    onChange(item);
  }, [expanded]);

  useEffect(() => {
    setExpanded(forceOpen || '0');
  }, [forceOpen]);

  return content.map((item, i) => accordionItem(item, false, `${i}`));
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
