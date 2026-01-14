import {
  eachDayOfInterval,
  endOfWeek,
  getDate,
  getDaysInMonth,
  startOfWeek,
  isSameMonth,
  subMonths,
  subWeeks,
  isSameWeek,
} from 'date-fns';
import { useMemo, useState } from 'react';

const CALENDAR_LENGTH = 35; // 7*5 배열의 달력
const DEFAULT_TRASH_VALUE = 0; //빈칸표시값 "0" -> 주간 표시 변경 시 특정주 사라지는 문제로 삭제
const DAY_OF_WEEK = 7;
const WEEK_STARTS_ON: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0; // 0=일요일, 계산기준
export const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토']; // 표시 기준

type viewType = 'monthly' | 'weekly';

function useCalendar() {
  const [viewType, setViewType] = useState<viewType>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date()); // 기준날짜
  const totalMonthDays = getDaysInMonth(currentDate); //date-fns 함수

  //1. 월간 로직(year,monthIdx,day)
  const firstDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const firstDay = firstDateOfMonth.getDay();
  //이전달 빈 칸 갯수(Default Trash Value로 채움)
  const prevDayList = Array.from({
    length: firstDay,
  }).map(() => DEFAULT_TRASH_VALUE);
  //이번달 날짜
  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => i + 1);
  //다음달 빈 칸 갯수(Default Trash Value로 채움)
  const nextDayList = Array.from({
    length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  // 1차원 -> 2차원(주 단위) 배열로 변환, 배열 요소를 갖는 배열 형태
  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);
  const weekCalendarList = currentCalendarList.reduce((acc: number[][], cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK); // 주차 계산
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []; //해당 주차 배열이 없으면 생성
    }
    acc[chunkIndex].push(cur); // 현재 날짜를 해당 주차 배열에 추가
    return acc;
  }, []);

  //2. 주간 로직
  const currentWeekList = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: WEEK_STARTS_ON });
    const end = endOfWeek(currentDate, { weekStartsOn: WEEK_STARTS_ON });
    const weekDates = eachDayOfInterval({ start, end });
    //다음달 포함 날짜까지 해당 주간에 표시
    const weekFormatted = weekDates.map((date) => {
      return getDate(date);
    });

    return [weekFormatted];
  }, [currentDate]);

  //주간 달,주 이동 함수
  const moveMonth = (amount: number) => {
    setCurrentDate(subMonths(currentDate, amount));
  };
  const moveWeek = (amount: number) => {
    setCurrentDate(subWeeks(currentDate, amount));
  };

  // 오늘 이동 함수
  const goToToday = () => {
    setCurrentDate(new Date()); // 현재 날짜와 시간으로 currentDate를 설정
  };
  const today = useMemo(() => new Date(), []); //절대 기준점
  const showTodayBtn = useMemo(() => {
    if (viewType === 'monthly') {
      return !isSameMonth(currentDate, today);
    } else {
      return !isSameWeek(currentDate, today, { weekStartsOn: WEEK_STARTS_ON });
    }
  }, [currentDate, viewType, today]);

  return {
    weekCalendarList: weekCalendarList,
    currentDate: currentDate,
    currentWeekList,
    viewType, //월간, 주간 상태 선택
    setViewType,
    moveMonth,
    moveWeek,
    goToToday,
    showTodayBtn,
  };
}

export default useCalendar;
