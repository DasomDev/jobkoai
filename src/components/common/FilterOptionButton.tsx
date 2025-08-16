/**
 * 클릭해서 필터 조건에 추가하는 버튼 컴포넌트
 */
interface FilterOptionButton {
  id: string;
  label: string;
  selected: boolean;
  maxSelections: number;
  handleClick: () => void;
  isDisabled: boolean;
}

const FilterOptionButton = ({
  id,
  label,
  selected,
  maxSelections,

  handleClick,
  isDisabled,
}: FilterOptionButton) => {
  return (
    <button
      className={`
      py-[10px] px-[16px] flex items-center justify-center h-[34px]  rounded-full text-sm font-medium transition-colors
      ${
        selected
          ? "border border-[#ffddd2] bg-[#fff8f6] text-[var(--primary-color)]"
          : "bg-gray-100 text-gray-700 "
      }
      ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    `}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default FilterOptionButton;
