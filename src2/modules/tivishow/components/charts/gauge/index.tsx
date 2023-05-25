import { Gauge } from '@ant-design/plots';
import configChart from './config';

function GaugeSpeed(props) {
  const { config } = props;

  return (
    <Gauge {...configChart(config)} className="chart-render" />
  );
}

export default GaugeSpeed;
