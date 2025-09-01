interface MenuOption {
  order: number;
  label: string;
  route: string;
  enabled: boolean;
}

export const menuOptions: MenuOption[] = [
  { order: 1, label: 'Precios Base', route: 'base-prices', enabled: false },
  { order: 2, label: 'Waste', route: 'waste', enabled: false },
  {
    order: 3,
    label: 'Costos Indirectos',
    route: 'indirect-costs',
    enabled: true,
  },
  { order: 4, label: 'Tipo de Cliente', route: 'client-type', enabled: false },
  { order: 5, label: 'Comisiones', route: 'commissions', enabled: false },
  {
    order: 6,
    label: 'Tipos de Cambio',
    route: 'exchange-rates',
    enabled: false,
  },
  {
    order: 7,
    label: 'Tasa Financiera Anual',
    route: 'annual-financial-rate',
    enabled: false,
  },
  { order: 8, label: 'Logística', route: 'logistics', enabled: false },
];
