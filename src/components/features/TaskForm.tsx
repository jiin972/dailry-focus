import { taskFormModalState, type Task } from '../../atom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Portal from '../portal/Portal';
import TaskDatePicker from '../calendar/TaskDatePicker';
import { format } from 'date-fns';

interface TaskFormProps {
  addTask: (newTask: Omit<Task, 'id' | 'status'>) => void;
}

type FormInputs = Omit<Task, 'id' | 'status' | 'isUndated' | 'doneAt'>;

type NewTaskInput = Omit<Task, 'id' | 'status'>;

function TaskForm({
  // TaskHomePage에서 전달받는 콜백 함수.
  // 새 Task의 ID와 Status가 자동 부여되도록 Omit된 타입을 사용함.
  addTask,
}: TaskFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm<FormInputs>();
  const setIsFormOpen = useSetRecoilState(taskFormModalState); //값쓰기,(폼닫기) Setter함수
  const { selectedDate } = useRecoilValue(taskFormModalState); //값읽기, getter함수
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 성공 여부를 관리 할 state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // react-hook-form에서 제공하는 타입 규격.
  // <FormInputs>를 통해 'data' 인수의 타입을 명확히 강제함 (타입 안전성 확보).
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (data.title.trim() === '') return;
    const isUndated = !data.date; //data.date유무에 따라 isUndated 플래그 결정
    const newTask: NewTaskInput = {
      title: data.title.trim(),
      isUndated: isUndated,
      date: data.date || undefined,
      memo: data.memo || undefined,
      isArchived: data.isArchived ?? false,
    };
    addTask(newTask);
    setIsSubmitted(true);
    reset();
    setTimeout(() => {
      handleClose();
    }, 700);
  };
  //ESC 키 이벤트
  const handleClose = useCallback(() => {
    setIsFormOpen((prev) => ({
      ...prev,
      isFormOpen: false,
      editingTask: null,
    }));
  }, [setIsFormOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape); //문서 전체에 이벤터리스너 등록(글로벌 등록)

    //clean-up함수(컴포넌트 소멸시 리스너 제거)
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClose]);

  //DayCell선택시 날짜를 자동입력하기위한 변환
  useEffect(() => {
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      const dateString = selectedDate.toLocaleDateString('en-CA');
      setValue('date', dateString);
    }
  }, [selectedDate, setValue]);

  //입력 이후 문구 초기화
  useEffect(() => {
    let timer: number;
    if (isSubmitted) {
      timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 1000);
    }
    return () => clearTimeout(timer); //클린업함수
  }, [isSubmitted]); //isSubmitted 상태에 변화

  return (
    <Portal>
      <div
        onClick={() =>
          setIsFormOpen((prev) => ({
            ...prev,
            isFormOpen: false,
            selectedDate: new Date(),
            editingTask: null,
          }))
        }
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md p-4 flex justify-start  gap-5 rounded-xl shadow-2xl 
     bg-gray-50 dark:bg-gray-900  transition-all duration-300 scale-100"
        >
          {isSubmitted && (
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-md flex items-center justify-center ">
              <p className="text-xl">일정이 추가 되었습니다.👏</p>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 gap-2 ">
            <input
              type="text"
              placeholder="새 할 일 입력"
              className="flex-1 p-2 bg-transparent border-b-2 dark:text-gray-50"
              {...register('title', { required: true })}
            />
            <input
              type="date"
              className="flex-1 p-2 bg-transparent border-b-2 dark:text-gray-50 dark:[color-scheme:dark]" //테마 적용이 안되 브라우저 기본 테마 적용(아이콘만)
              {...register('date', {
                validate: (value) => {
                  if (!value) {
                    return true; // undefinde,null, 빈문자열 true(반환,통과)
                  }
                  return true; // value가 있으면 true(통과, 반환)
                },
              })}
            />
            <input
              type="text"
              placeholder="메모가 있으신가요?"
              className="flex-1 p-2 h-auto bg-transparent"
              {...register('memo')}
            />
            {isDatePickerOpen && (
              <Portal>
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30">
                  <div className="absolute inset-0" onClick={() => setIsDatePickerOpen(false)} />
                  <div
                    className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border dark:border-gray-700 
             w-[90%] max-w-[400px] overflow-hidden"
                    onClick={(e) => e.stopPropagation()} // 🌟 달력 클릭 시 배경 이벤트 전파 방지
                  >
                    <TaskDatePicker
                      currentDate={new Date()}
                      onDateChange={(date: Date | null) => {
                        if (!date) return;
                        setValue('date', format(date, 'yyyy-MM-dd'));
                        setIsDatePickerOpen(false);
                      }}
                    />
                  </div>
                </div>
              </Portal>
            )}

            <div className={`mx-auto min-w-full p-1 flex items-center gap-2`}>
              <button
                type="submit"
                className={`p-2 flex-grow bg-green-500 rounded-md
         dark:bg-yellow-300  hover:bg-green-400 dark:hover:bg-yellow-500  
         transition-colors duration-300`}
              >
                <span className={`text-xl font-bold text-white leading-none dark:text-yellow-800 `}>
                  추가
                </span>
              </button>
              <button
                type="submit"
                className={`p-2  bg-indigo-500 rounded-md
         dark:bg-yellow-300  hover:bg-indigo-400 dark:hover:bg-yellow-500  
         transition-colors duration-300`}
                onClick={handleClose}
              >
                <span className={`text-xl font-bold text-white leading-none dark:text-yellow-800 `}>
                  취소
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}

export default TaskForm;
