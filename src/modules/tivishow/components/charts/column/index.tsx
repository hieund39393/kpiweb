import { Column } from '@ant-design/charts';
import configChart from './config';

function BarColumn(props) {
  const { config } = props;

  return (
    <Column {...configChart(config)} className="chart-render" />
  );
}

export default BarColumn;
