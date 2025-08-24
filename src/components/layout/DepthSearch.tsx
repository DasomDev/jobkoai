import React, { useState, useEffect } from "react";
import { useDepthSearch, DepthSearchConfig } from "../../hooks/useDepthSearch";
import areaData from "../../data/area.json";
import jobData from "../../data/job.json";
import Counter from "../common/Counter";
import useJobFilterStore from "../../Store/useJobfilter.store";

interface DepthItem {
  id: string;
  name: string;
  children?: DepthItem[];
}

interface DepthSearchProps {
  title: string;
  searchPlaceholder: string;
  onSelect: (selectedItems: string[]) => void;
  onClose: () => void;
  showGroupOption?: boolean;
  groupOptionLabel?: string;
  type?: "area" | "job" | "custom";
}

const DepthSearch: React.FC<DepthSearchProps> = ({
  title,
  searchPlaceholder,
  onSelect,
  onClose,
  showGroupOption = false,
  groupOptionLabel = "유사동묶기?",
  type = "custom",
}) => {
  const [dynamicColumns, setDynamicColumns] = useState<
    {
      title: string;
      data: DepthItem[];
    }[]
  >([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  
  const { selectedAreas } = useJobFilterStore();

  // useDepthSearch 훅 사용
  const {
    searchTerm,
    setSearchTerm,
    selectedItems,
    setSelectedItems,
    groupSimilar,
    setGroupSimilar,
    handleItemSelect,
    handleConfirm,
    reset,
  } = useDepthSearch({
    type,
    title,
    searchPlaceholder,
    columns: [],
    showGroupOption,
    groupOptionLabel,
  });

  // Update dynamic columns based on selections
  useEffect(() => {
    if (type === "area") {
      const newColumns = [
        {
          title: "시·도",
          data: [
            {
              id: "seoul",
              name: areaData.name,
            },
          ],
        },
        {
          title: "시·구·군",
          data: [],
        },
        {
          title: "동·읍·면",
          data: [],
        },
      ];

      // Update second column based on first selection (including default)
      if (selectedItems[0]) {
        newColumns[1] = {
          title: "시·구·군",
          data: areaData.collection.map((area, index) => ({
            id: `area-${index}`,
            name: area,
          })),
        };
      }

      // Update third column based on second selection
      if (selectedItems[1]) {
        // For now, we'll use mock data for the third column
        // In a real implementation, you'd fetch this data from an API
        newColumns[2] = {
          title: "동·읍·면",
          data: [
            { id: "all", name: `${selectedItems[1]} 전체` },
            { id: "area1", name: "개포동" },
            { id: "area2", name: "개포1동" },
            { id: "area3", name: "개포2동" },
            { id: "area4", name: "논현동" },
            { id: "area5", name: "논현1동" },
            { id: "area6", name: "논현2동" },
          ],
        };
      }

      // Apply search filter if search term exists
      if (searchTerm) {
        newColumns.forEach((column) => {
          column.data = column.data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      }

      setDynamicColumns(newColumns);
    } else if (type === "job") {
      const newColumns = [
        {
          title: "업종",
          data: jobData.categories.map((category) => ({
            id: category.id,
            name: category.name,
          })),
        },
        {
          title: "세부업종",
          data: [],
        },
        {
          title: "직종",
          data: [],
        },
      ];

      // Update second column based on first selection (including default)
      if (selectedItems[0]) {
        const selectedCategory = jobData.categories.find(
          (cat) => cat.name === selectedItems[0]
        );
        if (selectedCategory) {
          newColumns[1] = {
            title: "세부업종",
            data: selectedCategory.subcategories.map((sub) => ({
              id: sub.id,
              name: sub.name,
            })),
          };
        }
      }

      // Update third column based on second selection
      if (selectedItems[1]) {
        const selectedCategory = jobData.categories.find(
          (cat) => cat.name === selectedItems[0]
        );
        if (selectedCategory) {
          const selectedSubcategory = selectedCategory.subcategories.find(
            (sub) => sub.name === selectedItems[1]
          );
          if (selectedSubcategory) {
            newColumns[2] = {
              title: "직종",
              data: selectedSubcategory.jobs.map((job, index) => ({
                id: `job-${index}`,
                name: job,
              })),
            };
          }
        }
      }

      // Apply search filter if search term exists
      if (searchTerm) {
        newColumns.forEach((column) => {
          column.data = column.data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      }

      setDynamicColumns(newColumns);
    } else {
      setDynamicColumns([]);
    }
  }, [selectedItems, type, searchTerm]);

  // 컴포넌트가 언마운트될 때 reset 호출
  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div className="fixed inset-0 top-0 bottom-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="flex overflow-hidden flex-col w-full h-full bg-white">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 pr-10 pl-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Group Option */}
        {showGroupOption && (
          <div className="hidden px-4 py-2 border-b border-gray-200">
            <label className="flex gap-2 items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={groupSimilar}
                onChange={(e) => setGroupSimilar(e.target.checked)}
                className="rounded"
              />
              {groupOptionLabel}
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </label>
          </div>
        )}

        {/* Column Headers */}
        <div className="flex border-b border-gray-200">
          {dynamicColumns.map((column, index) => (
            <div
              key={index}
              className="flex-1 p-3 text-sm font-medium text-gray-700 bg-gray-50"
            >
              {column.title}
            </div>
          ))}
        </div>

        {/* Content Columns */}
        <div className="flex overflow-hidden h-full">
          {dynamicColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="overflow-y-auto flex-1 border-r border-gray-200 last:border-r-0"
            >
              {column.data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (type === "area" && columnIndex === 2) {
                      // For area last column, toggle selection like checkboxes
                      setSelectedNeighborhoods(prev => {
                        if (prev.includes(item.name)) {
                          return prev.filter(name => name !== item.name);
                        } else {
                          return [...prev, item.name];
                        }
                      });
                    } else {
                      handleItemSelect(item, columnIndex);
                    }
                  }}
                  className={`p-3 text-sm cursor-pointer ${
                    type === "area" && columnIndex === 2
                      ? selectedNeighborhoods.includes(item.name)
                        ? "bg-[var(--primary-color)] text-white"
                        : "text-gray-700 hover:bg-gray-50"
                      : selectedItems[columnIndex] === item.name
                      ? "bg-[var(--primary-color)] text-white"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Selected Area Display */}
        {type === "area" && selectedNeighborhoods.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">선택된 지역</span>
              <Counter count={selectedAreas.length + selectedNeighborhoods.length} maxCount={10} />
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedNeighborhoods.map((neighborhood, index) => (
                <div
                  key={index}
                  className="flex gap-1 items-center px-3 py-1 bg-orange-100 rounded-full"
                >
                  <span className="text-sm text-orange-700">
                    {neighborhood}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedNeighborhoods(prev => 
                        prev.filter(name => name !== neighborhood)
                      );
                    }}
                    className="text-sm text-orange-500 hover:text-orange-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="h-[65px] p-2 flex gap-2 justify-end bg-white mt-auto border-t border-gray-200 font-bold">
          <button
            onClick={onClose}
            className="px-4 w-full h-[48px] text-sm text-gray-600 rounded-lg border border-gray-300   "
          >
            취소
          </button>
          <button
            onClick={() => handleConfirm(onSelect, onClose, selectedNeighborhoods)}
            className="px-4 w-full h-[48px] text-sm text-white bg-[var(--primary-color)] rounded-lg"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepthSearch;
