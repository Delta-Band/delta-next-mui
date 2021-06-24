'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@material-ui/core/styles');
var framerMotion = require('framer-motion');
var useMediaQuery = require('@material-ui/core/useMediaQuery');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var useMediaQuery__default = /*#__PURE__*/_interopDefaultLegacy(useMediaQuery);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var reactUseScrollPosition = {};

Object.defineProperty(reactUseScrollPosition, "__esModule", { value: true });
var react_1 = React__default['default'];
var isBrowser = typeof window !== "undefined";
function getScrollPosition() {
    return isBrowser ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 };
}
function useScrollPosition() {
    var _a = react_1.useState(getScrollPosition()), position = _a[0], setScrollPosition = _a[1];
    react_1.useEffect(function () {
        var requestRunning = null;
        function handleScroll() {
            if (isBrowser && requestRunning === null) {
                requestRunning = window.requestAnimationFrame(function () {
                    setScrollPosition(getScrollPosition());
                    requestRunning = null;
                });
            }
        }
        if (isBrowser) {
            window.addEventListener('scroll', handleScroll);
            return function () { return window.removeEventListener('scroll', handleScroll); };
        }
    }, []);
    return position;
}
reactUseScrollPosition.useScrollPosition = useScrollPosition;
function useScrollXPosition() {
    var x = useScrollPosition().x;
    return x;
}
reactUseScrollPosition.useScrollXPosition = useScrollXPosition;
function useScrollYPosition() {
    var y = useScrollPosition().y;
    return y;
}
var useScrollYPosition_1 = reactUseScrollPosition.useScrollYPosition = useScrollYPosition;

var img$1 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='539.016' height='741.737' viewBox='0 0 539.016 741.737'%3e %3cpath id='Union_4' data-name='Union 4' d='M283.489%2c733.5q-63.574-17.138-120.117-87.744L73.724%2c533.546a28.6%2c28.6%2c0%2c0%2c1-4.687-6.3%2c60.851%2c60.851%2c0%2c0%2c1-3.809-8.35%2c28.564%2c28.564%2c0%2c0%2c1%2c1.025-23.144q5.42-11.425%2c19.19-16.7a30.3%2c30.3%2c0%2c0%2c1%2c18.31-.732Q112.4%2c480.812%2c120.6%2c489.6l71.192%2c76.172q7.324%2c7.617%2c13.77%2c5.566a8.91%2c8.91%2c0%2c0%2c0%2c4.98-4.834q1.758-3.661-.292-8.935L105.071%2c268.116q-5.566-14.94-.293-27.1t19.043-17.139a29.339%2c29.339%2c0%2c0%2c1%2c24.463%2c1.319q11.865%2c6%2c17.432%2c20.654l72.363%2c198.633q2.637%2c7.91%2c7.324%2c10.254a12.817%2c12.817%2c0%2c0%2c0%2c9.669.879%2c11.562%2c11.562%2c0%2c0%2c0%2c6.445-6.738q2.051-4.98-.586-12.891l-21.973-59.473q-4.98-14.356%2c11.133-20.215%2c17.871-6.445%2c33.691.733T308.1%2c387.062l10.254%2c28.125q2.93%2c7.617%2c7.618%2c10.254a11.252%2c11.252%2c0%2c0%2c0%2c9.668.879%2c11%2c11%2c0%2c0%2c0%2c6.592-6.738q1.9-4.982-1.025-12.6l-11.133-30.469q-4.98-14.356%2c11.133-20.215%2c18.164-6.445%2c34.57%2c1.758t23.73%2c29l5.566%2c14.648q2.637%2c7.617%2c7.324%2c10.107a11.569%2c11.569%2c0%2c0%2c0%2c9.668.733%2c11%2c11%2c0%2c0%2c0%2c6.592-6.738q1.9-4.98-.733-12.6l-8.5-21.973q-3.222-9.376%2c6.445-12.891%2c19.336-7.031%2c41.016%2c8.057t34.571%2c49.951l18.456%2c50.684q22.266%2c61.524%2c17.139%2c112.793t-36.768%2c88.916Q468.646%2c706.4%2c410.931%2c727.2a212.625%2c212.625%2c0%2c0%2c1-73.683%2c13.538A205.758%2c205.758%2c0%2c0%2c1%2c283.489%2c733.5ZM12.668%2c442.23a14.665%2c14.665%2c0%2c0%2c1-5.553-1%2c11.654%2c11.654%2c0%2c0%2c1-4.265-3A10.765%2c10.765%2c0%2c0%2c1%2c.2%2c432.847a16.129%2c16.129%2c0%2c0%2c1%2c.431-6.878l18.9-78.679H55.248l-18.14%2c75.345a21.581%2c21.581%2c0%2c0%2c1-2.869%2c6.928%2c28.4%2c28.4%2c0%2c0%2c1-5.417%2c6.187%2c28.372%2c28.372%2c0%2c0%2c1-6.881%2c4.5%2c21.585%2c21.585%2c0%2c0%2c1-7.26%2c1.877c-.689.066-1.366.1-2.011.1ZM63.194%2c314.29H27.458l19.938-83H83.177l-19.984%2c83h0Zm27.929-116h-35.8L66.97%2c149.808l-53.354%2c5.235c-.387.019-.77.029-1.138.029-3.62%2c0-6.278-.946-7.9-2.812C2.791%2c150.2%2c2.183%2c147.39%2c2.77%2c143.9S5.219%2c136.72%2c8.3%2c132.943L105.412%2c9.036a23.617%2c23.617%2c0%2c0%2c1%2c9.7-7.489A19.075%2c19.075%2c0%2c0%2c1%2c122.249%2c0a13.261%2c13.261%2c0%2c0%2c1%2c3.08.355%2c8.683%2c8.683%2c0%2c0%2c1%2c3.9%2c2.015%2c10.03%2c10.03%2c0%2c0%2c1%2c2.529%2c3.861L172.877%2c117.1a16.183%2c16.183%2c0%2c0%2c1%2c.355%2c10.687%2c19.8%2c19.8%2c0%2c0%2c1-6.078%2c9.185%2c17.81%2c17.81%2c0%2c0%2c1-10.658%2c4.3l-52.86%2c5.043L91.122%2c198.29h0Z' transform='translate(0.501 0.5)' stroke='rgba(0%2c0%2c0%2c0)' stroke-miterlimit='10' stroke-width='1'/%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='408.379' height='1065.58' viewBox='0 0 408.379 1065.58'%3e %3cpath id='Union_2' data-name='Union 2' d='M184.326%2c1056.28%2c7.08%2c875.127a28.865%2c28.865%2c0%2c0%2c1-5.127-7.69A22.933%2c22.933%2c0%2c0%2c1%2c0%2c857.793a23.723%2c23.723%2c0%2c0%2c1%2c3.173-12.084%2c23.3%2c23.3%2c0%2c0%2c1%2c8.667-8.667%2c24.2%2c24.2%2c0%2c0%2c1%2c12.329-3.174%2c23.062%2c23.062%2c0%2c0%2c1%2c17.334%2c7.08L202.75%2c1006.06%2c363.769%2c840.947a23.866%2c23.866%2c0%2c0%2c1%2c17.579-7.08%2c24.2%2c24.2%2c0%2c0%2c1%2c12.329%2c3.174%2c23.305%2c23.305%2c0%2c0%2c1%2c8.667%2c8.667%2c24.695%2c24.695%2c0%2c0%2c1-3.907%2c29.418L220.947%2c1056.28a24.239%2c24.239%2c0%2c0%2c1-8.3%2c6.225%2c23.652%2c23.652%2c0%2c0%2c1-9.766%2c2.075Q192.383%2c1064.58%2c184.326%2c1056.28ZM67.282%2c700q-49.9-42.042-57.764-126.807Q3.366%2c506.2%2c1.486%2c439.38t.342-135.352Q4.05%2c235.5%2c10.2%2c163.379q7.178-80.322%2c57.08-121.85T204%2c0q86.816%2c0%2c136.718%2c41.529T397.8%2c163.379q6.152%2c72.12%2c8.374%2c140.649t.342%2c135.352q-1.881%2c66.821-8.033%2c133.813Q390.622%2c657.959%2c340.719%2c700T204%2c742.041Q117.184%2c742.041%2c67.282%2c700ZM107.614%2c84.253Q72.41%2c110.4%2c67.966%2c163.379q-5.812%2c71.778-8.033%2c140.307t-.342%2c135.352q1.881%2c66.821%2c8.032%2c134.155%2c5.127%2c57.422%2c40.161%2c84.253T204%2c684.277q61.181%2c0%2c96.215-26.831t40.5-84.253q5.812-67.334%2c7.691-134.155t-.341-135.352q-2.222-68.53-8.033-140.307-4.443-52.978-39.649-79.126T204%2c58.106Q142.819%2c58.106%2c107.614%2c84.253Zm62.145%2c124.886a33%2c33%2c0%2c1%2c1%2c33%2c33A33%2c33%2c0%2c0%2c1%2c169.759%2c209.138Z' transform='translate(0.5 0.5)' stroke='rgba(0%2c0%2c0%2c0)' stroke-miterlimit='10' stroke-width='1'/%3e%3c/svg%3e";

