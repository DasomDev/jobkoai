import React, { useState } from "react";

/** Data  */
import job from "./data/job.json";
import area from "./data/area.json";

/** Components */
import Header from "./components/layout/Header";
import WorkAreaFilter from "./components/filters/WorkAreaFilter";
import JobCategoryFilter from "./components/filters/JobCategoryFilter";
import WorkLength from "./components/filters/WorkPeriods";
import WorkDays from "./components/filters/WorkDays";
import GenderFilter from "./components/filters/GenderFilter";
import WorkType from "./components/filters/WorkType";
import KeywordFilter from "./components/filters/KeywordFilter";
import WorkTimes from "./components/filters/WorkTimes";
import Result from "./components/layout/Result";

import DepthSearch from "./components/layout/DepthSearch";

/** Store */
import useJobFilterStore from "./Store/useJobfilter.store";

function App() {
  const {
    selectedAreas,
    selectedJobCategories,
    selectedWorkPeriods,
    selectedWorkDays,
    selectedWorkTimes,
    selectedGender,
    selectedWorkType,
    selectedKeyword,
    isShowDepthSearch,
    depthSearchType,
    setIsShowDepthSearch,
    setDepthSearchType,
    setSelectedAreas,
    setSelectedJobCategories,
  } = useJobFilterStore();

  // Configuration for different depth search types
  const getDepthSearchConfig = () => {
    switch (depthSearchType) {
      case 'job':
        return {
          title: "업직종 선택",
          searchPlaceholder: "업직종을 검색하세요.",
          type: 'job',
          showGroupOption: false,
        };
      case 'area':
        return {
          title: "지역 선택",
          searchPlaceholder: "지역명을 검색하세요.",
          type: 'area',
          showGroupOption: false,
        };
      default:
        return null;
    }
  };

  const depthSearchConfig = getDepthSearchConfig();

  const handleDepthSearchSelect = (selected) => {
    if (depthSearchType === 'job') {
      setSelectedJobCategories(selected);
    } else if (depthSearchType === 'area') {
      // For area, selected is already a joined string like "서울 관악구 신림동"
      setSelectedAreas(selected);
    }
  };

  const handleDepthSearchClose = () => {
    setIsShowDepthSearch(false);
    setDepthSearchType(null);
  };

  return (
    <div className="App">
      <Header />
      {isShowDepthSearch && depthSearchConfig && (
        <DepthSearch
          title={depthSearchConfig.title}
          searchPlaceholder={depthSearchConfig.searchPlaceholder}
          type={depthSearchConfig.type}
          onSelect={handleDepthSearchSelect}
          onClose={handleDepthSearchClose}
          showGroupOption={depthSearchConfig.showGroupOption}
        />
      )}
      <div className="h-[68px] bg-[#f8f8f8] flex justify-center text-sm items-center text-[#6a6a6a]">
        모든 채용메뉴에 공통 반영됩니다.
      </div>
      <div className="flex flex-col gap-10 pb-[65px] px-5 py-4">
        <WorkAreaFilter />
        <JobCategoryFilter />
        <WorkLength />
        <WorkDays />
        <WorkTimes />
        <GenderFilter />
        <WorkType />
        <KeywordFilter />
      </div>
      <Result />
    </div>
  );
}

export default App;
