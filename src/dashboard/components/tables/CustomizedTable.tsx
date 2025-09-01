import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatCost } from '../../../utils/format-cost';
import { formatVolumeWithUnit } from '../../../utils/format-volume';
import { PlantClient } from '../../services/plant-client';
import { FormDialog } from '../form/FormDialog';

import type { IndirectCostRow } from '../../indirect-costs/useIndirectCosts';
import type { CostConfig } from '../../services/graphql/types/cost-config.interface';
import type { Operation } from '../../services/graphql/types/operation.interface';

interface Props {
  columns: number[];
  operations: Operation[];
  matrix: IndirectCostRow;
  onOperation?: (operation: Operation) => void;
}

export default function CustomizedTable({
  columns,
  operations,
  matrix,
}: Props) {
  const [plantOperations, setPlantOperations] =
    useState<Operation[]>(operations);
  const [selectOperation, setSelectOperation] = useState<Operation>();
  const [operationName, setOperationName] = useState<string>();
  const [selectCostConfig, setSelectCostConfig] = useState<CostConfig>();

  const handleUdateOperation = async (id: number, name: string) => {
    const result = await PlantClient.updateOperation(id, name);
    if (result?.id) {
      operations = operations.map((operation) => {
        if (operation.id === id) {
          return { ...operation, name };
        }
        return operation;
      });
      setPlantOperations(operations);
      setSelectOperation(undefined);
    }
  };

  const handleUdateCost = async (costConfig: CostConfig, cost: number) => {
    const { id, operationId, volume } = costConfig;
    const result = await PlantClient.updateCostConfig(id, cost);
    if (result?.id) {
      matrix[operationId][volume].costConfig.cost = cost;
      setSelectCostConfig(undefined);
    }
  };

  return (
    <Paper sx={{ width: '100%', maxWidth: '90vw', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' style={{ minWidth: 170 }}>
                Operación
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={`${column}`}
                  align='left'
                  style={{ minWidth: 100 }}
                >
                  {formatVolumeWithUnit(column)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {plantOperations.map((o) => (
              <TableRow key={o.id} hover role='checkbox' tabIndex={-1}>
                <TableCell
                  key={`${o.id}-${o.name}`}
                  align='left'
                  onDoubleClick={() => {
                    setSelectOperation(o);
                  }}
                >
                  {o.name}
                </TableCell>
                {columns.map((column) => {
                  const { costConfig } =
                    matrix[o.id] && matrix[o.id][column]
                      ? matrix[o.id][column]
                      : {};
                  return (
                    <TableCell
                      data-x={o.id}
                      data-y={o.name}
                      key={`${o.id}-${column}`}
                      align='left'
                      onDoubleClick={() => {
                        setOperationName(o.name);
                        setSelectCostConfig(costConfig);
                      }}
                    >
                      {costConfig ? formatCost(costConfig.cost) : ''}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectOperation?.id && (
        <FormDialog
          open
          label='Operación'
          name='name'
          defaultValue={selectOperation.name}
          title='Operación'
          handleClose={() => setSelectOperation(undefined)}
          handleSubmit={(value) =>
            handleUdateOperation(selectOperation.id, `${value}`)
          }
        />
      )}

      {selectCostConfig?.id && (
        <FormDialog
          open
          label='Costo'
          name='cost'
          defaultValue={selectCostConfig.cost}
          title={`${operationName} - ${formatVolumeWithUnit(
            selectCostConfig.volume
          )}`}
          handleClose={() => setSelectCostConfig(undefined)}
          handleSubmit={(value) =>
            handleUdateCost(selectCostConfig, Number(value))
          }
        />
      )}
    </Paper>
  );
}
