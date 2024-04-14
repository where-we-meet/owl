import { ChangeEvent } from 'react';
import styles from './RangeController.module.css';
import { useRangeStore } from '@/store/placeStore';
import { Button } from '@nextui-org/react';

const RADIUS_RANGES = [200, 700, 2000, 4000];

const RangeController = () => {
  const { range, setRange } = useRangeStore((state) => state);

  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(+e.currentTarget.value);
  };

  const resetRange = () => {
    setRange(0);
  };

  return (
    <>
      <div className={styles.range_controller}>
        <form className={styles.range_wrap}>
          {RADIUS_RANGES.map((value) => (
            <label key={value} htmlFor={`radius-${value}`} data-radius={value}>
              <input
                id={`radius-${value}`}
                name="radius"
                type="radio"
                value={value}
                checked={range === value}
                onChange={handleChangeRange}
                required
              />
            </label>
          ))}
        </form>
        <Button onClick={resetRange}>검색범위 초기화!</Button>
      </div>
    </>
  );
};

export default RangeController;
