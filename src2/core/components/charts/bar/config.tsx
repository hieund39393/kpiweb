import { _ARGS, _FALSE, _TRUE } from 'constant';
import { _BARSTRING, _COLORBLACK, _COLUMN, _SQUARE, _TYPE, _VALUE, _XVALUES } from 'constant/chart';
import { configDefaultSliderChart } from 'core/utils/utility';

const setWidth = window.innerWidth;
let fontSize = 18;
setWidth <= 1024
  ? (fontSize = 12)
  : setWidth >= 1025 && setWidth <= 1920
  ? (fontSize = 14)
  : setWidth >= 1921 && setWidth <= 2539
  ? (fontSize = 18)
  : setWidth >= 2540 && setWidth <= 3859
  ? (fontSize = 24)
  : (fontSize = 32);

export const formatBarData = (data) => {
  let barData: any[] = [];

  if (data.type === _BARSTRING) {
    barData = data.series;
  } else {
    barData = data.series.filter((e) => e.type === _BARSTRING);
  }

  const xData = data.xValues;
  let result: Object[] = [];
  barData.forEach((element) => {
    const item: Array<any> = element.yValues.map((e, index) => ({
      xValues: xData[index],
      value: e,
      type: element.name,
    }));
    result = [...result, ...item];
  });

  return result;
};

export const formatItems = (data) => {
  const items = data.series.map((el) => ({
    value: el.name,
    name: el.name,
    marker: {
      symbol: _SQUARE,
      style: {
        fill: el.color,
        r: _ARGS.duration,
      },
    },
  }));

  return items;
};

export const formatColorBar = (data) => {
  const colors = data.series.map((el) => el.color);
  return colors;
};

export const configChartBar = (typeChart, data) => {
  const barData = formatBarData(data);
  const colorsBar = formatColorBar(data);
  const items = formatItems(data);

  const configSlider = configDefaultSliderChart(data.xValues.length);

  const configChart = {
    showDetails: data.showDetails,
    dataID: data.id,
    align: data.align,
    additionalTitle: data.additionalTitle,
    monthLength: data.xValues,
    slider: {
      start: configSlider.start,
      end: configSlider.end,
      handlerStyle: {
        opacity: 0,
        width: 0,
        height: 0,
      },
      backgroundStyle: {
        opacity: 0,
      },
      foregroundStyle: {
        opacity: 0,
      },
      textStyle: {
        opacity: 0,
      },
      trendCfg: {
        backgroundStyle: {
          opacity: 0,
        },
        lineStyle: {
          opacity: 0,
        },
        areaStyle: {
          opacity: 0,
        },
      },
      height: 0,
      minLimit: 0,
      maxLimit: 0,
    },
    typeChart: typeChart,
    autoFit: true,
    layout: data.layout,
    title: data.title,
    unit: data.unit,
    padding: [20, 20, 20, 50],
    data: barData,
    xField: _XVALUES,
    yField: _VALUE,
    intervalPadding: -50,
    seriesField: 'type',
    color: colorsBar,
    yAxis: {
      label: {
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize,
        },
      },
    },
    xAxis: {
      label: {
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize,
        },
      },
    },
    geometryOptions: [
      {
        geometry: _COLUMN,
        isGroup: _TRUE,
        seriesField: _TYPE,
        columnWidthRatio: 0.5,
        label: {},
        color: colorsBar,
      },
    ],
    legend: {
      custom: _TRUE,
      position: 'bottom',
      items,
      offsetY: setWidth <= 1024 ? 25 : 30,
      itemName: {
        style: {
          fill: _COLORBLACK,
          fontSize: fontSize,
          fontWeight: 600,
        },
      },
    },
    label: {
      style: {
        fill: _COLORBLACK,
        fontSize: fontSize,
        fontWeight: setWidth <= 1024 ? 400 : 600,
      },
      position: 'right',
    },
    tooltip: {
      customContent: (title, items) => {
        return (
          <div className="tooltip-line-bar" style={{ padding: '10px 10px' }}>
            <p style={{ fontSize: fontSize }}>{title}</p>
            <ul style={{ paddingLeft: 0 }} className="tooltip-chart-bar">
              {items?.map((item, index) => {
                const { value } = item;
                return (
                  <span
                    key={item.name}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{
                      marginBottom: 4,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: fontSize,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        flex: 1,
                        justifyContent: 'space-between',
                        fontSize: fontSize,
                      }}
                    >
                      <span style={{ marginRight: 16, color: item.color, fontSize: fontSize }}>
                        {item.name}:
                      </span>
                      <span
                        className="g2-tooltip-list-item-value"
                        style={{ color: item.color, fontSize: fontSize }}
                      >
                        {value}
                      </span>
                    </span>
                  </span>
                );
              })}
            </ul>
          </div>
        );
      },
    },
  };

  return configChart;
};

