import { Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { taskFormModalState } from '../../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { unfinishedTaskCountSelector } from './selectors/unfinishedTaskConuntSelector';

function TaskCollectionSection() {
  const navigate = useNavigate();
  const setIsFormOpen = useSetRecoilState(taskFormModalState); // isFormOpenState, Recoil setter함수
  const unfinishedTask = useRecoilValue(unfinishedTaskCountSelector); //Selector를 이용해 taskFiltering

  const handleAddClick = () => {
    setIsFormOpen({
      isFormOpen: true,
      selectedDate: new Date(),
      editingTask: null, //수정 대상이 없음
    });
  };

  return (
    <div
      className={`mx-auto max-w-4xl p-4 flex justify-between  gap-4 rounded-md shadow-md 
        dark:shadow-xl bg-gray-50 dark:bg-gray-900  transition-colors duration-300`}
    >
      <div className={`flex items-center gap-2 `}>
        {unfinishedTask && <span className={`w-2 h-2 bg-red-600 rounded-full flex-shrink-0`} />}
        <button
          className={`p-1 rounded-md bg-gray-300 hover:shadow-md hover:scale-[1.05] cursor-pointer
             dark:bg-yellow-300 dark:text-gray-700 transition-all duration-200 ease-in-out`}
          onClick={() => navigate('/task-list')}
        >
          <Archive size={40} />
        </button>
        <div className={`flex flex-col`}>
          <span className={`text-base text-gray-500 whitespace-nowrap dark:text-gray-400`}>
            쌓아둔 할 일
          </span>
          <div className={`text-xl font-bold whitespace-nowrap text-gray-700 dark:text-gray-300`}>
            {unfinishedTask > 0 ? (
              <span>{`${unfinishedTask}개가 남아 있습니다.`}</span>
            ) : (
              <span>목록이 비었습니다.</span>
            )}
          </div>
        </div>
      </div>

      <button
        className={`
        p-2 bg-green-500 rounded-md dark:bg-yellow-300  hover:bg-green-300 
        dark:hover:bg-yellow-200  transition-colors duration-300`}
        onClick={handleAddClick}
      >
        <span className={`text-lg font-bold text-white leading-none dark:text-yellow-800`}>
          + 할 일 추가
        </span>
      </button>
    </div>
  );
}

export default TaskCollectionSection;
