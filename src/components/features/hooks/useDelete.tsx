import { useSetRecoilState } from 'recoil';
import { taskAtom, type Task } from '../../../atom';

function useDeleteTask() {
  const setTasks = useSetRecoilState<Task[]>(taskAtom);
  const deleteTask = (taskId: string | number) => {
    setTasks((prevTasks) => {
      //filter 결과를 즉시 return-> recoil이 update됨
      return prevTasks.filter((task) => {
        return task.id !== taskId; //조건 자체만 반환
      });
    });
  };
  return { deleteTask };
}

export default useDeleteTask;
