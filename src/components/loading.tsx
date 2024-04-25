'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './loading.module.css';

export const Loading = () => {
  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.loading}>
          퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해퇴사해
        </div>
      </motion.div>
    </>
  );
};

export default Loading;
