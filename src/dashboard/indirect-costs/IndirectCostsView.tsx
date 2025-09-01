import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress, Fab } from '@mui/material';
import { OperationForm } from '../components/form/OperationForm';
import CustomizedTable from '../components/tables/CustomizedTable';
import type { Operation } from '../services/graphql/types/operation.interface';
import { useIndirectCost } from './useIndirectCosts';

export const IndirectCostsView = () => {
  const { columns, operations, matrix, isLoading } = useIndirectCost();
  const [showForm, setShowForm] = useState(false);
  const [editOperation, setEditOperation] = useState<Operation>();

  if (isLoading)
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
        onOperation={setEditOperation}
      />

      {editOperation && (
        <OperationForm
          volumes={columns}
          operation={editOperation}
          matrix={matrix}
        />
      )}

      <Fab
        color='primary'
        aria-label='add'
        sx={{
          position: 'fixed',
          bottom: { xs: 20, md: 40 },
          right: { xs: 20, md: 40 },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
