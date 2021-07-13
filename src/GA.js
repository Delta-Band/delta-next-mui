import ReactGA from 'react-ga';

function init(trackingId, userId, options = {}) {
  const myStorage = window.localStorage;
  const uid = myStorage.getItem('userId');
  if (uid !== userId) {
    myStorage.setItem('userId', userId);
  }
  if (process.env.NODE_ENV === 'production' || options.devMode) {
    ReactGA.initialize(trackingId, {
      debug: true,
      gaOptions: {
        userId: myStorage.getItem('userId')
      }
    });
  }
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
