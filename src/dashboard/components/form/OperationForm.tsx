import type { FC } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { Operation } from '../../services/graphql/types/operation.interface';
import { formatVolumeWithUnit } from '../../../utils/format-volume';
import type { IndirectCostRow } from '../../indirect-costs/useIndirectCosts';
import { Button } from '@mui/material';

interface Props {
  volumes: number[];
  operation?: Operation;
  matrix?: IndirectCostRow;
  handleClose?: () => void;
  handleSubmit?: (value: string | number) => void;
}

export const OperationForm: FC<Props> = ({
  volumes,
  operation,
  matrix,
  handleClose,
}) => {
  const indirectCostColumn = matrix && operation ? matrix[operation?.id] : null;

  return (
    <Box
      component='form'
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, padding: 4 }}
      noValidate
      autoComplete='off'
    >
      <TextField
        required
        id='outlined-required'
        label='Operación'
        defaultValue='Hello World'
      />
      <div>
        {volumes.map((v) => (
          <TextField
            key={v}
            id='outlined-required'
            label={formatVolumeWithUnit(v)}
            defaultValue={
              indirectCostColumn ? indirectCostColumn[v].costConfig.cost : 0
            }
            type='number'
          />
        ))}
      </div>
      <div>
        {' '}
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type='submit' form='edit-form'>
          Actualizar
        </Button>
      </div>
    </Box>
  );
};
