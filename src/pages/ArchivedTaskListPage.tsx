import { useRecoilValue } from 'recoil';
import { taskAtom } from '../atom';
import TaskListItem from '../components/features/TaskListItem';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';

function ArchivedTaskListPage() {
  const allTasks = useRecoilValue(taskAtom);
  const navigate = useNavigate();

  const archivedTasks = allTasks.filter((task) => task.isArchived === true); //필터링 결과를 변수에 직접할당

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center w-full">
        <button className="flex-shrink-0" onClick={() => navigate('/task-list')}>
          <ChevronLeftIcon size={40} />
        </button>
        <div className="flex-grow flex justify-center text-2xl font-semibold">
          <span>보관함</span>
        </div>
        <div className="flex-shrink-0 w-[40px] h-[40px]" /> {/*중앙정렬을 위한 가상의 자식*/}
      </div>
      <ul className="flex flex-col items-start text-lg font-normal">
        {archivedTasks.length > 0 ? (
          archivedTasks.map((task) => <TaskListItem key={task.id} task={task} />)
        ) : (
          <p className="text-gray-500 text-center w-full mt-10 text-2xl">보관함이 비었습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default ArchivedTaskListPage;
