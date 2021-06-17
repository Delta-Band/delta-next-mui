import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext
} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { motion } from 'framer-motion';
import TopSection from './TopSection';
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  appBarRoot: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible'
  },
  collpasableSection: {
    paddingTop: theme.spacing(5),
    overflow: 'auto',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    '&::-webkit-scrollbar-thumb': {
      background: '#e1e1e1',
      border: '14px outset #FC028E',
      borderRadius: '0px'
    },
    '&::-webkit-scrollbar': {
      width: 2,
      height: 2
    }
  },
  collpasableSectionInner: {
    margin: '0 auto',
    width: '70%',
    maxWidth: 300,
    paddingBottom: theme.spacing(5),
    overflowX: 'hidden',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2)
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  root: (bgOpened, bgClosed, closedHeight) => ({
    opened: {
      height: '100%',
      backgroundColor: bgOpened,
      transition: {
        type: 'spring',
        damping: 16
      }
    },
    closed: {
      height: closedHeight,
      backgroundColor: bgClosed,
      transition: {
        type: 'spring',
        damping: 16
      }
    }
  })
};

export default function DeltaAppBarWithSCrollIndicator({
  backgroundColor = '#000',
  backgroundColorOpened = '#000',
  forgroundColor = '#FFF',
  logo,
  menuItems = [],
  menuItemFontVariant = '',
  menuSubItemFontVariant = '',
  positionPathToStore,
  topSectionClassName,
  store,
  closedHeight = 66,
  className,
  startScrollIndicationFrom = 0,
  positionTransform = (pos) => pos,
  logTrack = false,
  removeDotconnectorLine = false
}) {
  /** HOOKS */
  const classes = useStyles();
  const [status, setStatus] = useState('closed');
  const windowOffset = useRef(0);
  const scrollableContainer = useRef();
  const { globalState } = useContext(store);
  const position = globalState[positionPathToStore];
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  /** EFFECTS */
  useEffect(() => {
    if (status === 'opened') {
      windowOffset.current = window.pageYOffset;
      window.addEventListener('scroll', noScroll);
      resetMenuScrollPosition();
    } else {
      window.removeEventListener('scroll', noScroll);
    }
    return () => {
      window.removeEventListener('scroll', noScroll);
    };
  }, [status]);

  /** METHODS */
  function toggle() {
    setStatus(status === 'closed' ? 'opened' : 'closed');
  }

  function closeMenu() {
    setStatus('closed');
  }

  const noScroll = useCallback(() => {
    window.scrollTo(0, windowOffset.current);
  }, [setStatus]);

  function resetMenuScrollPosition() {
    scrollableContainer.current.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <motion.div
      className={cx(classes.appBarRoot, className)}
      variants={MOTION_VARIANTS.root(
        backgroundColorOpened,
        backgroundColor,
        closedHeight
      )}
      initial='closed'
      animate={status}
      style={{
        backgroundColor
      }}
    >
      <TopSection
        closeMenu={closeMenu}
        className={topSectionClassName}
        logo={logo}
        status={status}
        forgroundColor={forgroundColor}
        backgroundColor={backgroundColor}
        positionPathToStore={positionPathToStore}
        menuSubItemFontVariant={menuSubItemFontVariant}
        toggle={toggle}
        position={positionTransform(position)}
        menuItems={menuItems}
        menuItemFontVariant={menuItemFontVariant}
        startScrollIndicationFrom={startScrollIndicationFrom}
        isOpen={status === 'opened'}
        logTrack={logTrack}
      />
      {!upMd && (
        <div className={classes.collpasableSection} ref={scrollableContainer}>
          <div className={classes.collpasableSectionInner}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                removeDotconnectorLine={removeDotconnectorLine}
                forgroundColor={forgroundColor}
                backgroundColorOpened={backgroundColorOpened}
                closeMenu={closeMenu}
                menuItemFontVariant={menuItemFontVariant}
                menuSubItemFontVariant={menuSubItemFontVariant}
                position={positionTransform(position)}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

DeltaAppBarWithSCrollIndicator.proptypes = {
  backgroundColor: PropTypes.string,
  backgroundColorOpened: PropTypes.string,
  forgroundColor: PropTypes.string.isRequired,
  menuItemFontVariant: PropTypes.string,
  menuSubItemFontVariant: PropTypes.string,
  logo: PropTypes.node,
  closedHeight: PropTypes.string,
  className: PropTypes.string,
  topSectionClassName: PropTypes.string,
  positionPathToStore: PropTypes.string.isRequired,
  positionTransform: PropTypes.func,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      route: PropTypes.string,
      id: PropTypes.string.isRequired,
      range: PropTypes.arrayOf,
      subMenu: PropTypes.arrayOf({
        name: PropTypes.string,
        id: PropTypes.string.isRequired
      })
    })
  ),
  store: PropTypes.any.isRequired,
  startScrollIndicationFrom: PropTypes.number,
  logTrack: PropTypes.bool,
  removeDotconnectorLine: PropTypes.bool
};
