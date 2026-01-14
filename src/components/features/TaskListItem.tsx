import { Archive, CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';
import { isEditingIdState, type Task } from '../../atom';
import useTaskToggle from '../features/hooks/useTaskToggle';
import useDeleteTask from '../features/hooks/useDelete';
import useArchiveTask from './hooks/useArchiveTask';
import { useSetRecoilState } from 'recoil';
import ToolTipItem from '../ui/ToolTipItem';
import IconBtnItem from '../ui/IconBtnItem';
import { useMatch } from 'react-router-dom';
import type React from 'react';
import { useState } from 'react';

interface TaskListItemProps {
  task: Task; // 1개의 객체를 받음
}

//item 수정,삭제,업데이트 컴포넌트(Task와 관련된 customHook을 처리하는 액션허브역할)
function TaskListItem({ task }: TaskListItemProps) {
  const { toggleTaskCompleted } = useTaskToggle(); //완료여부 커스텀훅
  const { deleteTask } = useDeleteTask(); // 삭제 커스텀훅
  const { handleArchiveTask } = useArchiveTask(); // 아카이브 이동 커스텀훅
  const setEditingTaskId = useSetRecoilState(isEditingIdState); //Recoil쓰기 함수
  const [isCheck, setIsCheck] = useState(task.isCompleted); // 버튼 상태 바꾸기
  const displayDate = task.date
    ? new Date(task.date).toLocaleDateString('kr-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '확인된 정보가 없습니다.';
  //수정버튼 노출여부를 결정하는 조건 정의
  const isArchivePage = useMatch('/archive');
  const isReadOnly = isArchivePage || task.isCompleted;
  const isDone = task.isCompleted;
  //완료 후 리스트 카테고리 이동 지연
  const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsCheck(!isCheck); //결과 반전을 위해 !(논리부정연산자)사용
    setTimeout(() => {
      toggleTaskCompleted(task.id, !task.isCompleted);
    }, 500);
  };
  return (
    <div className=" w-full flex items-center justify-between gap-3 p-3">
      <div className="group relative flex items-center justify-between gap-3">
        {/*버튼 커스터 마이징*/}
        <div
          className="w-[25px] min-w-[25px] transition-all duration-200 active:scale-90 cursor-pointer"
          onClick={handleToggle}
        >
          {isCheck ? (
            <CheckCircle2
              className="
            text-green-600 fill-green-100
            dark:text-yellow-500 dark:fill-yellow-100"
              size={25}
            />
          ) : (
            <Circle className="text-gray-400 " />
          )}
        </div>

        <p
          className={`text-xl flex-grow 
  ${
    task.isCompleted
      ? 'line-through text-gray-500 dark:text-gray-600'
      : 'text-gray-900 dark:text-gray-200'
  }`}
        >
          {task.title}
        </p>
        {!isReadOnly && <IconBtnItem icon={Pencil} onClick={() => setEditingTaskId(task.id)} />}
        {/*리스트hover시 보여줄 부분*/}
        <div
          className="
        absolute  z-50 left-[100%] top-0 pl-3
        w-max max-w-[250px] invisible opacity-0 translate-x-[-10px] 
        transition-all duration-300 ease-in-out
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none "
        >
          <div
            className="bg-green-600 rounded-lg shadow-2xl border border-green-700 p-4
          flex flex-col gap-2
          dark:bg-yellow-300 
          "
          >
            <ToolTipItem label="할 일" value={task.title} />
            <div className="my-2 border-t border-gray-50" /> {/* 구분선 추가 */}
            <ToolTipItem label="일정" value={displayDate} />
            <div className="my-2 border-t border-gray-50" /> {/* 구분선 추가 */}
            <ToolTipItem label="메모" value={task.memo ? task.memo : '확인된 정보가 없습니다.'} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <IconBtnItem
          icon={Trash2}
          onClick={() => {
            if (window.confirm('선택한 목록을 삭제하시겠습니까?')) {
              deleteTask(task.id);
            }
          }}
        />
        {isDone && !isArchivePage && (
          <IconBtnItem
            icon={Archive}
            onClick={() => {
              if (window.confirm('선택한 목록을 보관함으로 이동하겠습니까?')) {
                handleArchiveTask(task.id);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TaskListItem;
