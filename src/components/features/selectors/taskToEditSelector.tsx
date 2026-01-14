import { selector } from 'recoil';
import { isEditingIdState, taskAtom } from '../../../atom';

export const taskToEditSelector = selector({
  key: ' taskToEditSelector',
  get: ({ get }) => {
    //현재 수정 중인 ID를 읽음
    const editingId = get(isEditingIdState);
    //ID가 없다면 탐색 종료
    if (editingId === null) {
      return undefined;
    }
    //필터링 되지 않은 원복을 읽어 task를 찾음
    const taskList = get(taskAtom);
    return taskList.find((task) => task.id === editingId);
  },
});
