'use client';

import RangeController from './place/RangeController';
import ResultMap from './place/ResultMap';
import CategorySelector from './place/search/CategorySelector';

const ResultPlace = () => {
  return (
    <section>
      <ResultMap />
      <RangeController />
      <CategorySelector />
    </section>
  );
};

export default ResultPlace;
