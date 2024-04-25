'use client';

import { type MouseEvent, useState } from 'react';
import { useRangeStore } from '@/store/placeStore';
import styles from './RangeController.module.css';

const RADIUS_RANGES = [200, 700, 2000, 4000];

const rangeConversion = (value: number) => {
  return value >= 1000 ? `${value / 1000}km` : `${value}m`;
};

const RangeController = () => {
  const [currentRange, setCurrentRange] = useState('r_200');
  const { range, setRange } = useRangeStore((state) => state);

  const handleChangeRange = (e: MouseEvent<HTMLDivElement>) => {
    setRange(+e.currentTarget.id);
    setCurrentRange(`r_${e.currentTarget.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.select_range}>{`${rangeConversion(range)}`}</span>
        <div className={styles.range_bar}></div>
        <div className={`${styles.range_select_circle} ${styles[currentRange]}`}></div>
        {RADIUS_RANGES.map((value) => (
          <>
            <div key={value} id={`${value}`} className={styles.range_circle} onClick={handleChangeRange} />
          </>
        ))}
      </div>
    </div>
  );
};

export default RangeController;
