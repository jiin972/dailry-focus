import { useSetRecoilState } from 'recoil';
import { taskAtom, type Task } from '../../../atom';

function useTaskToggle() {
  const setTasks = useSetRecoilState<Task[]>(taskAtom); //taskAtom Setter 함수
  const toggleTaskCompleted = (taskId: string | number, completed: boolean) => {
    setTasks((oldTasks) =>
      oldTasks.map((task) => (task.id === taskId ? { ...task, isCompleted: completed } : (task as Task)))
    );
  };

  return { toggleTaskCompleted };
}

export default useTaskToggle;
