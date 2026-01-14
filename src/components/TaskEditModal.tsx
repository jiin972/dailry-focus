import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isEditingIdState, type Task } from '../atom';
import { taskToEditSelector } from './features/selectors/taskToEditSelector';
import useTaskUpdateTitle from './features/hooks/ useTaskUpdateTitle';
import useSetTaskDueDate from './features/hooks/useSetTaskDueDate';
import Portal from './portal/Portal';
import useTaskToggle from './features/hooks/useTaskToggle';
import { Calendar, Check, CheckCircle2, Circle, X } from 'lucide-react';
import TaskDatePicker from './calendar/TaskDatePicker';
import { useState } from 'react';
import useSetTaskMemo from './features/hooks/useSetTaskMemo';

function TaskEditModal() {
  const editingId = useRecoilValue(isEditingIdState); //모달열기 함수 "읽기"
  const taskToEdit = useRecoilValue(taskToEditSelector); //수정할 Task객체 "읽기"(selector)
  const setEditingId = useSetRecoilState(isEditingIdState); //모달 닫을 때, "쓰기" 함수
  //전체 임시수정을 위한 state, taskToEdit가 null 일수도 있으니, 빈 객체(양식)를 백업으로 둠
  const [tempTask, setTempTask] = useState<Task>(
    taskToEdit || {
      id: '',
      title: '',
      memo: '',
      isCompleted: false,
      date: null,
      isUndated: false,
      status: 'todo',
      isArchived: false,
    }
  );
  const [isCheck, setIsCheck] = useState(tempTask.isCompleted);
  const [showPicker, setShowPicker] = useState(false); // 데이터픽커를 띄우기위한 state
  const { taskUpdateTitle } = useTaskUpdateTitle(); // task update 훅
  const { handleSetDate } = useSetTaskDueDate(); //날짜 수정 훅
  const { toggleTaskCompleted } = useTaskToggle(); //item 완료 토글 훅
  const { handleSetMemo } = useSetTaskMemo(); //메모업데이트를 위한 훅

  //방어로직: 상태 불일치 확인 및 초기화
  //editingId는 존재하는데 (수정 모드 켜짐), taskToEdit 데이터는 없는 경우 (데이터 유실/삭제)
  //-> 이 경우 앱의 에러(크래시)를 막기 위해 수정 모드를 강제로 해제(null)하고 종료한다.
  if (!editingId || !taskToEdit) {
    if (editingId && !taskToEdit) setEditingId(null);
    // 초기화되었거나, 수정할 ID가 아예 없으면 (정상적인 종료)
    // -> 렌더링을 중단하고 Null 반환
    return null;
  }
  const handlePropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  //사용자에게 보여줄 날짜 포맷팅 (ko-KR)(date객체의 문자열(string) 변환)
  const displayDate = tempTask.date
    ? new Date(tempTask.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '일정이 없습니다.';

  //아이템의 일정(날짜) 변경
  const onSelectDate = (date: Date | null) => {
    setTempTask({ ...tempTask, date: date });
    setShowPicker(false);
  };

  //최종 승인을 위한 함수(변경사항 recoil반영)
  const handleConfirm = () => {
    if (!tempTask.id) return;
    //문자열로 저장된 날짜를 훅에 전달하기 위해 Date 객체로 역변환
    const rawDate = tempTask.date;
    const finalDate = rawDate ? new Date(rawDate) : null;
    taskUpdateTitle(tempTask.id, tempTask.title);
    handleSetDate(tempTask.id, finalDate); // finalDate변형값 반영
    toggleTaskCompleted(tempTask.id, tempTask.isCompleted || false); //undefined일 경우, 방어
    handleSetMemo(tempTask.id, tempTask.memo || ''); //undefined,null일 경우, 빈 문자열로 방어
    setEditingId(null);
  };
  //토글제어 함수(커스텀 버튼용)
  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const nextCheck = !isCheck; //즉각 UI에 반영
    setIsCheck(nextCheck);
    setTempTask({ ...tempTask, isCompleted: nextCheck });
  };

  return (
    <Portal>
      <div
        className="fixed inset-0  bg-black bg-opacity-60 flex items-center justify-center z-50"
        onClick={() => setEditingId(null)}
      >
        <div
          className="flex mx-auto max-w-2xl w-full  flex-col  items-start gap-2 bg-gray-100 p-6 dark:bg-gray-800
          rounded-md shadow-2xl"
          onClick={handlePropagation}
        >
          <div className="flex flex-col items-start gap-3 min-w-full p-3">
            <div className="flex items-center gap-3 border-b-2 p-2 w-full">
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

              <input
                className="flex-grow text-2xl font-semibold bg-transparent dark:text-gray-200"
                type="text"
                value={tempTask?.title}
                //event에서 새 값을 추출해 hook을 호출함
                onChange={(e) => setTempTask({ ...tempTask, title: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3 p-2 border-b-2 w-full">
              <button onClick={() => setShowPicker(true)}>
                <Calendar
                  className="text-green-600 dark:text-yellow-500
                hover:scale-110 transition-all duration-200 ease-in-out"
                  size={25}
                />
              </button>
              <span
                className={
                  tempTask.date
                    ? 'text-gray-900 text-md font-semibold dark:text-gray-200'
                    : 'text-gray-500'
                }
              >
                {displayDate}
              </span>
              {showPicker && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
                  <div className="absolute inset-0" onClick={() => setShowPicker(false)} />
                  <div
                    className="relative min-w-fit bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl shadow-2xl border dark:border-gray-700 
                    w-[350px] min-h-[400px] flex flex-col items-center justify-center 
                  "
                  >
                    <h3 className="text-xl font-bold mb-4 dark:text-gray-200">날짜 선택</h3>
                    <TaskDatePicker
                      currentDate={tempTask.date}
                      onDateChange={(date) => {
                        onSelectDate(date);
                        setShowPicker(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <textarea
            className="w-full max-h-full p-4 rounded-md bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            rows={5}
            value={tempTask.memo || ''}
            placeholder="잊지 말아야 할 것을 메모해 보세요."
            onChange={(e) => setTempTask({ ...tempTask, memo: e.target.value })}
          />
          <div className="min-w-full flex justify-center items-center gap-10">
            <button
              onClick={() => setEditingId(null)}
              className="font-semibold hover:scale-110  transition-all ease-in-out duration-200
              dark:text-gray-200 "
            >
              <X />
              <span>취소</span>
            </button>
            <button
              onClick={handleConfirm}
              className="font-semibold hover:text-green-600 hover:scale-110  transition-all ease-in-out duration-200
              dark:text-gray-200 dark:hover:text-yellow-500"
            >
              <Check />
              <span>완료</span>
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default TaskEditModal;
