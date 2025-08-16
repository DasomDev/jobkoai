const Header = () => {
  return (
    <header className="flex justify-between h-[55px] px-5 border-b">
      <div className="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <h3 className="font-bold">검색조건설정</h3>
      </div>
      <button className="text-sm">초기화</button>
    </header>
  );
};

export default Header;
