interface CounterProps {
  count: number;
  maxCount: number;
}

const Counter: React.FC<CounterProps> = ({ count, maxCount }) => {
  return (
    <div className="flex items-center text-xs">
      <span className=" text-[var(--primary-color)]">{count}</span>
      <span className="text-gray-500">/{maxCount}</span>
    </div>
  );
};

export default Counter;
