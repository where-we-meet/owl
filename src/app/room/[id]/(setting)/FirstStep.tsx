import React from 'react';
import styles from '@/app/room/[id]/(setting)/layout.module.css';
import Link from 'next/link';

const FirstStep = ({ id }: { id: string | string[] }) => {
  return (
    <>
      <ol className={styles.step_container}>
        <li className={styles.step_item}>
          <Link href={`/room/${id}/pick-calendar`} className={styles.step_title}>
            1
          </Link>
          <p>일정</p>
        </li>
        <li className={styles.place_step_item}>
          <Link href={`/room/${id}/pick-place`} className={styles.place_step_title}>
            2
          </Link>
          <p>장소</p>
        </li>
        <li className={styles.place_step_item}>
          <h3 className={styles.place_step_title}>3</h3>
          <p>확정</p>
        </li>
      </ol>
    </>
  );
};

export default FirstStep;
