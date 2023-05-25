export interface ChartDataLevel2Item {
  title: string;
  unit: string;
  showDetails: boolean;
  periodData: object;
  charts: Array<any>;
}
export interface DataChartLevel2Res {
  title: string;
  charts: ChartDataLevel2Item[];
}

export interface NgaySuCoProps {
  value: string
  ngay: string
}
