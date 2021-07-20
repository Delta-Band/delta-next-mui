import ReactGA from 'react-ga';

function init(trackingId, userId, options = {}) {
  const myStorage = window.localStorage;
  let uid = myStorage.getItem('userId');
  if (uid === 'undefined') {
    // clear leftovers from old bug
    myStorage.removeItem('userId');
    uid = myStorage.getItem('userId');
  }
  if (userId && uid !== userId) {
    myStorage.setItem('userId', userId);
  }
  if (process.env.NODE_ENV === 'production' || options.devMode) {
    uid = myStorage.getItem('userId');
    if (uid) {
      ReactGA.initialize(trackingId, {
        debug: true,
        gaOptions: {
          userId: uid
        }
      });
    } else {
      ReactGA.initialize(trackingId, {
        debug: true
      });
    }
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
