import { _FALSE } from 'constant';
import { _COLORBLACK, _VALUE, _XVALUES } from 'constant/chart';

const formatPie = (data) => {
  const xData = data.xValues;
  const pieData = data.series ?? [];
  let result: Object[] = [];

  pieData.forEach((element, index) => {
    const item = [
      {
        xValues: xData[index],
        value: element.yValues[0],
        type: element.name,
      },
    ];
    result = [...result, ...item];
  });

  return result;
};

const formatColorPie = (data) => {
  const barData = data.series ?? [];

  let colors: any = []
  // eslint-disable-next-line
  barData.map((el) => {
    if (el.yValues[0] === 0) colors.push('#fdfdfd')
    else colors.push(el.color)
  });
  return colors;
};

const setWidth = window.innerWidth;
let fontSize = 18;

export const configChartPie = (typeChart, data) => {
  const pie: any = formatPie(data);
  console.log("pie:" + pie)
  const colorsPie = formatColorPie(data);
  const configChart = {
    typeChart: typeChart,
    title: data.title,
    unit: data.unit,
    layout: data.layout,
    appendPadding: 10,
    data: pie,
    periodData: data.periodData ?? [],
    angleField: _VALUE,
    colorField: _XVALUES,
    radius: 1,
    padding: [10, 50, 200, 50],
    innerRadius: 0.8,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
        opacity: 0
      },
      position: 'bottom',
    },
    // interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: _FALSE,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
    color: colorsPie,
    legend: {
      position: 'bottom-right',
      offsetX: setWidth <= 576 ? 50 : setWidth >= 577 && setWidth <= 1024 ? 30 : setWidth >= 577 && setWidth <= 1024 && pie.length <= 3 ? 0 : setWidth >= 1440 && pie.length <= 3 ? -200 : setWidth >= 1025 && setWidth <= 1399 && pie.length <= 3 ? -120 : setWidth <= 1550 && setWidth >= 1367 ? 120 : 50,
      offsetY: pie.length <= 3 ? -170 : setWidth >= 769 && setWidth <= 991 ? -115 : -85,
      itemWidth: setWidth >= 1551 ? 134 : setWidth <= 1550 && setWidth >= 1367 ? 150 : setWidth <= 1366 && setWidth >= 1025 ? 110 : setWidth <= 1024 && setWidth >= 769 ? 115 : setWidth <= 768 && setWidth >= 577 ? 110 : setWidth <= 576 ? 134 : 95,
      itemName: {
        formatter: (text, items, index) => {
          return text + ':'
        },
        style: {
          fill: _COLORBLACK,
          fontWeight: 900,
          fontSize: setWidth <= 1366 ? 12 : setWidth >= 1025 && setWidth <= 1920 ? 16 : setWidth > 1920 && setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3859 ? 24 : 32,
        }
      },
      itemValue: {
        formatter: (v, items, index) => {
          return pie[index].value + '%'
        },
        style: {
          fill: '#0F0F1A',
          fontSize: setWidth <= 1366 ? 12 : setWidth >= 1025 && setWidth <= 1920 ? 16 : setWidth > 1920 && setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3859 ? 24 : 32,
        }
      },
      maxRow: 10,
      pageNavigator: {
        marker: {
          style: {
            inactiveFill: '#ffffff',
            inactiveOpacity: 0.45,
            fill: '#ffffff',
            opacity: 0.8,
            size: 14,
          },
        },
        text: {
          style: {
            fill: '#ffffff',
            fontSize: 8,
          },
        },
      },
    },
    tooltip: {
      customContent: (title, items) => {
        setWidth <= 1920 ? fontSize = 14 : setWidth > 1920 && setWidth <= 2539 ? fontSize = 18 : setWidth >= 2540 && setWidth <= 3859 ? fontSize = 24 : fontSize = 32
        return (
          <>
            <ul style={{ paddingLeft: 0 }} className="tooltip-chart-pie">
              {items?.map((item, index) => {
                const { value } = item;
                return (
                  <>
                    <span
                      key={item.name}
                      className="g2-tooltip-list-item"
                      data-index={index}
                      style={{ display: 'flex', alignItems: 'center', fontSize: fontSize }}
                    >

                      <span
                        style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between', fontSize: fontSize }}
                      >
                        <span style={{ marginRight: 16, color: item.color, fontSize: fontSize }}>{title}:</span>
                        <span className="g2-tooltip-list-item-value" style={{ color: item.color, fontSize: fontSize }}>{value + '%'}</span>
                      </span>
                    </span>
                  </>
                );
              })}
            </ul>
          </>
        );
      },
    }
  };
  return configChart;
};
