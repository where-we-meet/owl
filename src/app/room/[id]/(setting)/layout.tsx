import React, { useEffect } from 'react';
import styles from '@/app/room/[id]/(setting)/layout.module.css';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.room_container}>
        <h1 className={styles.room_name}>호기심 많은 올빼미</h1>
        <ol className={styles.step_container}>
          <li className={styles.step_item}>
            <h2 className={styles.step_title}>1</h2>
            <p>일정</p>
          </li>
          <li className={styles.step_item}>
            <h2 className={styles.step_title}>2</h2>
            <p>장소</p>
          </li>
          <li className={styles.step_item}>
            <h3 className={styles.step_title}>3</h3>
            <p>확정</p>
          </li>
        </ol>
        <div>{children}</div>
      </div>
    </>
  );
}
