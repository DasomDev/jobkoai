import { create } from "zustand";

interface JobFilterStore {
  // State
  selectedAreas: string[]; // 근무지역
  selectedJobCategories: string[]; // 업직종
  selectedWorkPeriods: string[]; // 근무기간
  selectedWorkDays: string[]; // 근무요일
  selectedWorkTimes: string[]; // 근무시간
  selectedGender: "male" | "female" | null; // 성별
  selectedWorkType: string; // 고용형태
  selectedKeyword: string; // 키워드
  excludeIrrelevantGender: boolean; // 관련없음 제외

  isShowDepthSearch: boolean; // 깊이 검색 표시 여부
  

  // Actions
  setSelectedAreas: (areas: string[]) => void; // 근무지역
  setSelectedJobCategories: (categories: string[]) => void; // 업직종
  setSelectedWorkPeriods: (periods: string[]) => void; // 근무기간
  setSelectedWorkDays: (days: string[]) => void; // 근무요일
  setSelectedWorkTimes: (times: string[]) => void; // 근무시간
  setSelectedGender: (gender: "male" | "female" | null) => void; // 성별
  setSelectedKeyword: (keyword: string) => void; // 키워드
  setSelectedWorkType: (type: string) => void; // 고용형태
  setExcludeIrrelevantGender: (excludeIrrelevant: boolean) => void; // 관련없음 제외
  setIsShowDepthSearch: (isShowDepthSearch: boolean) => void; // 깊이 검색 표시 여부
}

const useJobFilterStore = create<JobFilterStore>((set) => ({
  selectedAreas: [],
  selectedJobCategories: [],
  selectedWorkPeriods: [],
  selectedWorkDays: [],
  selectedWorkTimes: [],
  selectedGender: null,
  selectedWorkType: "",
  selectedKeyword: "",
  excludeIrrelevantGender: false,
  isShowDepthSearch: false,
  setSelectedAreas: (areas) => set({ selectedAreas: areas }),
  setSelectedJobCategories: (categories) =>
    set({ selectedJobCategories: categories }),
  setSelectedWorkPeriods: (periods) => set({ selectedWorkPeriods: periods }),
  setSelectedWorkDays: (days) => set({ selectedWorkDays: days }),
  setSelectedWorkTimes: (times) => set({ selectedWorkTimes: times }),
  setSelectedGender: (gender) => set({ selectedGender: gender }),
  setSelectedWorkType: (type) => set({ selectedWorkType: type }),
  setSelectedKeyword: (keyword) => set({ selectedKeyword: keyword }),
  setExcludeIrrelevantGender: (excludeIrrelevantGender) =>
    set({ excludeIrrelevantGender: excludeIrrelevantGender }),
  setIsShowDepthSearch: (isShowDepthSearch) =>
    set({ isShowDepthSearch: isShowDepthSearch }),
}));

export default useJobFilterStore;
