interface IconBtnItemProps {
  icon: React.ElementType; //Lucide 아이콘 타입을 받을 때 사용
  onClick: () => void;
  hoverColor?: string;
}

function IconBtnItem({ icon: Icon, onClick }: IconBtnItemProps) {
  return (
    <button
      className={`flex items-center justify-center p-2
      text-gray-500 transition-colors hover:text-green-600
      dark:text-yellow-200/50 dark:hover:text-yellow-800
      `}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Icon size={25} />
    </button>
  );
}

export default IconBtnItem;
