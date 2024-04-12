'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/app/room/[id]/(setting)/layout.module.css';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import FirstStep from './FirstStep';

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState<Number>(1);

  useEffect(() => {
    if (pathname === `/room/${id}/pick-calendar`) {
      setCurrentStep(1);
    } else if (pathname === `/room/${id}/pick-place`) {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  }, [pathname, id]);

  console.log(currentStep);

  return (
    <>
      <div className={styles.room_container}>
        <h1 className={styles.room_name}>호기심 많은 올빼미</h1>
        {currentStep === 1 && <FirstStep id={id} />}
        <div className={styles.calendar_container}>{children}</div>
      </div>
    </>
  );
};

export default layout;
