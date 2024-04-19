'use client';

import ResultMap from './ResultMap';
import styles from './ResultPlace.module.css';

const ResultPlace = () => {
  return (
    <section>
      <div className={styles.container}>
        <ResultMap />
      </div>
    </section>
  );
};

export default ResultPlace;
