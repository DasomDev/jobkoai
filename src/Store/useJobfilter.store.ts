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
  
  // Search state
  isSearching: boolean; // 검색 중인지 상태
  searchResults: any[]; // 검색 결과

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
  
  // Search actions
  searchJobs: () => Promise<void>; // 검색 실행
  setIsSearching: (isSearching: boolean) => void; // 검색 상태 설정
  setSearchResults: (results: any[]) => void; // 검색 결과 설정
}

const useJobFilterStore = create<JobFilterStore>((set, get) => ({
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
  isSearching: false,
  searchResults: [],
  
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
  setIsSearching: (isSearching) => set({ isSearching }),
  setSearchResults: (results) => set({ searchResults: results }),
  
  searchJobs: async () => {
    const state = get();
    set({ isSearching: true });
    
    try {
      // API 호출 로직
      const searchParams = {
        areas: state.selectedAreas,
        jobCategories: state.selectedJobCategories,
        workPeriods: state.selectedWorkPeriods,
        workDays: state.selectedWorkDays,
        workTimes: state.selectedWorkTimes,
        gender: state.selectedGender,
        workType: state.selectedWorkType,
        keyword: state.selectedKeyword,
        excludeIrrelevantGender: state.excludeIrrelevantGender,
      };
      
      console.log('검색 파라미터:', searchParams);
      
      // 실제 API 호출 (예시)
      // const response = await fetch('/api/jobs/search', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(searchParams)
      // });
      // const results = await response.json();
      
      // 임시 결과 (실제로는 API 응답)
      const mockResults = [
        { id: 1, title: '프론트엔드 개발자', company: '테크컴퍼니' },
        { id: 2, title: '백엔드 개발자', company: '스타트업' },
      ];
      
      set({ searchResults: mockResults });
    } catch (error) {
      console.error('검색 중 오류:', error);
      set({ searchResults: [] });
    } finally {
      set({ isSearching: false });
    }
  },
}));

export default useJobFilterStore;
