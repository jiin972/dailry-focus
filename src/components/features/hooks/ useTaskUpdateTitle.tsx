import { useSetRecoilState } from 'recoil';
import { taskAtom, type Task } from '../../../atom';

function useTaskUpdateTitle() {
  const setTasks = useSetRecoilState<Task[]>(taskAtom);
  const taskUpdateTitle = (taskId: string | number, newTitle: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: newTitle };
        }
        return task; //조건이 false일때 종료
      });
    });
  };
  return { taskUpdateTitle }; //커스텀훅 디자인 패턴(구조분해 할당, 확장용이)
}

export default useTaskUpdateTitle;
