'use client';

import React from 'react';
import styles from '@/app/room/[id]/(setting)/layout.module.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const layout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();

  return (
    <>
      <div className={styles.room_container}>
        <h1 className={styles.room_name}>호기심 많은 올빼미</h1>
        <ol className={styles.step_container}>
          <li className={styles.step_item}>
            <Link href={`/room/${id}/pick-calendar`} className={styles.step_title}>
              1
            </Link>
            <p>일정</p>
          </li>
          <li className={styles.step_item}>
            <Link href={`/room/${id}/pick-place`} className={styles.step_title}>
              2
            </Link>
            <p>장소</p>
          </li>
          <li className={styles.step_item}>
            <h3 className={styles.step_title}>3</h3>
            <p>확정</p>
          </li>
        </ol>
        <div className={styles.calendar_container}>{children}</div>
      </div>
    </>
  );
};

export default layout;