var useStyles = styles.makeStyles(function (theme) {
  var _scrollTipRoot;

  return {
    scrollTipRoot: (_scrollTipRoot = {
      position: 'fixed',
      top: 'calc(100vh - 50px)',
      left: '50%'
    }, _defineProperty(_scrollTipRoot, theme.breakpoints.up('sm'), {}), _defineProperty(_scrollTipRoot, theme.breakpoints.up('md'), {
      top: 'calc(100vh - 30px)'
    }), _defineProperty(_scrollTipRoot, theme.breakpoints.up('lg'), {}), _defineProperty(_scrollTipRoot, theme.breakpoints.up('xl'), {
      top: 'calc(100vh - 100px)'
    }), _scrollTipRoot),
    scrollImg: _defineProperty({
      height: theme.spacing(7)
    }, theme.breakpoints.up('xl'), {
      height: theme.spacing(10)
    })
  };
});

function ScrollDownTip() {
  var classes = useStyles();
  var theme = styles.useTheme();
  var upMd = useMediaQuery__default['default'](theme.breakpoints.up('md'));

  var _useState = React.useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showScrollTip = _useState2[0],
      setShowScrollTip = _useState2[1];

  var scrollY = useScrollYPosition_1();
  React.useEffect(function () {
    setShowScrollTip(scrollY === 0);
  }, [scrollY]);
  return /*#__PURE__*/React__default['default'].createElement(framerMotion.motion.div, {
    animate: {
      scale: showScrollTip ? 1 : 0,
      opacity: showScrollTip ? 1 : 0,
      x: '-50%',
      y: '-100%'
    },
    className: classes.scrollTipRoot
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: upMd ? img : img$1,
    className: classes.scrollImg
  }));
}

exports.ScrollDownTip = ScrollDownTip;
//# sourceMappingURL=index.js.map
