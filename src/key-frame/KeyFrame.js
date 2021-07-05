import React, { useEffect, useContext, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactGA from 'react-ga';
import keyframeService from './keyframe.store';

function KeyFrame({ children, className }) {
  const { dispatch } = useContext(keyframeService.store);
  const timeout = useRef();
  const [ref, inView] = useInView({
    threshold: threshold
  });

  useEffect(() => {
    if (inView) {
      dispatch({ type: 'set_keyframe', value: name });
      timeout.current = setTimeout(() => {
        ReactGA.event({
          category: 'Section View',
          action: 'User has viewed this section for more than 3 seconds',
          label: name,
          nonInteraction: true
        });
      }, 3000);
    }
    if (!inView) {
      clearTimeout(timeout.current);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [inView]);

  return <div className={className}>{children}</div>;
}

export default KeyFrame;
