import React, { useState } from 'react';
import FilterSection from '../common/FilterSection';

// src/components/filters/WorkAreaFilter.tsx
const WorkAreaFilter: React.FC = () => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  
  return (
    <FilterSection
      title="근무지역"
      count={selectedAreas.length}
      maxCount={10}
      onAdd={() => {/* open area selection modal */}}
    >
      {/* Selected areas display */}
    </FilterSection>
  );
};

export default WorkAreaFilter;