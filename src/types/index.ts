// 검색 조건 관련 타입들
export interface SearchFilters {
  location: string;
  jobType: string[];
  salary: {
    min: number;
    max: number;
  };
  workDays: string[];
  workTime: string[];
  experience: string;
  education: string;
  benefits: string[];
}

// 직업 카테고리 타입
export interface JobCategory {
  id: string;
  name: string;
  icon: string;
}

// 지역 타입
export interface Location {
  id: string;
  name: string;
  districts?: string[];
}

// 급여 범위 타입
export interface SalaryRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

// 근무일 타입
export interface WorkDay {
  id: string;
  name: string;
  shortName: string;
}

// 근무시간 타입
export interface WorkTime {
  id: string;
  name: string;
  description: string;
}



// 지원하기 버튼 클릭 시 전송할 데이터 타입
export interface ApplicationData {
  filters: SearchFilters;
  timestamp: string;
  userAgent: string;
  deviceInfo: {
    screenWidth: number;
    screenHeight: number;
    userAgent: string;
  };
} 