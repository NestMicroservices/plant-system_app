import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { CostConfig } from '../services/graphql/types/cost-config.interface';
import type { Plant } from '../services/graphql/types/plant.inteface';
import { PlantClient } from '../services/plant-client';
import type { Operation } from '../services/graphql/types/operation.interface';

interface Cell {
  column: number;
  row: number;
  costConfig: CostConfig;
}

type IndirectCostColumn = Record<number, Cell>;
export type IndirectCostRow = Record<number, IndirectCostColumn>;

export const useIndirectCost = () => {
  const { plantId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState<number[]>([]);
  const [matrix, setMatrix] = useState<IndirectCostRow>({});
  const [plant, setPlant] = useState<Plant>();
  const [operations, setOperations] = useState<Operation[]>([]);

  const buildColumns = (costConfigs: CostConfig[], row: number) =>
    costConfigs.reduce((accCostConfig: IndirectCostColumn, costConfig) => {
      accCostConfig[costConfig.volume] = {
        costConfig: { ...costConfig },
        column: costConfig.volume,
        row: row,
      };
      return accCostConfig;
    }, {});

  useEffect(() => {
    if (!plantId) return;

    PlantClient.fetchPlantById(+plantId).then((plant) => {
      setIsLoading(true);
      if (plant) {
        setPlant(plant);
        setColumns(plant?.volumes ?? []);
        setOperations(plant.operations);

        const rows = plant.operations.reduce(
          (acc: IndirectCostRow, operation) => {
            acc[operation.id] = buildColumns(
              operation.costConfigs,
              operation.id
            );
            return acc;
          },
          {}
        );

        setMatrix(rows);
      }

      setIsLoading(false);
    });
  }, [plantId]);

  return {
    columns,
    matrix,
    plant,
    operations,
    isLoading,
  };
};
