import { _FALSE } from "constant";
import { _VALUE } from "constant/chart";

function configChart(config) {
  let maxValue = Math.max(...config.data.map((x) => x[_VALUE]));
  const setWidth = window.innerWidth;
  const configChartColumns = {
    slider: config.slider,
    data: config.data,
    isGroup: true,
    xField: 'xValues',
    yField: 'value',
    seriesField: 'type',
    dodgePadding: 20,
    padding: maxValue < 1000000 ? [40, 20, 70, 80] : [40, 20, 70, 100],
    label: {
      position: 'top',
      style: {
        fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
        fontWeight: 500,
        fill: '#0F0F1A',
      },
      offsetY: 10
    },
    xAxis: {
      label: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fontWeight: 500,
          fill: '#0F0F1A',
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fontWeight: 500,
          fill: '#0F0F1A',
        },
      },
    },
    legend: {
      custom: _FALSE,
      position: 'bottom',
      offsetY: 30,
      itemName: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fontWeight: 600,
          fill: '#0F0F1A',
        }
      }
    },
    tooltip: config.tooltip
  }

  return { ...config, ...configChartColumns };
}

export default configChart;
