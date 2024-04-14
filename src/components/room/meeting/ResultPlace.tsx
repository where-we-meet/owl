'use client';

import RangeController from './place/RangeController';
import ResultMap from './place/ResultMap';
import CategorySelector from './place/search/CategorySelector';
import styles from './ResultPlace.module.css';

const ResultPlace = () => {
  return (
    <section>
      <div className={styles.container}>
        <ResultMap />
        <CategorySelector />
      </div>
      <RangeController />
    </section>
  );
};

export default ResultPlace;
