import React, { useState } from "react";
import Counter from "../common/Counter";

const KeywordFilter: React.FC = () => {
  const [includeKeyword, setIncludeKeyword] = useState("");
  const [excludeKeyword, setExcludeKeyword] = useState("");
  const [excludedKeywords, setExcludedKeywords] = useState<string[]>([]);

  const maxIncludeLength = 20;
  const maxExcludeLength = 100;

  const handleAddExclude = () => {
    if (
      excludeKeyword.trim() &&
      !excludedKeywords.includes(excludeKeyword.trim())
    ) {
      setExcludedKeywords((prev) => [...prev, excludeKeyword.trim()]);
      setExcludeKeyword("");
    }
  };

  const handleRemoveExclude = (keyword: string) => {
    setExcludedKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddExclude();
    }
  };

  return (
    <div className="">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900">키워드</h3>
        <p className="mt-1 text-xs text-gray-600">
          여러 개의 키워드를 포함하거나 제외할 수 있습니다.
        </p>
      </div>

      {/* Include Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-gray-900">포함</h4>
          <Counter count={includeKeyword.length} maxCount={maxIncludeLength} />
        </div>
        <div className="relative">
          <input
            type="text"
            value={includeKeyword}
            onChange={(e) =>
              setIncludeKeyword(e.target.value.slice(0, maxIncludeLength))
            }
            placeholder="입력 단어 포함 공고만 검색합니다."
            className="p-3 pr-16 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Exclude Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-gray-900">제외</h4>
          <Counter count={excludedKeywords.length} maxCount={maxExcludeLength} />
        </div>
        <div className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={excludeKeyword}
              onChange={(e) =>
                setExcludeKeyword(e.target.value.slice(0, maxExcludeLength))
              }
              onKeyPress={handleKeyPress}
              placeholder="추가 단어 포함 공고를 제외합니다."
              className="p-3 pr-16 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-black"
            />
          </div>
          <button
            onClick={handleAddExclude}
            disabled={!excludeKeyword.trim()}
            className="px-4 py-3 font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            추가
          </button>
        </div>

        {/* Excluded Keywords List */}
        {excludedKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {excludedKeywords.map((keyword, index) => (
              <div
                key={index}
                className="flex gap-1 items-center px-3 py-1 bg-gray-100 rounded-full"
              >
                <span className="text-sm text-gray-700">{keyword}</span>
                <button
                  onClick={() => handleRemoveExclude(keyword)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordFilter;
