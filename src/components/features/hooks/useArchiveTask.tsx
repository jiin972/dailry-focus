import { useSetRecoilState } from 'recoil';
import { taskAtom, type Task } from '../../../atom';

function useArchiveTask() {
  const setTasks = useSetRecoilState<Task[]>(taskAtom);
  const handleArchiveTask = (taskId: string | number) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        //map을통해 새 배열 생성,
        if (task.id === taskId) {
          // 개별 task를 복사해 해당 속성만 변경
          //!task.isArchived로 토글구현
          return { ...task, isArchived: !task.isArchived };
        }
        return task; //id가 일치하지 않으면 원래 task 객체 그대로 반환
      });
    });
  };

  return { handleArchiveTask };
}

export default useArchiveTask;
