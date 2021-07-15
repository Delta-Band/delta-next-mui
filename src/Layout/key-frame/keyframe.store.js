import React, { createContext, useReducer } from 'react';

const ACTIONS = {
  SET_KEYFRAME: 'set_keyframe'
};

const initialState = {
  keyframe: ''
};
const store = createContext(initialState);
store.displayName = 'Store';
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(function MainReducer(
    globalState,
    action
  ) {
    switch (action.type) {
      case ACTIONS.SET_KEYFRAME: {
        if (globalState.keyframe !== action.value) {
          const newState = Object.assign({}, globalState, {
            keyframe: action.value
          });
          return newState;
        }
        return globalState;
      }
      default:
        throw new Error(`action typer not defined: ${action.type}`);
    }
  },
  initialState);

  return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};

const service = {
  store,
  StateProvider,
  ACTIONS
};

export default service;
