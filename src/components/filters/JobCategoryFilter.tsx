import React, { useState } from 'react';
import FilterSection from '../common/FilterSection';
import useJobFilterStore from '../../Store/useJobfilter.store';

// src/components/filters/WorkAreaFilter.tsx
const JobCategoryFilter: React.FC = () => {
  const [selectedJobCategories, setSelectedJobCategories] = useState<string[]>([]);
  const { setIsShowDepthSearch } = useJobFilterStore();
  
  return (
    <FilterSection
      title="업직종"
      count={selectedJobCategories.length}
      maxCount={10}
      onAdd={() => {
        setIsShowDepthSearch(true);
      }}
    >
      {/* Selected areas display */}
    </FilterSection>
  );
};

export default JobCategoryFilter;