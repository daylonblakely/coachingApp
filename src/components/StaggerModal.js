import React from 'react';
import { Stagger, Modal } from 'native-base';

const StaggerModal = ({ isOpen, onToggle, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onToggle}>
      <Stagger
        visible={isOpen}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            mass: 1,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
      >
        {children}
      </Stagger>
    </Modal>
  );
};

export default StaggerModal;
