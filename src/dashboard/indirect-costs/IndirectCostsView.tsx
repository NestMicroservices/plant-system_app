import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress, Fab } from '@mui/material';
import { FormDialog } from '../components/form/FormDialog';
import CustomizedTable from '../components/tables/CustomizedTable';
import { PlantClient } from '../services/plant-client';
import { useIndirectCost } from './useIndirectCosts';

export const IndirectCostsView = () => {
  const [showForm, setShowForm] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { columns, operations, matrix, plant, isLoading } = useIndirectCost();

  const handleCreateOperation = async (name: string) => {
    try {
      if (plant?.id === undefined) return;
      setIsPending(true);
      const newOperation = await PlantClient.createOperation(plant.id, name);

      if (newOperation?.id !== undefined) {
        await Promise.all(
          plant.volumes?.map((volume) =>
            PlantClient.createCostConfig(newOperation.id, volume, 0)
          ) ?? []
        );
        // TODO: Temporary solution, reloads the page to show updated data. Replace with reactive logic.
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      setShowForm(false);
    }
  };

  if (isLoading || isPending)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size='2rem' />
      </Box>
    );

  return (
    <Box>
      <CustomizedTable
        columns={columns}
        operations={operations}
        matrix={matrix}
      />

      <FormDialog
        open={showForm}
        label='Operación'
        name='name'
        title='Nueva Operación'
        handleClose={() => setShowForm(false)}
        handleSubmit={(value) => handleCreateOperation(`${value}`)}
      />

      <Fab
        color='primary'
        aria-label='add'
        disabled={showForm}
        sx={{
          position: 'fixed',
          bottom: { xs: 20, md: 40 },
          right: { xs: 20, md: 40 },
        }}
        onClick={() => setShowForm(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
