import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@material-ui/core';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { Cross as Hamburger } from 'hamburger-react';
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  topSection: {
    height: 66,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
    flexShrink: 0
  },
  innerWrap: {
    height: '100%',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      paddingTop: 20
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.pageMaxWidthLG
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.pageMaxWidthXL
    }
  },
  logo: {
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
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
    right: theme.spacing(10),
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
    width: '100%',
    paddingLeft: '10vw'
  }
}));

export default function TopSection({
  closeMenu,
  logo,
  forgroundColor,
  toggle,
  position,
  menuItemFontVariant,
  menuItems,
  menuSubItemFontVariant,
  isOpen,
  logTrack = false,
  className
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
    if (logTrack) {
      console.log('track: ', track);
    }
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

  function scrollToTop() {
    document
      .getElementById('__next')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className={classes.topSection}>
      <div className={cx(classes.innerWrap, className)}>
        <div
          className={cx(classes.logo)}
          onClick={() => {
            closeMenu();
            scrollToTop();
          }}
        >
          {logo}
        </div>
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
        {!upMd && <Hamburger toggled={isOpen} toggle={toggle} />}
      </div>
    </div>
  );
}
