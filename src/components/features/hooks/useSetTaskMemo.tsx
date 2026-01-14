import { useSetRecoilState } from 'recoil';
import { taskAtom, type Task } from '../../../atom';

function useSetTaskMemo() {
  const setTasks = useSetRecoilState(taskAtom);
  const handleSetMemo = (taskId: string | number, newMemo: string | null) => {
    setTasks((prevTasks: Task[]) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            memo: newMemo,
          };
        }
        return task;
      });
    });
  };
  return { handleSetMemo };
}

export default useSetTaskMemo;
