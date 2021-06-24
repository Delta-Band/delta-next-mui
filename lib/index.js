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

var mobileImg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"539.016\" height=\"741.737\" viewBox=\"0 0 539.016 741.737\">\n  <path id=\"Union_4\" data-name=\"Union 4\" d=\"M283.489,733.5q-63.574-17.138-120.117-87.744L73.724,533.546a28.6,28.6,0,0,1-4.687-6.3,60.851,60.851,0,0,1-3.809-8.35,28.564,28.564,0,0,1,1.025-23.144q5.42-11.425,19.19-16.7a30.3,30.3,0,0,1,18.31-.732Q112.4,480.812,120.6,489.6l71.192,76.172q7.324,7.617,13.77,5.566a8.91,8.91,0,0,0,4.98-4.834q1.758-3.661-.292-8.935L105.071,268.116q-5.566-14.94-.293-27.1t19.043-17.139a29.339,29.339,0,0,1,24.463,1.319q11.865,6,17.432,20.654l72.363,198.633q2.637,7.91,7.324,10.254a12.817,12.817,0,0,0,9.669.879,11.562,11.562,0,0,0,6.445-6.738q2.051-4.98-.586-12.891l-21.973-59.473q-4.98-14.356,11.133-20.215,17.871-6.445,33.691.733T308.1,387.062l10.254,28.125q2.93,7.617,7.618,10.254a11.252,11.252,0,0,0,9.668.879,11,11,0,0,0,6.592-6.738q1.9-4.982-1.025-12.6l-11.133-30.469q-4.98-14.356,11.133-20.215,18.164-6.445,34.57,1.758t23.73,29l5.566,14.648q2.637,7.617,7.324,10.107a11.569,11.569,0,0,0,9.668.733,11,11,0,0,0,6.592-6.738q1.9-4.98-.733-12.6l-8.5-21.973q-3.222-9.376,6.445-12.891,19.336-7.031,41.016,8.057t34.571,49.951l18.456,50.684q22.266,61.524,17.139,112.793t-36.768,88.916Q468.646,706.4,410.931,727.2a212.625,212.625,0,0,1-73.683,13.538A205.758,205.758,0,0,1,283.489,733.5ZM12.668,442.23a14.665,14.665,0,0,1-5.553-1,11.654,11.654,0,0,1-4.265-3A10.765,10.765,0,0,1,.2,432.847a16.129,16.129,0,0,1,.431-6.878l18.9-78.679H55.248l-18.14,75.345a21.581,21.581,0,0,1-2.869,6.928,28.4,28.4,0,0,1-5.417,6.187,28.372,28.372,0,0,1-6.881,4.5,21.585,21.585,0,0,1-7.26,1.877c-.689.066-1.366.1-2.011.1ZM63.194,314.29H27.458l19.938-83H83.177l-19.984,83h0Zm27.929-116h-35.8L66.97,149.808l-53.354,5.235c-.387.019-.77.029-1.138.029-3.62,0-6.278-.946-7.9-2.812C2.791,150.2,2.183,147.39,2.77,143.9S5.219,136.72,8.3,132.943L105.412,9.036a23.617,23.617,0,0,1,9.7-7.489A19.075,19.075,0,0,1,122.249,0a13.261,13.261,0,0,1,3.08.355,8.683,8.683,0,0,1,3.9,2.015,10.03,10.03,0,0,1,2.529,3.861L172.877,117.1a16.183,16.183,0,0,1,.355,10.687,19.8,19.8,0,0,1-6.078,9.185,17.81,17.81,0,0,1-10.658,4.3l-52.86,5.043L91.122,198.29h0Z\" transform=\"translate(0.501 0.5)\" stroke=\"rgba(0,0,0,0)\" stroke-miterlimit=\"10\" stroke-width=\"1\"/>\n</svg>";

var desktopImg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"408.379\" height=\"1065.58\" viewBox=\"0 0 408.379 1065.58\">\n  <path id=\"Union_2\" data-name=\"Union 2\" d=\"M184.326,1056.28,7.08,875.127a28.865,28.865,0,0,1-5.127-7.69A22.933,22.933,0,0,1,0,857.793a23.723,23.723,0,0,1,3.173-12.084,23.3,23.3,0,0,1,8.667-8.667,24.2,24.2,0,0,1,12.329-3.174,23.062,23.062,0,0,1,17.334,7.08L202.75,1006.06,363.769,840.947a23.866,23.866,0,0,1,17.579-7.08,24.2,24.2,0,0,1,12.329,3.174,23.305,23.305,0,0,1,8.667,8.667,24.695,24.695,0,0,1-3.907,29.418L220.947,1056.28a24.239,24.239,0,0,1-8.3,6.225,23.652,23.652,0,0,1-9.766,2.075Q192.383,1064.58,184.326,1056.28ZM67.282,700q-49.9-42.042-57.764-126.807Q3.366,506.2,1.486,439.38t.342-135.352Q4.05,235.5,10.2,163.379q7.178-80.322,57.08-121.85T204,0q86.816,0,136.718,41.529T397.8,163.379q6.152,72.12,8.374,140.649t.342,135.352q-1.881,66.821-8.033,133.813Q390.622,657.959,340.719,700T204,742.041Q117.184,742.041,67.282,700ZM107.614,84.253Q72.41,110.4,67.966,163.379q-5.812,71.778-8.033,140.307t-.342,135.352q1.881,66.821,8.032,134.155,5.127,57.422,40.161,84.253T204,684.277q61.181,0,96.215-26.831t40.5-84.253q5.812-67.334,7.691-134.155t-.341-135.352q-2.222-68.53-8.033-140.307-4.443-52.978-39.649-79.126T204,58.106Q142.819,58.106,107.614,84.253Zm62.145,124.886a33,33,0,1,1,33,33A33,33,0,0,1,169.759,209.138Z\" transform=\"translate(0.5 0.5)\" stroke=\"rgba(0,0,0,0)\" stroke-miterlimit=\"10\" stroke-width=\"1\"/>\n</svg>";

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
    src: upMd ? desktopImg : mobileImg,
    className: classes.scrollImg
  }));
}

exports.ScrollDownTip = ScrollDownTip;
//# sourceMappingURL=index.js.map
