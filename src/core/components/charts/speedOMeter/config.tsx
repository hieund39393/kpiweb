import { _TRUE } from 'constant';
import { _DAT } from 'constant/chart';

const formatData = (data) => {
  const complete = Number(data.complete.replace('%', '')) / 100;
  const percent = complete !== 0 ? complete : data.speedData;
  // const speedData = data.speedData;
  const ticks: number[] = [0];
  const colors: string[] = [];
  let rangeValue = 0;
  const maxValue = data.speedYValues.max !== 0 ? parseFloat(data.speedYValues.max.toFixed(3)) : 1;

  data.speedYValues.plotBands.forEach((bandValue, index) => {
    rangeValue = parseFloat((bandValue.to / maxValue).toFixed(2));

    if (index === 0 && rangeValue !== 0) {
      ticks.push(rangeValue);
      colors.push(bandValue.color);
    } else if (Number(rangeValue === 0)) {
      if (data.speedYValues.plotBands.every((value, i, array) => value.to === array[0].to)) {
        ticks.push((index + 1) * 0.2);
        colors.push(bandValue.color);
      } else {
        colors.pop();
      }
    } else if (Number(rangeValue !== 0)) {
      ticks.push(rangeValue);
      colors.push(bandValue.color);
    }
  });

  const dataLength = data.speedYValues.plotBands.length;
  const config = {
    renderer: 'canvas',
    autoFit: _TRUE,
    percent: percent,
    complete: data.complete,
    range: {
      ticks: ticks,
      color: colors,
    },
    padding: [0, 10, 0, 10],
    indicator: {
      // Kim
      pointer: { style: { stroke: '#0F0F1A' } },
      pin: { style: { stroke: '#0F0F1A' } },
    },
    axis: { // Cấu hình dành cho 1 range và hiển thị giá trị        
      // nice: true,
      tickMethod: 'r-pretty',
      label: {
        formatter: function formatter(v, item, index) {
          var value = Number(v);
          if (index === dataLength) value = 1;
          return parseFloat((value * maxValue).toFixed(3));
        },
        style: {
          fontWeight: 500,
          fill: '#0F0F1A',
        },
        offset: maxValue.toString().length > 7 ? -40 : -25
      },
      tickInterval: 0.2,
      subTickLine: { count: 3 },
    },
    statistic: {
      // Nội dung bên trong. Ví dụ: Đạt và số %
      title: {
        offsetY: -10,
        formatter: function formatter() {
          return _DAT + ': ';
        },
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
      content: {
        offsetY: 50,
        style: {
          fontSize: '50px',
          color: percent >= 1 ? '#40A9FF' : 'red',
          fontWeight: 'bold',
        },
        formatter: function formatter() {
          return data.complete;
        },
      },
    },
    lengthValue: maxValue.toString().length,
  };

  return config;
};

export const configChartSpeed = (typeChart, data) => {
  const configChart = {
    dataID: data.id,
    typeChart: typeChart,
    layout: data.layout,
    title: data.title,
    data: formatData(data),
    unit: data.unit,
    additionalData: data.additionalData,
  };

  return configChart;
};
