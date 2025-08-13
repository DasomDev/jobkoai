import React, { useState } from 'react';
import FilterSection from '../common/FilterSection';

// src/components/filters/WorkAreaFilter.tsx
const JobCategoryFilter: React.FC = () => {
  const [selectedJobCategories, setSelectedJobCategories] = useState<string[]>([]);
  
  return (
    <FilterSection
      title="업직종"
      count={selectedJobCategories.length}
      maxCount={10}
      onAdd={() => {/* open area selection modal */}}
    >
      {/* Selected areas display */}
    </FilterSection>
  );
};

export default JobCategoryFilter;