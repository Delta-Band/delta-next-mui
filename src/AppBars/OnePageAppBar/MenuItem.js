import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { motion } from 'framer-motion';
import { Typography } from '@material-ui/core';
import DropMenu from '../../DropMenu';

const useStyles = makeStyles((theme) => ({
  menuItemWrapper: {
    paddingBottom: theme.spacing(5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    boxSizing: 'border-box',
    position: 'relative',
    borderLeft: '1px solid',
    '&:last-child': {
      paddingBottom: theme.spacing(0),
      borderLeft: 'none'
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
      borderLeft: 'none',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginRight: theme.spacing(4),
      cursor: 'pointer'
    }
  },
  removeBorder: {
    border: 'none'
  },
  menuItemName: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderTop: '1px solid',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0)
    }
  },
  subMenuItemsWrapper: {
    width: '100%',
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(1)
    }
  },
  subMenuItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: 12,
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      transformOrigin: 'center left'
    }
  },
  circle: {
    border: '1px solid',
    width: 28,
    height: 28,
    borderRadius: 27,
    position: 'absolute',
    left: 0,
    top: 0,
    transform: 'translate(-50%, -50%)',
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  circleFill: {
    width: 16,
    height: 16,
    borderRadius: 20
  },
  scrollIndicatorBar: {
    height: 4,
    transform: 'translateY(2px)'
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  circleFill: {
    show: {
      scale: 1
    },
    hide: {
      scale: 0
    }
  }
};

function SubMenuItem({
  subItem,
  forgroundColor,
  menuSubItemFontVariant,
  setPos,
  closeMenu,
  item
}) {
  const classes = useStyles();

  function scrollIntoView(e) {
    e.stopPropagation();
    setPos(subItem.id);
    closeMenu();
    setTimeout(() => {
      document
        .getElementById(subItem.id)
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }
  return (
    <motion.div
      className={cx(classes.subMenuItem)}
      onClick={scrollIntoView}
      whileHover={{
        scale: 1.1
      }}
    >
      <Typography
        variant={menuSubItemFontVariant}
        style={{
          color: forgroundColor
        }}
      >
        {subItem.name}
      </Typography>
    </motion.div>
  );
}

export default function MenuItem({
  item,
  forgroundColor,
  backgroundColorOpened,
  closeMenu,
  menuItemFontVariant,
  menuSubItemFontVariant,
  position,
  complete,
  removeDotconnectorLine
}) {
  const classes = useStyles();
  const [pos, setPos] = useState(position);
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    setPos(position);
  }, [position]);

  function scrollIntoView() {
    setPos(item.id);
    closeMenu();
    setTimeout(() => {
      document
        .getElementById(item.id)
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  return (
    <div
      className={cx(classes.menuItemWrapper, {
        [classes.removeBorder]: removeDotconnectorLine
      })}
      style={{
        borderLeftColor: fade(forgroundColor, 0.3)
      }}
      key={item.name}
      onClick={scrollIntoView}
    >
      <div
        className={classes.circle}
        style={{
          backgroundColor: backgroundColorOpened,
          borderColor: fade(forgroundColor, 0.3)
        }}
      >
        <motion.div
          className={classes.circleFill}
          variants={MOTION_VARIANTS.circleFill}
          animate={pos === item.id ? 'show' : 'hide'}
          style={{ backgroundColor: item.color }}
        />
      </div>
      <motion.div
        className={classes.scrollIndicatorBar}
        animate={{
          width: `${Math.round(complete * 100)}%`,
          transition: {
            duration: 0.25
          }
        }}
        style={{
          backgroundColor: item.color
        }}
      />
      {item.subMenu ? (
        upMd ? (
          <DropMenu
            id={item.name}
            trigger={
              <Typography
                variant={menuItemFontVariant}
                className={classes.menuItemName}
                style={{
                  color: forgroundColor,
                  borderTopColor: forgroundColor
                }}
              >
                {item.name}
              </Typography>
            }
          >
            <div className={classes.subMenuItemsWrapper}>
              {item.subMenu.map((subItem) => (
                <SubMenuItem
                  setPos={setPos}
                  closeMenu={closeMenu}
                  item={item}
                  key={subItem.name}
                  subItem={subItem}
                  forgroundColor={forgroundColor}
                  menuSubItemFontVariant={menuSubItemFontVariant}
                />
              ))}
            </div>
          </DropMenu>
        ) : (
          <div className={classes.subMenuItemsWrapper}>
            <Typography
              variant={menuItemFontVariant}
              className={classes.menuItemName}
              style={{
                color: forgroundColor,
                borderTopColor: forgroundColor
              }}
            >
              {item.name}
            </Typography>
            {item.subMenu.map((subItem) => (
              <SubMenuItem
                setPos={setPos}
                closeMenu={closeMenu}
                item={item}
                key={subItem.name}
                subItem={subItem}
                forgroundColor={forgroundColor}
                menuSubItemFontVariant={menuSubItemFontVariant}
              />
            ))}
          </div>
        )
      ) : (
        <Typography
          variant={menuItemFontVariant}
          className={classes.menuItemName}
          style={{
            color: forgroundColor,
            borderTopColor: forgroundColor
          }}
        >
          {item.name}
        </Typography>
      )}
    </div>
  );
}
