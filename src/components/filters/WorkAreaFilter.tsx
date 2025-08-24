import React from 'react';
import FilterSection from '../common/FilterSection';
import useJobFilterStore from '../../Store/useJobfilter.store';

const WorkAreaFilter: React.FC = () => {
  const { 
    selectedAreas, 
    setIsShowDepthSearch,
    setDepthSearchType,
    removeSelectedArea
  } = useJobFilterStore();

  const handleAddArea = () => {
    setDepthSearchType('area');
    setIsShowDepthSearch(true);
  };

  return (
    <FilterSection
      title="근무지역"
      count={selectedAreas.length}
      maxCount={10}
      onAdd={handleAddArea}
    >
      {/* Selected areas display */}
      {selectedAreas.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedAreas.map((area, index) => (
            <div
              key={index}
              className="flex gap-1 items-center px-3 py-1 bg-gray-100 rounded-full"
            >
              <span className="text-sm text-gray-700">{area}</span>
              <button
                onClick={() => removeSelectedArea(area)}
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

export default WorkAreaFilter;