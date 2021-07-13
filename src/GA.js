import ReactGA from 'react-ga';

function init(trackingId, userId) {
  ReactGA.initialize(trackingId, {
    debug: true,
    gaOptions: {
      userId
    }
  });
}

function pageView(label) {
  ReactGA.pageview(label);
}

function modalView(label) {
  ReactGA.modalview(label);
}

function event(category, action, label) {
  ReactGA.event({
    category,
    action,
    label
  });
}

const GA = {
  init,
  pageView,
  modalView,
  event
};

export default GA;
