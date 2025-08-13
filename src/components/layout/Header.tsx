const Header = () => {
  return (
    <header className="App-header border-b">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>

        <h3 className="text-lg font-bold">검색조건설정</h3>
      </div>
      <button>초기화</button>
    </header>
  );
};

export default Header;
