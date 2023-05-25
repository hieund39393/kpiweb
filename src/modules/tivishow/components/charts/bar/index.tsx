
import { Bar } from '@ant-design/charts';
import { configChartBarTop } from './config';

function BarChart(props) {
  const { config } = props;
  const custom = configChartBarTop(config)
  const customConfig = { ...config, ...custom }
  return (
    <Bar {...customConfig} className="chart-render" />
  );
}

export default BarChart;
