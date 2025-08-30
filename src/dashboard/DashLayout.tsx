import { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';

import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';

import { SelectPlant } from './components/form/SelectPlant';
import SearchAppBar from './components/SearchAppBar';
import { Sidebar } from './components/sidebar/Sidebar';
import type { Plant } from './services/graphql/types/plant.inteface';
import { PlantClient } from './services/plant-client';

export const DashLayout = () => {
  const { plantId } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
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

  if (loading)
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
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        plantId={plantId}
        drawerWidth={240}
        open={isOpenMenu}
        isMobile={isMobile}
        handleCloseDrawer={() => setIsOpenMenu(false)}
        selectChildren={<SelectPlant plants={plants} />}
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
