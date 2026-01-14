import { useSetRecoilState } from 'recoil';
import { taskAtom } from '../../../atom';

function useSetTaskDueDate() {
  const setTasks = useSetRecoilState(taskAtom);
  const handleSetDate = (taskId: string | number, newDate: Date | null) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        //불변성 유지하며 두 속성을 동시에 업데이트
        if (taskId === task.id) {
          return {
            ...task,
            date: newDate, //선택된 날짜로 업데이트

            isUndated: newDate === null, // newDate가 null이면, isUndated, falsy면 newDate
          };
        }
        return task;
      });
    });
  };
  return { handleSetDate };
}

export default useSetTaskDueDate;
