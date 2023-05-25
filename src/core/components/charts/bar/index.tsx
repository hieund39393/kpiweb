
import { Bar } from '@ant-design/charts';

function BarVertical(props) {
    const { config } = props;
    return <Bar {...config} />
}

export default BarVertical;