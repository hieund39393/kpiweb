import { Pie } from '@ant-design/charts';
import configChart from './config';

function PieChart(props) {
  const { config } = props;

  return (
    <Pie {...configChart(config)} className="chart-render" />
  );
}

export default PieChart;