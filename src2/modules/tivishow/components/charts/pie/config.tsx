import { _COLORBLACK } from "constant/chart";

function configChart(config) {
  const setWidth = window.innerWidth;
  const custom = {
    legend: {
      maxRow: 10,
      position: 'bottom-right',
      offsetX: 100,
      offsetY: setWidth <= 2539 ? -70 : setWidth >= 2540 && setWidth <= 3859 ? -85 : -70,
      itemWidth: setWidth <= 2539 ? 200 : setWidth >= 2540 && setWidth <= 3859 ? 300 : 400,
      itemName: {
        formatter: (text, ItemList, index) => {
          return text + ':'
        },
        style: {
          fill: _COLORBLACK,
          fontWeight: 900,
          fontSize: setWidth <= 1920 ? 16 : setWidth > 1920 && setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3859 ? 24 : 32,
        }
      },
      itemValue: {
        formatter: (v, ItemList, index) => {
          return config.data[index].value + '%'
        },
        style: {
          fill: '#0F0F1A',
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3859 ? 24 : 32,
        }
      }
    }
  }
  return { ...config, ...custom };
}

export default configChart;
