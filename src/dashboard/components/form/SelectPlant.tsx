import { useState, type FC } from 'react';
import { useNavigate } from 'react-router';

import type { SelectChangeEvent } from '@mui/material';
import { usePlantRoute } from '../../../hooks/usePlantRoute';
import type { Plant } from '../../services/graphql/types/plant.inteface';
import SelectAutoWidth from './SelectAutoWidth';

interface Props {
  plants: Plant[];
}

export const SelectPlant: FC<Props> = ({ plants }) => {
  const items = plants.map((p) => ({ value: p.id, name: p.name }));
  const { plantId, activeRoute } = usePlantRoute();

  const [value, setValue] = useState(plantId);
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedPlantId = event.target.value;
    setValue(selectedPlantId);
    navigate(`/${selectedPlantId}/${activeRoute}`, { viewTransition: true });
  };

  return (
    <SelectAutoWidth
      name='plant'
      label='Planta'
      items={items}
      sx={{ display: 'flex', width: '100%', p: '05.rem' }}
      size='small'
      value={value}
      handleChange={handleChange}
    />
  );
};