const formatTopLowestData = (data) => {
  const barData = data.series;
  const xData = data.xValues;
  let result: Object[] = [];

  barData.forEach((element) => {
    const item: Array<any> = element.yValues.map((e, index) => ({
      xValues: xData[index],
      value: e,
      type: element.name,
    }));
    result = [...result, ...item];
  });

  return result;
};

export const configChartBarTop = (typeChart, data) => {
  const barData = formatTopLowestData(data);
  let maxLimitColumn = Math.max(...barData.map((x) => x[_VALUE]));
  const lengthBar = data.xValues.length;

  maxLimitColumn += maxLimitColumn * 0.1;
  let minLimitColumn = Math.min(...barData.map((x) => x[_VALUE]));
  const configChart = {
    valueID: data.index,
    additionalTitle: data.additionalTitle,
    order: data.order,
    typeChart: typeChart,
    title: data.title,
    layout: data.layout,
    data: barData,
    dataID: data.id,
    seriesField: _XVALUES,
    autoFit: _TRUE,
    xField: _VALUE,
    yField: _XVALUES,
    minBarWidth: 10,
    maxBarWidth: lengthBar > 10 ? 10 : lengthBar <= 10 && lengthBar >= 6 ? 20 : 30,
    label: {
      position: 'middle',
      offset: 10,
      style: {
        fontSize: fontSize,
        fontWeight: setWidth <= 1024 ? 400 : 600,
        fill: _COLORBLACK,
      },
    },
    legend: _FALSE,
    padding:
      setWidth <= 576
        ? [0, 40, 30, 130]
        : setWidth > 577 && setWidth <= 991
        ? [10, 40, 30, 140]
        : setWidth >= 992 && setWidth <= 1550
        ? [10, 40, 20, 160]
        : [10, 60, 20, 170],
    color: data.series[0].color,
    yAxis: {
      label: {
        style: {
          fill: _COLORBLACK,
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fontSize: fontSize,
        },
      },
      maxLimit: maxLimitColumn,
      minLimit: minLimitColumn,
    },
    xAxis: {
      label: {
        style: {
          fontSize: fontSize,
          fill: _COLORBLACK,
          fontWeight: setWidth <= 1024 ? 400 : 600,
        },
      },
    },
    barBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: _FALSE,
      },
    ],
    tooltip: {
      customContent: (title, items) => {
        return (
          <>
            <ul style={{ paddingLeft: 0 }} className="tooltip-chart-bar">
              {items?.map((item, index) => {
                const { value } = item;
                return (
                  <span
                    key={item.name}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{
                      marginBottom: 4,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: fontSize,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        flex: 1,
                        justifyContent: 'space-between',
                        fontSize: fontSize,
                      }}
                    >
                      <span style={{ marginRight: 16, color: item.color, fontSize: fontSize }}>
                        {item.name}:
                      </span>
                      <span
                        className="g2-tooltip-list-item-value"
                        style={{ color: item.color, fontSize: fontSize }}
                      >
                        {value}
                      </span>
                    </span>
                  </span>
                );
              })}
            </ul>
          </>
        );
      },
    },
  };

  return configChart;
};

export const configChartBarVertical = (configs) => {
  const dataConvert = configs.data.sort(function (a, b) {
    let valueA = a.xValues.split(' ');
    let valueB = b.xValues.split(' ');
    return parseInt(valueB[1]) - parseInt(valueA[1]);
  });

  let colorString = configs.color.toString();
  let arrColor = colorString.split(',').reverse();

  const maxData = Math.max(...configs.data.map((x) => x[_VALUE]));
  const config = {
    slider: configs.slider,
    additionalTitle: configs.additionalTitle,
    data: dataConvert,
    isGroup: true,
    monthLength: configs.monthLength,
    dodgePadding: setWidth <= 1024 ? 2 : 4,
    padding: maxData >= 10000 ? [10, 90, 50, 80] : [10, 60, 50, 80],
    xField: _VALUE,
    yField: _XVALUES,
    seriesField: 'type',
    intervalPadding: -50,
    color: arrColor,
    label: configs.label,
    xAxis: configs.xAxis,
    yAxis: {
      label: {
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize,
        },
      },
    },
    legend: configs.legend,
    tooltip: configs.tooltip,
  };
  return config;
};
