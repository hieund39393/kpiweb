import { _NAME, _TEXTMONTH, _XVALUES, _YVALUES } from "constant/chart";
import { getMaxLineChart } from "core/utils/utility";
import { IDK, Input, Output, Series } from "modules/dashboard/dtos/responses/ChartResponse";
import { titleCase } from '../../../utils/utility'
const setWidth = window.innerWidth;
let fontSize = 18;
setWidth <= 1024 ? fontSize = 12 : setWidth >= 1025 && setWidth <= 1920 ? fontSize = 14 : setWidth >= 1921 && setWidth <= 2539 ? fontSize = 18 : setWidth >= 2540 && setWidth <= 3859 ? fontSize = 24 : fontSize = 32

function formatChart(input: Input): Output {
  const { type, title, xValues, series } = input;
  const legend =
    series.length === 1 || series[0].name === ''
      ? false
      : {
        layout: 'horizontal',
        position: 'bottom',
        offsetY: 10,
        itemName: {
          style: {
            fontWeight: 500,
            fill: '#0F0F1A',
            fontSize: fontSize
          },
        }
      };

  let tooltip = {};

  if (series.length === 1 && series[0].name === '') {
    tooltip = {
      customContent: (title, items) => {
        return (
          <>
            <ul style={{ paddingLeft: 0 }}>
              {items?.map((item, index) => {
                const { value } = item;
                return (
                  <li
                    key={item.year}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
                  >
                    <span
                      style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
                    >
                      <span style={{ marginRight: 16 }}>{title}:</span>
                      <span className="g2-tooltip-list-item-value">{value}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        );
      },
    };
  }

  const output: Output = { type, title, color: [], data: [], legend, tooltip };
  series.forEach((item: Series) => {
    const { name, color, yValues } = item;
    const idk = { name } as IDK;

    output.color.push(color);

    yValues.forEach((value, index) => {
      output.data.push({
        ...idk,
        xValues: xValues[index],
        yValues: value,
      });
    });
  });

  return output;
}

export const configChartLine = (typeChart, data) => {
  const lines = formatChart(data);
  const yValues = lines.data.map(x => x[_YVALUES]);

  let maxLineLimit = Math.max(...yValues);


  // if (maxLineLimit === 0) maxLineLimit = 4;
  // else if (maxLimit > 0 && maxLimit < 1) maxLimit = 1
  // else if (maxLimit >= 1 && maxLimit <= 4) maxLimit = 4
  // else if (maxLimit >= 5 && maxLimit <= 10) maxLimit = 12
  // else if (maxLimit >= 11 && maxLimit <= 30) maxLimit = 36
  // else if (maxLimit >= 31 && maxLimit <= 60) maxLimit = 66
  // else if (maxLimit >= 61 && maxLimit <= 100) maxLimit = 120
  // else if (maxLimit >= 101 && maxLimit <= 300) maxLimit = 300
  // else if (maxLimit >= 301 && maxLimit <= 600) maxLimit = 600
  // else if (maxLimit >= 601 && maxLimit <= 1000) maxLimit = 1296
  // else if (maxLimit >= 1001 && maxLimit <= 2000) maxLimit = 2100
  // else if (maxLimit >= 2001 && maxLimit <= 3000) maxLimit = 3600
  // else if (maxLimit >= 3001 && maxLimit <= 4000) maxLimit = 4200
  // else if (maxLimit >= 4001 && maxLimit <= 6000) maxLimit = 6600
  // else if (maxLimit >= 6001 && maxLimit <= 10000) maxLimit = 12000
  // else if (maxLimit >= 10001) maxLimit = 46656
  // else maxLimit = 279936;
  let maxLimit = getMaxLineChart(maxLineLimit, 0.1, 4);
  // maxLimit = Number(maxLimit.toFixed(0));

  // const configSlider = configDefaultSliderChart(data.xValues.length)

  const configChart = {
    typeChart: typeChart,
    title: data.title,
    additionalTitle: data.additionalTitle,
    monthLength: data.xValues,
    // slider: {
    //   start: configSlider.start,
    //   end: configSlider.end,
    //   handlerStyle: {
    //     opacity: 0,
    //     width: 0,
    //     height: 0,
    //   },
    //   backgroundStyle: {
    //     opacity: 0
    //   },
    //   foregroundStyle: {
    //     opacity: 0
    //   },
    //   textStyle: {
    //     opacity: 0
    //   },
    //   trendCfg: {
    //     backgroundStyle: {
    //       opacity: 0
    //     },
    //     lineStyle: {
    //       opacity: 0
    //     },
    //     areaStyle: {
    //       opacity: 0
    //     }
    //   },
    //   height: 0,
    //   minLimit: 0,
    //   maxLimit: 0,
    // },
    layout: data.layout,
    unit: data.unit,
    data: lines.data,
    padding: setWidth <= 576 ? [10, 0, 50, 40] : setWidth >= 577 && setWidth <= 768 ? [10, 10, 60, 35] : [10, 30, 60, 65],
    xField: _XVALUES,
    yField: _YVALUES,
    xAxis: {
      nice: true,
      label: {
        formatter: (text, item, index) => {
          if (titleCase(text).indexOf(_TEXTMONTH) > -1) {
            if (data.xValues.length > 6) {
              const convert = item.id.split(' ')
              return 'Th.' + convert[1]
            } else return text;
          } else return text;
        },
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize
        }
      },
    },
    yAxis: {
      nice: true,
      maxLimit,
      label: {
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize
        },
        // formatter: function formatter(datum) {
        //   return datum >= 1 || datum <= -1 ? Number(datum).toFixed(0) : Number(datum) === 0 ? 0 : Number(datum).toFixed(3).replace(/\.?0+$/, "");
        // },
      }
    },
    seriesField: _NAME,
    intervalPadding: -50,
    label: {
      style: {
        fontWeight: setWidth <= 1024 ? 400 : 600,
        fill: '#0F0F1A',
        fontSize: fontSize
      },
    },
    legend: lines.legend,
    color: lines.color,
    point: {},
    tooltip: {
      customContent: (title, items) => {
        return (
          <div className="tooltip-line-bar" style={{ padding: '10px 10px' }}>
            {
              items && items.length > 1 ?
                <>
                  <p style={{ fontSize: fontSize }}>{title}</p>
                  <ul style={{ paddingLeft: 0 }}>
                    {items?.map((item, index) => {
                      const { value } = item;
                      return (
                        <span
                          key={item.name}
                          className="g2-tooltip-list-item"
                          data-index={index}
                          style={{ marginBottom: 4, display: 'flex', alignItems: 'center', fontSize: fontSize }}
                        >
                          <span
                            style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between', fontSize: fontSize }}
                          >
                            <span style={{ marginRight: 16, color: item.color, fontSize: fontSize }}>{item.name}:</span>
                            <span className="g2-tooltip-list-item-value" style={{ color: item.color, fontSize: fontSize }}>{value}</span>
                          </span>
                        </span>
                      );
                    })}
                  </ul>
                </> : <>
                  <ul style={{ paddingLeft: 0 }}>
                    {items?.map((item, index) => {
                      const { value } = item;
                      return (
                        <span
                          key={item.name}
                          className="g2-tooltip-list-item"
                          data-index={index}
                          style={{ marginBottom: 4, display: 'flex', alignItems: 'center', fontSize: fontSize }}
                        >
                          <span
                            style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between', fontSize: fontSize }}
                          >
                            <span style={{ marginRight: 16, color: item.color, fontSize: fontSize }}>{title}:</span>
                            <span className="g2-tooltip-list-item-value" style={{ color: item.color, fontSize: fontSize }}>{value}</span>
                          </span>
                        </span>
                      );
                    })}
                  </ul>
                </>

            }
          </div>
        );
      },
    },
  };

  return configChart
}