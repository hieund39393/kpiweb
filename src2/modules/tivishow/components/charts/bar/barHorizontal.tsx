import { Bar } from '@ant-design/charts';
import { configChartBarVertical } from './config';

function BarHorizontalTivi(props) {
    const { config } = props;

    return (
        <Bar {...configChartBarVertical(config)} className="chart-render" />
    );
}

export default BarHorizontalTivi;
