import { _DAT } from "constant/chart";

function configChart(config) {
  // custom config
  const custom = {
    axis: { // Cấu hình dành cho 1 range và hiển thị giá trị 
      label: {
        formatter: config.axis.label.formatter,
        style: {
          fontWeight: 500,
          fill: '#0F0F1A',
          fontSize: 22
        },
        offset: config.lengthValue > 7 ? -65 : -35,
      },
    },
    label: {
      style: {
        fontSize: 40,
        fontWeight: 500,
        fill: '#0F0F1A',
      },
    },
    statistic: { // Nội dung bên trong. Ví dụ: Đạt và số %
      title: {
        offsetY: -30,
        formatter: function formatter() {
          return _DAT + ': ';
        },
        style: {
          fontSize: '20px',
          fontWeight: 'bold'
        },
      },
      content: {
        offsetY: 30,
        style: {
          fontSize: '50px',
          color: 'red',
          fontWeight: 'bold'
        },
        formatter: function formatter() {
          return config.complete
        }
      },
    },
  }

  return { ...config, ...custom };
}

export default configChart;
