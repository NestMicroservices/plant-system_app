import { Box, CircularProgress } from '@mui/material';
import CustomizedTable from '../components/tables/CustomizedTable';
import { useIndirectCost } from './useIndirectCosts';

export const IndirectCostsView = () => {
  const { columns, operations, matrix, isLoading } = useIndirectCost();

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
      />
    </Box>
  );
};
