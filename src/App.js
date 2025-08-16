import React, { useState } from "react";
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

function App() {
  return (
    <div className="App">
      <Header />
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
