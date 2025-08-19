import React, { useState } from "react";

/** Data  */
import job from "./data/job.json";

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
    setIsShowDepthSearch,
  } = useJobFilterStore();

  const jobCategoryColumns = [
    {
      title: "업직종",
      data: job.collection.map((item) => ({
        id: item,
        name: item,
      })),
    },
  ];

  return (
    <div className="App">
      <Header />
      <div>
        {/* <p>selectedWorkPeriods: {selectedWorkPeriods}</p> */}
      </div>

      {isShowDepthSearch && (
        <DepthSearch
          title="업직종 선택"
          searchPlaceholder="업직종을 검색하세요."
          columns={jobCategoryColumns}
          onSelect={(selected) => {
            console.log("Selected job categories:", selected);
          }}
          onClose={() => {
            setIsShowDepthSearch(false);
          }}
          showGroupOption={false}
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
