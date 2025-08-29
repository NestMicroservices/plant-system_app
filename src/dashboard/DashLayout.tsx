import { Outlet } from 'react-router';

import SearchAppBar from './components/SearchAppBar';

export const DashLayout = () => {
  return (
    <>
      <SearchAppBar />
      <Outlet />
    </>
  );
};
