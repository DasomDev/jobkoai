import React, { useState } from "react";

interface DepthItem {
  id: string;
  name: string;
  children?: DepthItem[];
}

interface DepthSearchProps {
  title: string;
  searchPlaceholder: string;
  columns: {
    title: string;
    data: DepthItem[];
  }[];
  onSelect: (selectedItems: string[]) => void;
  onClose: () => void;
  showGroupOption?: boolean;
  groupOptionLabel?: string;
}

const DepthSearch: React.FC<DepthSearchProps> = ({
  title,
  searchPlaceholder,
  columns,
  onSelect,
  onClose,
  showGroupOption = false,
  groupOptionLabel = "유사동묶기?",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [groupSimilar, setGroupSimilar] = useState(false);

  const handleItemSelect = (item: DepthItem, columnIndex: number) => {
    // Update selected items based on column
    const newSelectedItems = [...selectedItems];
    newSelectedItems[columnIndex] = item.name;
    setSelectedItems(newSelectedItems);
  };

  const handleConfirm = () => {
    onSelect(selectedItems.filter((item) => item));
    onClose();
  };

  return (
    <div className="absolute inset-0 top-0 bottom-0 z-50 justify-center items-center bg-black bg-opacity-50">
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
          <div className="px-4 py-2 border-b border-gray-200">
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
          {columns.map((column, index) => (
            <div
              key={index}
              className="flex-1 p-3 text-sm font-medium text-gray-700 bg-gray-50"
            >
              {column.title}
            </div>
          ))}
        </div>

        {/* Content Columns */}
        <div className="flex overflow-hidden h-96">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="overflow-y-auto flex-1 border-r border-gray-200 last:border-r-0"
            >
              {column.data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemSelect(item, columnIndex)}
                  className={`p-3 text-sm cursor-pointer hover:bg-gray-50 ${
                    selectedItems[columnIndex] === item.name
                      ? "bg-orange-100 text-orange-800"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="h-[65px] p-2 flex gap-2 justify-end bg-white mt-auto border-t border-gray-200 font-bold">
          <button
            onClick={onClose}
            className="px-4 w-full h-[48px] text-sm text-gray-600 rounded-lg border border-gray-300   "
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
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
