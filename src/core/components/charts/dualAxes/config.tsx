import { _FALSE, _TRUE } from 'constant';
import { _BARSTRING, _COLUMN, _LINESTRING, _LUYKETHUCHIEN, _NAME, _NGAYDATAMAX, _NGAYDATPMAX, _NHIETDOCAONHATNGAYDATPMAX, _NHIETDONGAYDATAMAX, _TONTHATDIENNANGID, _TROUBLE, _TYPE, _VALUE, _XVALUES } from 'constant/chart';
import { getMaxLineChart, titleCase } from 'core/utils/utility';
import { formatBarData, formatItems } from '../bar/config';

const setWidth = window.innerWidth;
let fontSize = 18;
setWidth <= 1024 ? fontSize = 12 : setWidth >= 1025 && setWidth <= 1920 ? fontSize = 14 : setWidth >= 1921 && setWidth <= 2539 ? fontSize = 18 : setWidth >= 2540 && setWidth <= 3859 ? fontSize = 24 : fontSize = 32

export const formatTransformData = (data) => {
  const lineData = data.series.filter((e) => e.type === _LINESTRING);
  if (lineData.length <= 0) return [];
  const xData = data.xValues;

  if (lineData.length > 1) {
    let transformData: any[] = [];

    lineData.forEach((ldt) => {
      ldt.yValues.map(
        (el, index) =>
        (transformData = [
          ...transformData,
          {
            xValues: xData[index],
            trouble: Number(parseFloat(el)),
            name: ldt.name,
          },
        ])
      );
    });

    return transformData;
  } else {
    const transformData = lineData[0].yValues.map((el, index) => ({
      xValues: xData[index],
      trouble: Number(parseFloat(el)),
      name: lineData[0].name,
    }));

    return transformData;
  }
};

const formatColorLine = (data) => {
  const lineData = data.series.filter((e) => e.type === _LINESTRING);
  if (lineData.length <= 0) return '';
  let color: string[] = [];
  lineData.forEach((ldt) => {
    color.push(ldt.color);
  });
  return color;
};

const formatColorBar = (data) => {
  const barData = data.series.filter((e) => e.type === _BARSTRING);
  if (barData.length <= 0) return '';
  let color: string[] = [];
  barData.forEach((ldt) => {
    color.push(ldt.color);
  });
  return color;
};

const getLineAlias = (data) => {
  const lineData = data.series.filter((e) => e.type === _LINESTRING);
  return lineData.length <= 0 ? '' : lineData[0].name;
};

