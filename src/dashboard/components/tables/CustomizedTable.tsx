import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { IndirectCostRow } from '../../indirect-costs/useIndirectCosts';
import type { Operation } from '../../services/graphql/types/operation.interface';

interface Props {
  columns: number[];
  operations: Operation[];
  matrix: IndirectCostRow;
}

export default function CustomizedTable({
  columns,
  operations,
  matrix,
}: Props) {
  console.log(matrix);
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
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {operations.map((o) => (
              <TableRow key={o.id} hover role='checkbox' tabIndex={-1}>
                <TableCell
                  key={`${o.id}-${o.name}`}
                  align='left'
                  onDoubleClick={() =>
                    console.log({
                      id: o.id,
                      value: o.name,
                    })
                  }
                >
                  {o.name}
                </TableCell>
                {columns.map((column) => {
                  const { costConfig } = matrix[o.id][column] ?? {};
                  return (
                    <TableCell
                      data-x={o.id}
                      data-y={o.name}
                      key={`${o.id}-${column}`}
                      align='left'
                      onDoubleClick={() =>
                        console.log({
                          operationId: o?.id,
                          id: costConfig?.id,
                          value: costConfig?.cost,
                        })
                      }
                    >
                      {costConfig?.cost}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
