import React from 'react';
import FilterSection from '../common/FilterSection';
import useJobFilterStore from '../../Store/useJobfilter.store';

const JobCategoryFilter: React.FC = () => {
  const { 
    selectedJobCategories, 
    setIsShowDepthSearch,
    setDepthSearchType,
    removeSelectedJobCategory
  } = useJobFilterStore();
  
  const handleAddJobCategory = () => {
    setDepthSearchType('job');
    setIsShowDepthSearch(true);
  };

  return (
    <FilterSection
      title="업직종"
      count={selectedJobCategories.length}
      maxCount={10}
      onAdd={handleAddJobCategory}
    >
      {/* Selected job categories display */}
      {selectedJobCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedJobCategories.map((category, index) => (
            <div
              key={index}
              className="flex gap-1 items-center px-3 py-1 bg-gray-100 rounded-full"
            >
              <span className="text-sm text-gray-700">{category}</span>
              <button
                onClick={() => removeSelectedJobCategory(category)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </FilterSection>
  );
};

export default JobCategoryFilter;