import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import TaskFilterTab from '../components/features/TaskFilterTab';
import TaskListItem from '../components/features/TaskListItem';
import { filterdTaskListSelector } from '../components/features/selectors/filterdTaskListSelector';
import TaskEditModal from '../components/TaskEditModal';
import { isEditingIdState } from '../atom';

function MainTaskListPage() {
  const navigate = useNavigate();
  const taskList = useRecoilValue(filterdTaskListSelector); // selector를 이용해 Task List필터링
  const editingTaskId = useRecoilValue(isEditingIdState); //Id의 atom값을 읽어옴

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center w-full">
        <button className="flex-shrink-0" onClick={() => navigate('/')}>
          <ChevronLeft size={40} />
        </button>
        <div className="flex-grow flex justify-center text-2xl font-bold">
          <span>쌓아둔 할 일</span>
        </div>
        <div className="flex-shrink-0 w-[40px] h-[40px]" /> {/*중앙정렬을 위한 가상의 자식*/}
      </div>
      <TaskFilterTab />
      <ul className="flex flex-col items-start text-lg font-normal">
        {taskList.length > 0 ? (
          taskList.map((task) => <TaskListItem key={task.id} task={task} />)
        ) : (
          <p className="text-gray-500 text-center w-full mt-10 text-2xl">목록이 비어있습니다.</p>
        )}
      </ul>
      {editingTaskId && <TaskEditModal />}
    </div>
  );
}
export default MainTaskListPage;
