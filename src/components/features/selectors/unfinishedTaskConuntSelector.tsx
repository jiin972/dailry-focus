import { selector } from 'recoil';
import { taskAtom } from '../../../atom';

// 미정/예정Tasks의 length를 구하는 selector(반드시 NumberType 반환)
export const unfinishedTaskCountSelector = selector<number>({
  key: 'unfinishedTaskCount',
  get: ({ get }) => {
    const allTasks = get(taskAtom);
    const unfinishedTask = allTasks.filter((task) => !task.isCompleted && !task.isArchived);
    return unfinishedTask.length; // NumberType을 반환(배열반환X)
  },
});
