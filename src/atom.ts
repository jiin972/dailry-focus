import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'; // localStorage저장

export type StatusType = 'todo' | 'done';

//기본 data type
export interface Task {
  id: string | number; //nanoId
  title: string;
  memo?: string | null;
  //일정관련
  isUndated: boolean;
  date?: string | Date | null;

  //상태관리
  status: StatusType;
  isCompleted?: boolean;
  isArchived: boolean;
  doneAt?: number; // 완료시점의 타임스탬프
}

//내용 수정 및 모달open 상태를 위한 atom
export const isEditingIdState = atom<string | number | null>({
  key: `isEditingIdState`,
  default: null,
});

// recoil persist를 이용한 localStorage저장
const { persistAtom } = recoilPersist({
  key: 'task-storage',
});

export const taskAtom = atom<Task[]>({
  key: 'tasksState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// // 입력창 상태
// export const isFormOpenState = atom({
//   key: 'isFormOpenState',
//   default: false, // 초기값: form닫힘
// });

//Task List 타입정의(selector())

export type FilterType = 'active' | 'dated' | 'done' | 'archived';

export const filterTabAtom = atom<FilterType>({
  key: 'filterTabAtom',
  default: 'active',
});

//CalendarTable에서 일정추가를 위한 Atom
export const taskFormModalState = atom({
  key: 'taskModalState',
  default: {
    isFormOpen: false,
    selectedDate: new Date(), //클릭한 날짜를 form에 전달하기 위함
    editingTask: null, //수정 task저장
  },
});
