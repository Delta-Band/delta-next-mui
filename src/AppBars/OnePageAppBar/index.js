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
import { motion } from 'framer-motion';
import TopSection from './TopSection';
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    zIndex: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
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
    width: '50%',
    maxWidth: 300,
    paddingBottom: theme.spacing(5)
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  root: (bgOpened, bgClosed) => ({
    opened: {
      height: '100%',
      backgroundColor: bgOpened,
      transition: {
        type: 'spring',
        damping: 16
      }
    },
    closed: {
      height: 66,
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
  logoHeight = '40%',
  logoSrc = 'https://delta.band/images/logo.svg',
  menuItems = [],
  menuItemFontVariant = '',
  menuSubItemFontVariant = '',
  positionPathToStore,
  logoClassName,
  store,
  hoverHeight = 250,
  startScrollIndicationFrom = 0,
  positionTransform = (pos) => pos
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
      className={classes.root}
      variants={MOTION_VARIANTS.root(backgroundColorOpened, backgroundColor)}
      initial='closed'
      animate={status}
      whileHover={{
        height: hoverHeight,
        transition: {
          type: 'spring',
          damping: 16
        }
      }}
      style={{
        backgroundColor
      }}
    >
      <TopSection
        closeMenu={closeMenu}
        logoSrc={logoSrc}
        status={status}
        logoHeight={logoHeight}
        forgroundColor={forgroundColor}
        backgroundColor={backgroundColor}
        positionPathToStore={positionPathToStore}
        menuSubItemFontVariant={menuSubItemFontVariant}
        toggle={toggle}
        position={positionTransform(position)}
        menuItems={menuItems}
        logoClassName={logoClassName}
        menuItemFontVariant={menuItemFontVariant}
        startScrollIndicationFrom={startScrollIndicationFrom}
        isOpen={status === 'opened'}
      />
      {!upMd && (
        <div className={classes.collpasableSection} ref={scrollableContainer}>
          <div className={classes.collpasableSectionInner}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
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
  logoTransform: PropTypes.string,
  menuItemFontVariant: PropTypes.string,
  menuSubItemFontVariant: PropTypes.string,
  logoSrc: PropTypes.string,
  hoverHeight: PropTypes.string,
  logoClassName: PropTypes.string,
  positionPathToStore: PropTypes.string.isRequired,
  positionTransform: PropTypes.func,
  logoHeight: PropTypes.oneOf([PropTypes.string, PropTypes.logo]),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      route: PropTypes.string,
      range: PropTypes.arrayOf,
      subMenu: PropTypes.arrayOf({
        name: PropTypes.string,
        id: PropTypes.string
      })
    })
  ),
  store: PropTypes.any.isRequired,
  startScrollIndicationFrom: PropTypes.number
};
