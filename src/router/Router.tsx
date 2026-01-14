import { Route, Routes } from 'react-router-dom';
import TaskHomePage from '../pages/TaskHomePage';
import Layout from '../components/Layout';
import MainTaskListPage from '../pages/MainTaskListPage';
import ArchivedTaskListPage from '../pages/ArchivedTaskListPage';

function AppRouter() {
  //부모 경로와 동일한 URL렌디링 시 index 사용
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TaskHomePage />} />
        <Route path="/task-list" element={<MainTaskListPage />} />
        <Route path="/archive" element={<ArchivedTaskListPage />} />
        <Route
          path="*"
          element={
            <div className="w-full h-screen flex justify-center items-center text-5xl font-semibold">
              404 Page Not Found
            </div>
          }
        />
      </Route>
      ``
    </Routes>
  );
}

export default AppRouter;
