import React from 'react';
import FilterSection from '../common/FilterSection';
import useJobFilterStore from '../../Store/useJobfilter.store';

// src/components/filters/WorkAreaFilter.tsx
const WorkAreaFilter: React.FC = () => {
  const { selectedAreas, setIsShowDepthSearch } = useJobFilterStore();
  return (
    <FilterSection
      title="근무지역"
      count={selectedAreas.length}
      maxCount={10}
      onAdd={() => {
        setIsShowDepthSearch(true);
      }}
    >
      {/* Selected areas display */}
    </FilterSection>
  );
};

export default WorkAreaFilter;