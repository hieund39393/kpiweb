import { Line } from '@ant-design/charts';
import configChart from './config';

function LineChart(props) {
  const { config, title, className } = props;

  return (
    <div className={`line-box chart-content ${className}`} >
      <div className="content-title">{title}</div>
      {
        <Line {...configChart(config)} className="chart-render" />
      }
    </div>
  );
}

export default LineChart;
