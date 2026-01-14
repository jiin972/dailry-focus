import { selectorFamily } from 'recoil';
import { taskAtom } from '../../../atom';

//특정 날짜에 해당하는 일정만 골라내는 셀렉터
//- 인자(targetDate) : "2025-12-26" 형태의 문자열
export const taskByDateSelector = selectorFamily({
  key: 'taskByDateSelector',
  get:
    (targetDate) =>
    ({ get }) => {
      const allTasks = get(taskAtom);
      //전체 일정 중 날짜가 일치하는 것만 필터링
      return allTasks.filter((task) => {
        if (!task.date) return false;
        //task.date를 "yyyy-MM-dd"형태로 변환
        const taskDateKey = new Date(task.date).toISOString().split('T')[0];
        return taskDateKey === targetDate;
      });
    },
});
