'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/app/room/[id]/(setting)/layout.module.css';
import { useParams, usePathname } from 'next/navigation';
import FirstStep from './FirstStep';
import SecondtStep from './SecondStep';

const Layout = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <>
      <div className={styles.room_container}>
        {currentStep === 1 && <FirstStep id={id} />}
        {currentStep === 2 && <SecondtStep id={id} />}
      </div>
      <div className={styles.calendar_container}>{children}</div>
    </>
  );
};

export default Layout;
