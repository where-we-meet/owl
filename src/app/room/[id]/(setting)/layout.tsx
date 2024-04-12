'use client';

import React, { useEffect } from 'react';
import styles from '@/app/room/[id]/(setting)/layout.module.css';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { id } = useParams();
  console.log(pathname);

  useEffect(() => {
    const currentPath = pathname;
    const currentStep = getCurrentStep(currentPath, id);
    updateStepColor(currentStep);
  }, [pathname, id]);

  const getCurrentStep = (path: string, id: string | string[]) => {
    if (path === `/room/${id}/pick-calendar`) {
      return 1;
    } else if (path === `room/${id}/pick-place`) {
      return 2;
    } else {
      return 3;
    }
  };

  const updateStepColor = (currentStep: number) => {
    const stepItems = document.querySelectorAll(`.${styles.step_item}::before`);
    stepItems.forEach((item, index) => {
      if (index + 1 === currentStep) {
        item.classList.add('active-step');
      } else {
        item.classList.remove('active-step');
      }
    });
    const currentStepItem = document.querySelector(`.${styles.step_item}:nth-child(${currentStep})::before`);
    if (currentStepItem) {
      currentStepItem.classList.add('active-step');
    }
  };

  return (
    <>
      <div className={styles.room_container}>
        <h1 className={styles.room_name}>호기심 많은 올빼미</h1>
        <ol className={styles.step_container}>
          <li className={styles.step_item}>
            <Link href={`/room/${id}/pick-calendar`} className={styles.step_title}>
              <span className={styles.step_item_span}>1</span>
            </Link>
            <p>일정</p>
          </li>
          <li className={styles.step_item}>
            <Link href={`/room/${id}/pick-place`} className={styles.step_title}>
              <span className={styles.step_item_span}>2</span>
            </Link>
            <p>장소</p>
          </li>
          <li className={styles.step_item}>
            <h3 className={styles.step_title}>
              <span className={styles.step_item_span}>3</span>
            </h3>
            <p>확정</p>
          </li>
        </ol>
        <div className={styles.calendar_container}>{children}</div>
      </div>
    </>
  );
};

export default layout;
