import { _TRUE } from "constant";
import { _COLORBLACK, _VALUE, _XVALUES } from "constant/chart";
const setWidth = window.innerWidth;

export function configChart(config) {
  // custom config
  const custom = {
    slider: config.slider,
    xAxis: {
      nice: true,
      label: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fontWeight: 500,
          fill: '#0F0F1A',
        }
      },
    },
    yAxis: {
      label: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fontWeight: 500,
          fill: '#0F0F1A',
        },
      }
    },
    label: {
      style: {
        fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
        fontWeight: 500,
        fill: '#0F0F1A',
      },
    },
    legend: {
      offsetY: 10,
      itemName: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fontWeight: 500,
          fill: '#0F0F1A',
        },
      },
    },
  }

  return { ...config, ...custom };
}

export const configChartBarVertical = (configs) => {

  let colorString = configs.color.toString();
  let arrColor = colorString.split(',').reverse()

  const dataConvert = configs.data.sort(function (a, b) {
    let valueA = a.xValues.split(' ');
    let valueB = b.xValues.split(' ');
    return parseInt(valueB[1]) - parseInt(valueA[1]);
  })
  const config = {
    slider: {
      start: configs.slider.start,
      end: configs.slider.end,
      handlerStyle: {
        opacity: 0,
        width: 0,
        height: 0,
      },
      backgroundStyle: {
        opacity: 0
      },
      foregroundStyle: {
        opacity: 0
      },
      textStyle: {
        opacity: 0
      },
      trendCfg: {
        backgroundStyle: {
          opacity: 0
        },
        lineStyle: {
          opacity: 0
        },
        areaStyle: {
          opacity: 0
        }
      },
      height: 0,
      minLimit: 0,
      maxLimit: 0,
    },
    data: dataConvert,
    isGroup: true,
    dodgePadding: 5,
    padding: [10, 110, 50, 100],
    xField: _VALUE,
    yField: _XVALUES,
    seriesField: 'type',
    color: arrColor,
    label: {
      style: {
        fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
        fill: configs.xAxis.label.style.fill,
        fontWeight: configs.xAxis.label.style.fontWeight
      },
      position: configs.label.position
    },
    xAxis: {
      label: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fill: configs.xAxis.label.style.fill,
          fontWeight: configs.xAxis.label.style.fontWeight
        }
      }
    },
    yAxis: {
      label: {
        style: {
          fill: configs.yAxis.label.style.fill,
          fontWeight: 600,
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
        },
      },
    },
    legend: {
      custom: _TRUE,
      position: configs.legend.position,
      items: configs.legend.items,
      offsetY: setWidth <= 2539 ? 38 : 50,
      itemName: {
        style: {
          fill: _COLORBLACK,
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fontWeight: 600
        },
      }
    },
    tooltip: configs.tooltip
  }
  return config
}

export function configChartBarTop(config) {
  const custom = {
    yAxis: {
      label: {
        style: {
          fill: config.yAxis.label.style.fill,
          fontWeight: config.yAxis.label.style.fontWeight,
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
        },
      },
      maxLimit: config.yAxis.maxLimit,
      minLimit: config.yAxis.minLimit,
    },
    padding: [20, 80, 30, 200],
    label: {
      position: "middle",
      offset: config.label.offset,
      style: {
        fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
        fontWeight: config.label.style.fontWeight,
        fill: config.label.style.fill,
      }
    },
    xAxis: {
      label: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fill: config.xAxis.label.style.fill,
          fontWeight: config.xAxis.label.style.fontWeight
        }
      }
    },
  }
  return custom
}
