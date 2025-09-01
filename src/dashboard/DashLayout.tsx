import { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';

import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';

import { SelectPlant } from './components/form/SelectPlant';
import SearchAppBar from './components/SearchAppBar';
import { Sidebar } from './components/sidebar/Sidebar';
import type { Plant } from './services/graphql/types/plant.inteface';
import { PlantClient } from './services/plant-client';

const drawerWidth = 240;

export const DashLayout = () => {
  const { plantId } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [plants, setPlants] = useState<Plant[]>([]);
  const isValidPlatId = plants.some((p) => p.id === Number(plantId));

  useEffect(() => {
    setLoading(true);
    PlantClient.fetchPlants().then((result) => {
      setPlants(result);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isMobile) setIsOpenMenu(false);
  }, [isMobile]);

  // if (!isValidPlatId) return <Navigate to={'/404'} />;

  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100dvh',
          width: '100dvw',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size='2rem' />
      </Box>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100dvh',
        position: 'relative',
      }}
    >
      <Sidebar
        plantId={plantId}
        drawerWidth={drawerWidth}
        open={isOpenMenu}
        isMobile={isMobile}
        handleCloseDrawer={() => setIsOpenMenu(false)}
        selectChildren={<SelectPlant plants={plants} />}
      />

      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          bgcolor: 'background.default',
          maxWidth: {sx:'100vw', md: `calc(100vw - ${drawerWidth}px)` },
        }}
      >
        <SearchAppBar onMenuClick={() => setIsOpenMenu((prev) => !prev)} />
        <Box component='main' sx={{ p: 3, flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
