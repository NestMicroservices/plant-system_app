import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import SearchAppBar from './components/SearchAppBar';
import { Sidebar } from './components/sidebar/Sidebar';

export const DashLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    if (!isMobile) setIsOpenMenu(false);
  }, [isMobile]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        drawerWidth={240}
        open={isOpenMenu}
        isMobile={isMobile}
        handleCloseDrawer={() => setIsOpenMenu(false)}
      />

      <Box component='div' sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <SearchAppBar onMenuClick={() => setIsOpenMenu((prev) => !prev)} />
        <Box component='main' sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
