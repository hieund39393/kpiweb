import { DualAxes } from '@ant-design/charts';
import { _UNITPHANTRAM } from 'constant/chart';
import configChart from './config';

function DualAxesChart(props) {
  const { config, key, title, className } = props;

  return (
    <div className={`line-box chart-content ${className}`} key={key}>
      {
        config.additionalTitle !== '' ?
          <div className="title-chart-linebar">
            <div className="linebar-header">
              <span>Giá trị kế hoạch: </span>
              <span>{config.unit === _UNITPHANTRAM ? (config.additionalTitle + '' + config.unit) : (config.additionalTitle + ' ' + config.unit)}</span>
            </div>
            <div className="content-title">{title}</div>
          </div>
          : <div className="content-title">{title}</div>
      }
      {
        <DualAxes {...configChart(config)} className="chart-render" />
      }
    </div>
  );
}

export default DualAxesChart;
