import { useNavigate } from 'react-router-dom';
import { filterTabAtom, type FilterType } from '../../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface FilterBtn {
  type: FilterType;
  label: string;
}

const filterBtns: FilterBtn[] = [
  { type: 'active', label: '미정' },
  { type: 'dated', label: '일정' },
  { type: 'done', label: '완료' },
  { type: 'archived', label: '보관함' },
];

function TaskFilterTabs() {
  const activeFilter = useRecoilValue(filterTabAtom); //현재의 recoil값을 읽어와 UI활성상태 표시
  const setFilterTab = useSetRecoilState(filterTabAtom); //Recoil 상태를 업데이트할 setter함수
  const navigate = useNavigate();
  //Recoil상태 변경
  const handleFilterClick = (filterValue: FilterType) => {
    if (filterValue === 'archived') {
      navigate('/archive');
      return;
    } else {
      setFilterTab(filterValue); //탭 활성상태 변경->recoil 상태만 업데이트
    }
  };
  //Btn스타일 클래스 정의
  const baseBtnClasses = `px-4 py-2 rounded-md text-xl font-semibold`;
  const activeBtnClasses = `text-white bg-green-500 shadow-md dark:text-yellow-800 dark:bg-yellow-300 `;
  const inActiveBtnClasses = `text-gray-600 dark:text-yellow-700/70 hover:bg-gray-100 dark:hover:bg-yellow-300`;

  return (
    <div
      className="w-full flex justify-between items-center rounded-md p-4
      bg-gray-100 dark:bg-gray-900"
    >
      {filterBtns.map(({ type, label }) => {
        const currentClasses = `${baseBtnClasses} ${
          activeFilter === type ? activeBtnClasses : inActiveBtnClasses
        }`;
        return (
          <button key={type} className={currentClasses} onClick={() => handleFilterClick(type)}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default TaskFilterTabs;
