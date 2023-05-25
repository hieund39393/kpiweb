// import { configDefaultSliderChart } from "core/utils/utility";

function configChart(config) {
  const setWidth = window.innerWidth;
  let fontSize = 14;

  // const configSlider = configDefaultSliderChart(config.monthLength.length)
  // custom config
  const custom = {
    slider: {
      // start: configSlider.start,
      // end: configSlider.end,
      start: 0,
      end: 1,
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
    padding: [10, 30, 100, 80],
    xAxis: {
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
      },
      maxLimit: config.yAxis.maxLimit
    },
    label: {
      style: {
        fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
        fontWeight: 500,
        fill: '#0F0F1A',
      },
    },
    tooltip: {
      customContent: (title, items) => {
        setWidth <= 2539 ? fontSize = 18 : setWidth >= 2540 && setWidth <= 3839 ? fontSize = 24 : fontSize = 32
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
    legend: config.legend === false ? false :
      {
        ...config.legend,
        ...{
          offsetY: 20,
          itemName: {
            style: {
              fontSize: setWidth <= 2539 ? 20 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
              fontWeight: 500,
              fill: '#0F0F1A',
            },
          }
        }
      },
  }

  return { ...config, ...custom };
}

export default configChart;
