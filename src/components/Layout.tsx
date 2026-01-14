import { Outlet } from 'react-router-dom';
import Header from './common/Header';

function Layout() {
  return (
    <div
      className="min-h-screen max-w-full mx-auto bg-gray-200 dark:bg-gray-800
     dark:text-gray-300 transition-all duration-800 ease-in-out"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
