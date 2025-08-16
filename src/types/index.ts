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