import { ChangeEvent, Fragment, useState } from 'react';
import { Circle } from 'react-kakao-maps-sdk';
import styles from './RangeController.module.css';

const radiusRanges = [300, 1000, 2000, 4000];

const RangeController = ({ center }: { center: { lat: number; lng: number } }) => {
  const [radius, setRadius] = useState(radiusRanges[0]);

  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadius(+e.currentTarget.value);
  };

  const resetRange = () => {
    setRadius(0);
  };

  return (
    <>
      <Circle
        center={center}
        radius={radius}
        strokeWeight={3}
        strokeColor={'#000000'}
        strokeOpacity={0.1}
        strokeStyle={'solid'}
        fillColor={'#00a0e9'}
        fillOpacity={0.05}
      />
      <div className={styles.range_controller}>
        <form className={styles.range_wrap}>
          {radiusRanges.map((value) => (
            <label key={value} htmlFor={`radius-${value}`} data-radius={value}>
              <input
                id={`radius-${value}`}
                name="radius"
                type="radio"
                value={value}
                checked={radius === value}
                onChange={handleChangeRange}
                required
              />
            </label>
          ))}
        </form>
        <button onClick={resetRange}>범위 지우기!</button>
      </div>
    </>
  );
};

export default RangeController;
