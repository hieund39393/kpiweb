import { Pie } from '@ant-design/charts';

function PieChart(props) {
  const { config, title } = props;

  return (
    <div className="pie-box">
      <div className="content-title">{title}</div>
      <Pie {...config} />
    </div>
  );
}

export default PieChart;
