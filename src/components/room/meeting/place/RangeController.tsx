import { ChangeEvent, Fragment, useState } from 'react';
import { Circle } from 'react-kakao-maps-sdk';
import styles from './RangeController.module.css';

const radiusRanges = [300, 1000, 2000, 4000];

const RangeController = ({ center }: { center: { lat: number; lng: number } }) => {
  const [radiusLevel, setRadiusLevel] = useState(0);
  const [radius, setRadius] = useState(radiusRanges[radiusLevel]);

  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadiusLevel(+e.currentTarget.value);
    setRadius(radiusRanges[+e.currentTarget.value]);
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
          {radiusRanges.map((option, idx) => (
            <label key={idx} htmlFor={`radius-${option}`} data-radius={option}>
              <input
                id={`radius-${option}`}
                name="radius"
                type="radio"
                value={idx}
                checked={radiusLevel === idx}
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
