import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@material-ui/core';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { ChevronWithCircleDown as ArrowDownIcon } from '@styled-icons/entypo/ChevronWithCircleDown';
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  topSection: {
    height: 66,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
    flexShrink: 0,
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      paddingTop: 20
    }
  },
  logo: {
    height: '100%'
  },
  arrowWrapper: {
    height: 28,
    width: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topSectionInfo: {
    position: 'absolute',
    right: theme.spacing(7.5),
    width: '40%',
    marginTop: 5
  },
  scrollIndicatorWrapper: {
    height: 1,
    width: '100%'
  },
  scrollIndicator: {
    height: 3,
    position: 'absolute',
    left: 0,
    top: -1,
    transform: 'translateY(0px)'
  },
  horizontalMenuWrapper: {
    display: 'flex',
    width: '75vw'
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  arrow: {
    opened: {
      rotate: '180deg'
    },
    closed: {
      rotate: '0deg'
    }
  }
};

export default function TopSection({
  closeMenu,
  logoSrc,
  status,
  forgroundColor,
  toggle,
  position,
  menuItemFontVariant,
  menuItems,
  menuSubItemFontVariant,
  logoClassName,
  isOpen
}) {
  const classes = useStyles();
  const [item, setItem] = useState();
  const [complete, setComplete] = useState(0);
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  useScrollPosition(({ currPos }) => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const track = Math.max(-currPos.y / docHeight, 0);
    console.log('track: ', track);
    setComplete(track);
  });

  useEffect(() => {
    updateName();
  }, [position]);

  function updateName() {
    const item = menuItems.find((itm) => itm.id === position);
    setItem(item);
  }

  function calcCompletePerItem(item) {
    if (complete < item.range[0]) {
      return 0;
    } else if (complete > item.range[1]) {
      return 1;
    }
    return (complete - item.range[0]) / (item.range[1] - item.range[0]);
  }

  return (
    <div className={classes.topSection}>
      <img
        src={logoSrc}
        className={cx(classes.logo, logoClassName)}
        onClick={closeMenu}
      />
      {upMd ? (
        <div className={classes.horizontalMenuWrapper}>
          {menuItems.map((item, i) => (
            <MenuItem
              key={item.id}
              item={item}
              forgroundColor={forgroundColor}
              closeMenu={closeMenu}
              menuItemFontVariant={menuItemFontVariant}
              menuSubItemFontVariant={menuSubItemFontVariant}
              position={position}
              complete={calcCompletePerItem(item)}
            />
          ))}
        </div>
      ) : null}
      {!isOpen && !upMd && (
        <AnimatePresence>
          <motion.div
            className={classes.topSectionInfo}
            key={item ? item.name : ''}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {item ? (
              <div
                className={classes.scrollIndicatorWrapper}
                style={{ backgroundColor: fade(forgroundColor, 0.5) }}
              >
                <motion.div
                  animate={{
                    width: `${Math.round(calcCompletePerItem(item) * 100)}%`,
                    transition: {
                      duration: 0.25
                    }
                  }}
                  className={classes.scrollIndicator}
                  style={{ backgroundColor: item.color }}
                />
              </div>
            ) : null}
            <Typography
              variant={menuItemFontVariant}
              style={{ color: forgroundColor }}
            >
              {item ? item.name : ''}
            </Typography>
          </motion.div>
        </AnimatePresence>
      )}
      {!upMd && (
        <motion.div
          variants={MOTION_VARIANTS.arrow}
          initial='closed'
          animate={status}
          className={classes.arrowWrapper}
        >
          <ArrowDownIcon size={28} color={forgroundColor} onClick={toggle} />
        </motion.div>
      )}
    </div>
  );
}
