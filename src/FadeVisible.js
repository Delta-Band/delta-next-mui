import React from 'react';
import { motion } from 'framer-motion';
import { useVisible } from 'react-hooks-visible';

function FadeVisible({ children, className, fadeOutWhenReached = 0.7 }) {
  const [targetRef, visible] = useVisible();
  const vis = visible < fadeOutWhenReached ? 0 : 1;
  console.log('visible: ', visible);

  return (
    <motion.div
      ref={targetRef}
      className={className}
      animate={{
        opacity: vis
      }}
      transition={{
        type: 'spring',
        bounce: 0
        // delay: visible === 1 ? 0.2 : 0
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeVisible;
