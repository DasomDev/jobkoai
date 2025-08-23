import { useEffect, useRef } from 'react';
import useJobFilterStore from '../Store/useJobfilter.store';

export const useFilterSearch = (debounceMs: number = 500) => {
  const {
    selectedAreas,
    selectedJobCategories,
    selectedWorkPeriods,
    selectedWorkDays,
    selectedWorkTimes,
    selectedGender,
    selectedWorkType,
    selectedKeyword,
    excludedKeywords,
    excludeIrrelevantGender,
    excludeNegotiation,
    searchJobs,
    isSearching,
    searchResults
  } = useJobFilterStore();

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // 필터 변경 감지 및 자동 검색
  useEffect(() => {
    // 이전 타이머 클리어
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 디바운스된 검색 실행
    timeoutRef.current = setTimeout(() => {
      searchJobs();
    }, debounceMs);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    selectedAreas,
    selectedJobCategories,
    selectedWorkPeriods,
    selectedWorkDays,
    selectedWorkTimes,
    selectedGender,
    selectedWorkType,
    selectedKeyword,
    excludedKeywords,
    excludeIrrelevantGender,
    excludeNegotiation,
    searchJobs,
    debounceMs
  ]);

  // 수동 검색 실행 함수
  const triggerSearch = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    searchJobs();
  };

  return {
    isSearching,
    searchResults,
    triggerSearch
  };
};
