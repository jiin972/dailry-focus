import { useRecoilValue, useSetRecoilState } from 'recoil';
import { taskByDateSelector } from '../features/selectors/taskByDateSelector';
import { isToday as isTodayDateFns } from 'date-fns';
import { taskFormModalState } from '../../atom';

interface IHoliday {
  date: string;
  name: string;
}

interface IDayCellProps {
  day: number | null;
  dayIdx: number;
  currentDate: Date;
  holiday?: IHoliday;
}

function DayCell({ day, dayIdx, currentDate, holiday }: IDayCellProps) {
  //기본계산상태
  const isWeekend = dayIdx === 0 || dayIdx === 6; //주말 정의
  const isCurrentMonthDay = day !== 0; //당월에 해당하는 실제 날짜 정의
  //[핵심] 오늘 여부 판단
  const targetDate = isCurrentMonthDay
    ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day as number)
    : null;
  const isToday = targetDate ? isTodayDateFns(targetDate) : false;
  //Selector를 위한 datekey생성(day가 있을 경우만-시차문제로 toISOString은 사용안함)
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const date = String(day).padStart(2, '0');
  const dateKey = `${year}-${month}-${date}`;
  //Hook(Selector)호출, (*항상 Early Return보다 위에)
  const dayTasks = useRecoilValue(taskByDateSelector(dateKey));
  //Cell에서 입력창을 띄우기 위한 state호출
  const setModal = useSetRecoilState(taskFormModalState);

  //Early return(해당사항이 없는 요소들)
  if (!day || day === 0) {
    return (
      <div
        className="min-h-28 bg-gray-200/30
       dark:bg-gray-600/10 pointer-events-none"
      ></div>
    );
  }
  //스타일 정의
  const classes = [
    'h-28 p-1 flex flex-col items-start justify-start cursor-pointer overflow-hidden',
    isToday
      ? 'bg-green-200 dark:bg-yellow-500/40 dark:text-gray-900 shadow-sm rounded-md font-extrabold'
      : '',
    isWeekend || holiday ? (dayIdx === 0 ? ' text-red-500' : ' text-blue-500') : 'text-gray-900',
    //주말일 때(오늘이 아님 포함)
    !isToday && !isWeekend ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : '',
    isWeekend && !isToday ? 'dark:bg-gray-900 hover:bg-red-100 dark:hover:bg-gray-700 ' : '',
    //평일이면서 오늘이 아닐때
    !isToday && !isWeekend ? 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200' : '',
  ];
  //스타일 배열을 공백으로 합쳐서 하나의 문자열 반환
  const cellClasses = classes.filter(Boolean).join(' '); //공백 추가
  //cell에서 입력창을 띄우기 위한 로직
  const handleCellClick = () => {
    setModal({
      isFormOpen: true,
      selectedDate: targetDate || new Date(),
      editingTask: null,
    });
  };

  return (
    <div className={cellClasses} onClick={handleCellClick}>
      <div className="flex items-center gap-1">
        <div className="w-7 h-7 flex items-center justify-center text-sm"> {day}</div>
        {holiday && (
          <div
            className="flex items-center text-[10px] text-red-500 dark:text-red-100
        bg-red-100 dark:bg-red-500 pl-1 pr-1 rounded-md
        font-medium truncate"
          >
            {holiday.name}
          </div>
        )}
      </div>
      <div className="flex flex-col items-start gap-0.5 w-full flex-1 overflow-hidden">
        {dayTasks.slice(0, 2).map((task) => (
          <div
            key={task.id}
            className={`gap-1 px-1.5 py-0.5 text-[10px]  rounded-lg 
          truncate cursor-pointer transition-colors duration-150
          ${
            task.isCompleted
              ? `bg-gray-100 text-gray-400 line-through dark:bg-gray-700`
              : `bg-green-100 text-green-600 dark:bg-yellow-500/40 dark:text-yellow-300
            `
          }`}
          >
            {task.title}
          </div>
        ))}
        {dayTasks.length > 2 && (
          <span className="text-[12px] font-semibold text-gray-400 ml-1 mt-auto">
            +{dayTasks.length - 2}
          </span>
        )}
      </div>
    </div>
  );
}

export default DayCell;