export const configChartDualAxes = (typeChart, data) => {
  const barData = formatBarData(data);
  const transformData = formatTransformData(data);
  const colorsBar = formatColorBar(data);
  const colorsLine = formatColorLine(data);
  const items = formatItems(data);

  const lineAlias = getLineAlias(data);

  let maxLimitColumn = 0;
  let minLimitColumn = 0;
  let maxLimitLine = 0;
  let minLimitLine = 0;

  // if(data.id == 89) debugger;
  let columnLimit = Math.max(...barData.map((x) => x[_VALUE]));
  // maxLimitColumn += maxLimitColumn * 0.1;
  maxLimitColumn = getMaxLineChart(columnLimit, 0.1, 4)
  minLimitColumn = Math.min(...barData.map((x) => x[_VALUE])) ?? 0;

  // if (minLimitColumn < 0 || (minLimitColumn > 10 && maxLimitColumn * 0.3 < minLimitColumn)) {
  //   minLimitColumn = minLimitColumn - maxLimitColumn * 0.3;
  // }

  if (transformData && transformData.length > 0) {
    let lineLimit = Math.max(...transformData.map((x) => x[_TROUBLE]));
    maxLimitLine = getMaxLineChart(lineLimit, 0.1, 4)
    // maxLimitLine += maxLimitLine * 0.1;
    // if (maxLimitLine === 0) maxLimitLine += 0;
    // else if (maxLimitLine > 0 && maxLimitLine < 1) maxLimitLine = 1
    // else if (maxLimitLine >= 1 && maxLimitLine <= 4) maxLimitLine = 4
    // else if (maxLimitLine >= 5 && maxLimitLine <= 10) maxLimitLine = 12
    // else if (maxLimitLine >= 11 && maxLimitLine <= 30) maxLimitLine = 36
    // else if (maxLimitLine >= 31 && maxLimitLine <= 60) maxLimitLine = 72
    // else if (maxLimitLine >= 61 && maxLimitLine <= 100) maxLimitLine = 120
    // else if (maxLimitLine >= 101 && maxLimitLine <= 300) maxLimitLine = 300
    // else if (maxLimitLine >= 301 && maxLimitLine <= 600) maxLimitLine = 600
    // else if (maxLimitLine >= 601 && maxLimitLine <= 1000) maxLimitLine = 1296
    // else if (maxLimitLine >= 1001 && maxLimitLine <= 2000) maxLimitLine = 2100
    // else if (maxLimitLine >= 2001 && maxLimitLine <= 2800) maxLimitLine = 3000
    // else if (maxLimitLine >= 2801 && maxLimitLine <= 7776) maxLimitLine = 7776
    // else if (maxLimitLine >= 7777) maxLimitLine = 46656
    // else maxLimitLine = 279936;
    if (maxLimitColumn < maxLimitLine) {
      maxLimitColumn = maxLimitLine;
      // eslint-disable-next-line
    } else maxLimitColumn = maxLimitColumn

    // minLimitLine = Math.min(...transformData.map((x) => x[_TROUBLE]));

    // minLimitLine = Number(minLimitLine) ? minLimitLine : 0;

    if (minLimitLine < 0 || (minLimitLine > 10 && maxLimitLine * 0.3 < minLimitLine)) {
      minLimitLine = minLimitLine - minLimitLine * 0.3;
    }

    if (minLimitColumn < minLimitLine) {
      minLimitLine = minLimitColumn;
    } else if (minLimitColumn > minLimitLine) {
      minLimitColumn = minLimitLine;
    }
  }

  // let lengthData: number = 0;
  // if (barData.length > transformData.length) lengthData = barData.length
  // else lengthData = transformData.length

  // let dataLength: number = 0;
  // if (lengthData >= 13) dataLength = lengthData / 2
  // else dataLength = lengthData

  let selected = {
    'Giá trị thực hiện': false
  }
  if (data.id === _TONTHATDIENNANGID) {
    selected = {
      'Giá trị thực hiện': false
    };
  } else {
    selected = {
      'Giá trị thực hiện': true
    }
  }

  const configChart = {
    additionalTitle: data?.additionalTitle,
    typeChart: typeChart,
    title: data.title,
    unit: data.unit,
    layout: data.layout,
    width: 300,
    padding: setWidth <= 576 ? [10, 15, 25, 25] : setWidth >= 577 && setWidth <= 1024 ? [10, 15, 30, 20] : setWidth >= 1025 && setWidth <= 1200 ? [10, 5, 25, 20] : [12, 20, 30, 40],
    // maxLimitColumn: maxLimitColumn,
    // minLimitLine: minLimitLine,
    showX2: data.showX2,
    dataConfig: data,
    dataXValues: data.xValues,
    data: [barData, transformData, transformData],
    dataID: data.id,
    xField: _XVALUES,
    yField: [_VALUE, _TROUBLE],
    label: {
      style: {
        fontWeight: setWidth <= 1024 ? 400 : 600,
        fill: '#0F0F1A',
        fontSize: fontSize
      },
    },
    yAxis: [
      {
        // trouble: false,
        nice: _TRUE,
        maxLimit: maxLimitColumn,
        sync: _TRUE,
        minLimit: minLimitColumn < minLimitLine ? minLimitColumn : minLimitLine,
        label: {
          position: 'top',
          formatter: function formatter(datum) {
            return Number(parseFloat(datum).toFixed(2))
            // var yValue = 0;

            // if (datum >= 1 || datum <= -1) {
            //   if (
            //     (barData.every((bd) => Number.isInteger(bd[_VALUE])) &&
            //       transformData.every((td) => Number.isInteger(td[_TROUBLE]))) ||
            //     datum >= 50
            //   ) {
            //     yValue = Math.round(datum);
            //   } else if (
            //     parseFloat(datum).toFixed(2).indexOf('.00') > -1 ||
            //     parseFloat(datum).toFixed(1).indexOf('.0') > -1
            //   ) {
            //     yValue = Number(parseFloat(datum).toFixed(0));
            //   } else yValue = Number(parseFloat(datum).toFixed(1));
            // } else if (
            //   parseFloat(datum).toFixed(2).indexOf('.00') > -1 ||
            //   parseFloat(datum).toFixed(1).indexOf('.0') > -1
            // ) {
            //   yValue = Number(parseFloat(datum).toFixed(0));
            // } else yValue = Number(parseFloat(datum).toFixed(3));

            // return yValue;
          },
          style: {
            fontWeight: setWidth <= 1024 ? 400 : 600,
            fill: '#0F0F1A',
            fontSize: fontSize,
          },
        },
      },
      {
        nice: _TRUE,
        label: {
          style: {
            opacity: 0,
            fontWeight: 500,
            fill: '#0F0F1A',
            fontSize: fontSize
          },
        },
        maxLimit: maxLimitColumn,
        minLimit: minLimitColumn,
      },
      // false
    ],
    xAxis: {
      label: {
        style: {
          fontWeight: setWidth <= 1024 ? 400 : 600,
          fill: '#0F0F1A',
          fontSize: fontSize
        },
        // autoRotate: true,
        // autoHide: false,
        // autoEllipsis: false,
        // formatter: ((dataLength <= 6 && setWidth <= 1440) || (dataLength <= 9 && setWidth > 1440)) ? (text, item, index) => {
        //   return 'Th.' + (index + 1);
        // } : (text, item, index) => {
        //   return text;
        // }
        formatter: (text, item, index) => {
          if (data.xValues.length > 6) {
            const convert = item.id.split(' ')
            if(text.includes("Tuần")){
              return 'Tuần ' + convert[1]
            }
            return 'Th.' + convert[1]
          }
          return text;
        }
      },
    },
    meta: {
      trouble: {
        alias: lineAlias,
      },
    },
    colorBar: colorsBar,
    colorLine: colorsLine,
    geometryOptions: [
      {
        geometry: _COLUMN,
        isGroup: true,
        seriesField: _TYPE,
        intervalPadding: -50,
        columnWidthRatio: 0.5,
        label: {
          position: 'top',
          offsetX: 0,
          offsetY: 7.5,
          style: {
            fontWeight: setWidth <= 1024 ? 400 : 600,
            fill: '#0F0F1A',
            fontSize: fontSize,
          },
        },
        color: colorsBar,
        dodgePadding: 3,
      },
      {
        geometry: _LINESTRING,
        color: colorsLine,
        label: {
          formatter: function formatter(datum) {
            if ((data.id === _TONTHATDIENNANGID && titleCase(datum.name) === _LUYKETHUCHIEN)
              || (titleCase(datum.name) === _NGAYDATPMAX) || (titleCase(datum.name) === _NHIETDOCAONHATNGAYDATPMAX)
              || (titleCase(datum.name) === _NGAYDATAMAX) || (titleCase(datum.name) === _NHIETDONGAYDATAMAX)
            ) {return Number(datum.trouble);}
            else{
              console.log("nga min  " + datum.name) ;
              return  Number(datum.trouble)
            } 
          },
          position: 'bottom',
          offsetX: 0,
          offsetY: 0,
          style: {
            fontWeight: setWidth <= 1024 ? 400 : 600,
            fill: '#0F0F1A',
            fontSize: fontSize,
            opacity: 1
          },
        },
        seriesField: _NAME,
      },
    ],
    legend: {
      custom: _FALSE,
      position: 'bottom',
      items,
      maxItemWidth: 250,
      offsetY: 8,
      itemName: {
        style: {
          fontWeight: 500,
          fill: '#0F0F1A',
          fontSize: fontSize
        },
      },
      selected: selected
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
                  <>
                    <span
                      key={item.name}
                      className="g2-tooltip-list-item"
                      data-index={index}
                      style={{ display: 'flex', alignItems: 'center', fontSize: fontSize }}
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
                  </>
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
