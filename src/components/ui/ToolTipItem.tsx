function ToolTipItem({ label, value }: { label: string; value: string }) {
  const isEmpty = !value || value.trim() === '' || value === '확인된 정보가 없습니다.';
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-sm text-green-100/70 font-bold uppercase tracking-wider
       text-gray-50 shirink-0 dark:text-yellow-800/70"
      >
        {label}:
      </span>
      <p
        className={`text-md font-medium break-all leading-tight
        ${
          !isEmpty
            ? ` text-gray-100 dark:text-yellow-800`
            : `text-gray-100/60 text-sm dark:text-yellow-800/70 `
        }
        `}
      >
        {value}
      </p>
    </div>
  );
}

export default ToolTipItem;
