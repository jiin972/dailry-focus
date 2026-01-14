import { selector } from 'recoil';
import { filterTabAtom, taskAtom, type Task } from '../../../atom';

//목록을 보여주기 위한 계산도구
//최상단에서 바로 export!
export const filterdTaskListSelector = selector<Task[]>({
  key: 'filteredTaskList',
  get: ({ get }) => {
    const allTasks = get(taskAtom); //원본목록
    const nonArchivedTasks = allTasks.filter((task) => !task.isArchived);
    const filter = get(filterTabAtom); //활성탭 상태

    switch (filter) {
      case 'active':
        return nonArchivedTasks.filter((task) => task.isUndated === true && !task.isCompleted);
      case 'dated':
        return nonArchivedTasks.filter((task) => task.isUndated === false && !task.isCompleted);
      case 'done':
        return nonArchivedTasks.filter((task) => task.isCompleted);
      default:
        return nonArchivedTasks.filter((task) => !task.isCompleted);
    }
  },
});
