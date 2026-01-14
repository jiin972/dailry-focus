import { format } from 'date-fns';
import useCalendar, { DAY_LIST } from '../features/hooks/useCalendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DayCell from './DayCell';

interface IHoliday {
  date: string;
  name: string;
}

interface ITaskHomePageProps {
  holidays: IHoliday[];
}
const dayList = DAY_LIST; // 월~금요일(표시기준)

function CalendarTable({ holidays }: ITaskHomePageProps) {
  const {
    weekCalendarList,
    currentDate,
    currentWeekList,
    viewType,
    setViewType,
    moveMonth,
    moveWeek,
    goToToday,
    showTodayBtn,
  } = useCalendar();

  // Cell에 표시할 Tasks호출

  //주,월 데이터  선택
  const dataToRender = viewType === 'monthly' ? weekCalendarList : currentWeekList;

  //주, 월에 따른 달,주 단위 이동(양수/이전, 음수/다음,moveMonth,moveWeek속성)
  const handlePrevClick = () => {
    if (viewType === 'monthly') {
      moveMonth(1);
    } else {
      moveWeek(1);
    }
  };
  const handleNextClick = () => {
    if (viewType === 'monthly') {
      moveMonth(-1);
    } else {
      moveWeek(-1);
    }
  };

  //버튼 활성화 클래스 정의
  const activeBtnClasses = ` bg-gray-50 p-1 px-2 rounded-md  shadow-md  dark:text-yellow-800 dark:bg-yellow-400`;
  const inactiveBtnClasses = ` text-gray-400 dark:text-yellow-600/80`;

  return (
    <div className="mx-auto max-w-4xl bg-gray-50 p-5 shadow-lg rounded-lg dark:bg-gray-900  dark:shadow-2xl">
      <div className="flex">
        <div className="flex  w-fit p-1 px-4 gap-8 mb-4 bg-gray-200 text-lg font-semibold rounded-md dark:bg-yellow-200/90">
          <button
            onClick={() => setViewType('weekly')}
            className={viewType === 'weekly' ? activeBtnClasses : inactiveBtnClasses}
          >
            주간
          </button>
          <button
            onClick={() => setViewType('monthly')}
            className={viewType === 'monthly' ? activeBtnClasses : inactiveBtnClasses}
          >
            월간
          </button>
        </div>
      </div>
      <div className="flex justify-between mb-5 items-center gap-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-center  dark:text-gray-300">
            {format(currentDate, 'M월')}
          </h2>
          {
            // "오늘"버튼 토글
            showTodayBtn && (
              <button
                onClick={goToToday}
                className="p-2 ml-4 text-sm font-semibold bg-green-200 rounded-md shadow-md text-green-700 hover:bg-emerald-500 hover:text-black
            transition-colors duration-500"
              >
                <span>오늘</span>
              </button>
            )
          }
        </div>
        <div className="flex justify-center items-center gap-2 pr-4">
          <button onClick={handlePrevClick} className="h-8  p-2 flex justify-center items-center border">
            <ChevronLeft />
          </button>

          <button onClick={handleNextClick} className="h-8  p-2 flex justify-center items-center border">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center font-medium border-b border-gray-200  dark:text-gray-300">
        {dayList.map((day, idx) => (
          <div
            key={idx}
            className={`p-2 text-sm
          ${idx === 0 ? `text-red-500` : idx === 6 ? `text-blue-500` : `dark:text-gray-300`}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-1 transition-all duration-1000 ">
        {dataToRender.map((week, weekIdx) => (
          <div
            key={weekIdx}
            className={`grid grid-cols-7  
            ${dataToRender.length === 1 && viewType === 'monthly' ? `opacity-0` : `opacity-100`}
          `}
          >
            {week.map((day, dayIdx) => {
              if (!day || day === 0) return <div key={dayIdx} />;
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 1).padStart(2, '0');
              const date = String(day).padStart(2, '0');
              const dateKey = `${year}-${month}-${date}`;
              const targetHoliday = holidays.find((h) => h.date === dateKey);

              return (
                <DayCell
                  key={dayIdx}
                  day={day}
                  dayIdx={dayIdx}
                  currentDate={currentDate}
                  holiday={targetHoliday}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarTable;
