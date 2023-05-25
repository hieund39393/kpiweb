import { _COLUMN, _LINESTRING, _LUYKETHUCHIEN, _NAME, _NGAYDATAMAX, _NGAYDATPMAX, _NHIETDOCAONHATNGAYDATPMAX, _NHIETDONGAYDATAMAX, _TONTHATDIENNANGID, _TYPE } from "constant/chart";
import { _TRUE } from 'constant';
import { titleCase } from "core/utils/utility";

function configChart(config) {
  const setWidth = window.innerWidth;

  let selected = {
    'Giá trị thực hiện': false
  }
  if (config.dataID === _TONTHATDIENNANGID) {
    selected = {
      'Giá trị thực hiện': false
    };
  } else {
    selected = {
      'Giá trị thực hiện': true
    }
  }
  // custom config
  const custom = {
    padding: [10, 30, 45, 35],
    xAxis: {
      label: {
        style: {
          fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
          fontWeight: 500,
          fill: '#0F0F1A',
        },
        formatter: (text, item, index) => {
          return text;
        }
      },
    },
    yAxis: [
      {
        nice: _TRUE,
        maxLimit: config.yAxis[0].maxLimit,
        sync: _TRUE,
        minLimit: config.yAxis[0].minLimit,
        label: {
          formatter: config.yAxis[0].label.formatter,
          style: {
            fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
            fontWeight: 500,
            fill: '#0F0F1A',
          }
        },
      },
      {
        nice: _TRUE,
        label: {
          formatter: config.yAxis[1].label.formatter,
          style: {
            fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
            opacity: config.yAxis[1].label.style.opacity,
            fontWeight: 500,
            fill: '#0F0F1A',
          },
        },
        maxLimit: config.yAxis[1].maxLimit,
        minLimit: config.yAxis[1].minLimit,
      },
      // false
    ],
    geometryOptions: [
      {
        geometry: _COLUMN,
        isGroup: true,
        seriesField: _TYPE,
        columnWidthRatio: 0.5,
        label: {
          position: "top",
          offsetX: 0,
          offsetY: 15,
          style: {
            fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
            fontWeight: 500,
            fill: '#0F0F1A',
          }
        },
        color: config.colorBar,
        dodgePadding: 5,
      },
      {
        geometry: _LINESTRING,
        color: config.colorLine,
        label: {
          formatter: function formatter(datum) {
            if ((config.dataID === _TONTHATDIENNANGID && titleCase(datum.name) === _LUYKETHUCHIEN)
              || (titleCase(datum.name) === _NGAYDATPMAX) || (titleCase(datum.name) === _NHIETDOCAONHATNGAYDATPMAX)
              || (titleCase(datum.name) === _NGAYDATAMAX) || (titleCase(datum.name) === _NHIETDONGAYDATAMAX)) return Number(datum.trouble);
            else return ''
          },
          position: "bottom",
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
            fontWeight: 500,
            fill: '#0F0F1A',
          }
        },
        seriesField: _NAME,
      },
    ],
    label: {
      style: {
        fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
        fontWeight: 500,
        fill: '#0F0F1A',
      },
    },
    legend: config.legend === false ? false :
      {
        ...config.legend,
        ...{
          offsetY: 0,
          maxItemWidth: 400,
          itemName: {
            style: {
              fontSize: setWidth <= 2539 ? 18 : setWidth >= 2540 && setWidth <= 3839 ? 24 : 32,
              fontWeight: 600,
              fill: '#0F0F1A',
            },
          },
          selected: selected
        }
      },
  }

  return { ...config, ...custom };
}

export default configChart;
