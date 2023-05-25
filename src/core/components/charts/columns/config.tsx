import { _FALSE } from "constant";
import { _GIATRITHUCHIENVN, _VALUE } from "constant/chart";

const setWidth = window.innerWidth;
let fontSize = 18;
setWidth <= 1024 ? fontSize = 12 : setWidth >= 1025 && setWidth <= 1920 ? fontSize = 14 : setWidth >= 1921 && setWidth <= 2539 ? fontSize = 18 : setWidth >= 2540 && setWidth <= 3859 ? fontSize = 24 : fontSize = 32

function configColumns(config) {
  let maxValue = Math.max(...config.data.map((x) => x[_VALUE]));
  let length = config.data.length / config.monthLength.length
  let arr1: any[] = [];
  let arr2: any[] = [];
  if (length === 2) {
    for (let i = 0; i < config.data.length / length; i++) {
      arr1.push(config.data[i])
    }
    for (let j = (config.data.length / length); j < config.monthLength.length * length; j++) {
      arr2.push(config.data[j]);
    }
  }

  const configChartColumns = {
    data: config.data,
    additionalTitle: config.additionalTitle,
    isGroup: true,
    xField: 'xValues',
    yField: 'value',
    seriesField: 'type',
    dodgePadding: setWidth <= 576 ? 8 : 25,
    padding: setWidth <= 576 ? [20, 20, 55, 55] : setWidth >= 577 && setWidth <= 768 ? [20, 10, 45, 50] : setWidth >= 769 && maxValue < 10000 ? [20, 10, 45, 47] : (setWidth >= 769 && maxValue >= 10000) && (setWidth >= 769 && maxValue <= 1000000) ? [20, 10, 45, 60] : [20, 10, 50, 75],
    label: {
      position: 'top',
      style: {
        fontWeight: setWidth <= 1024 ? 400 : 600,
        fill: '#0F0F1A',
        fontSize: fontSize
      },
      formatter: function formatter(datum, text) {
        if (arr1.length > 4) {
          for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
              if (arr1[i].xValues === arr2[j].xValues && parseFloat(arr1[i].value) === parseFloat(arr2[j].value)) {
                if (parseFloat(arr2[j].value) === parseFloat(datum.value)) {
                  if (text._origin.type === _GIATRITHUCHIENVN) return ''
                }
              }
            }
          }
        }
        return datum.value

      },
      offsetY: 10
    },
    xAxis: {
      label: {
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize
        },
      },
    },
    legend: {
      custom: _FALSE,
      position: 'bottom',
      offsetY: 35,
      itemName: {
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize,
        }
      }
    },
    tooltip: {
      customContent: (title, items) => {
        return (
          <div className="tooltip-line-bar" style={{ padding: '10px 10px' }}>
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
                      <span className="g2-tooltip-list-item-value" style={{ color: item.color, fontSize: fontSize }}>
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
  }

  return { ...config, ...configChartColumns };
}

export default configColumns;