import { create } from "zustand";

interface JobFilterStore {
  workArea: string;
  jobCategory: string;
  workPeriods: string;
  workDays: string;
  gender: string;
  workTimes: string;
  keyword: string;
}

const useJobFilterStore = create<JobFilterStore>((set) => ({
  workArea: "",
  jobCategory: "",
  workPeriods: "",
  workDays: "",
  gender: "",
  workTimes: "",
  keyword: "",
}));

export default useJobFilterStore;