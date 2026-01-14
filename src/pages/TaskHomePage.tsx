import CalendarTable from '../components/calendar/CalendarTable';
import TaskForm from '../components//features/TaskForm';
import { nanoid } from 'nanoid';
import { taskAtom, taskFormModalState, type Task } from '../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TaskCollectionSection from '../components/features/TaskCollectionSection';
import { useEffect, useState } from 'react';
import { getHolidays } from '../api/CalendarApi';
import { toast, Toaster } from 'react-hot-toast';

interface IHoliday {
  date: string;
  name: string;
}

// 컨테이너 컴포넌트 (핵심 기능 책임)
const TaskHomePage = () => {
  const [holidays, setHolidays] = useState<IHoliday[]>([]); //휴일 상태를 관리하기위한 state
  const setTasks = useSetRecoilState<Task[]>(taskAtom); //전체Task, recoil setter함수
  const { isFormOpen } = useRecoilValue(taskFormModalState); // isFormOpenState 값 읽기 함수
  //새 일정 저장 로직
  const addTask = (newTask: Omit<Task, 'id' | 'status'>) => {
    const taskToAdd: Task = {
      id: nanoid(),
      status: 'todo', // 새 Task는 기본적으로 todo상태
      ...newTask,
    };
    //Recoil 상태 업데이트 및 localStorage 자동 저장
    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
    //hot-toast사용
    toast.success('새 일정이 등록 되었습니다!🚀');
  };

  //휴일 추가를 위한 fetchData를 가져오는 로직
  useEffect(() => {
    const checkHoliday = async () => {
      const data = await getHolidays();
      console.log('가져온 공휴일', data);
      setHolidays(data);
    };
    checkHoliday();
  }, []);

  //retun, props전달 필요
  return (
    <div className="p-4  space-y-6">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <TaskCollectionSection />
      <CalendarTable holidays={holidays} />
      {isFormOpen && <TaskForm addTask={addTask} />}
    </div>
  );
};
export default TaskHomePage;
