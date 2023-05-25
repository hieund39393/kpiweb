import {
  _BARSTRING,
  _BARTOPHIGHESTSTRING,
  _BARTOPLOWESTSTRING,
  _BARTOPLUYKEHIGHESTSTRING,
  _BARTOPLUYKELOWESTSTRING,
  _LINEBARSTRING,
  _LINESTRING,
  _PIESTRING,
  _SPEEDOMETERSTRING,
  _TABLESTRING
} from 'constant/chart';
import { configChartBar, configChartBarTop } from 'core/components/charts/bar/config';
import { configChartDualAxes } from 'core/components/charts/dualAxes/config';
import { configChartLine } from 'core/components/charts/line/config';
import { configChartPie } from 'core/components/charts/pie/config';
import { configChartSpeed } from 'core/components/charts/speedOMeter/config';
import { configTable } from 'core/components/charts/table/config';

//switch các loại chart
export const formatConfigChart = (typeChart, data) => {
  switch (typeChart) {
    //chart line bar
    case _LINEBARSTRING: {
      const configChart = configChartDualAxes(typeChart, data);
      return configChart;
    }

    //chart bar
    case _BARSTRING: {
      const configChart = configChartBar(typeChart, data)
      return configChart;
    }

    //chart line
    case _LINESTRING: {
      const configChart = configChartLine(typeChart, data)
      return configChart;
    }

    //chart speedometer
    case _SPEEDOMETERSTRING: {
      const configChart = configChartSpeed(typeChart, data)
      return configChart;
    }

    //chart đặc biệt
    case _BARTOPHIGHESTSTRING:
    case _BARTOPLOWESTSTRING:
    case _BARTOPLUYKEHIGHESTSTRING:
    case _BARTOPLUYKELOWESTSTRING: {
      const configChart = configChartBarTop(typeChart, data)
      return configChart
    }

    //chart pie
    case _PIESTRING: {
      const configChart = configChartPie(typeChart, data)
      return configChart;
    }

    //table
    case _TABLESTRING: {
      const configChart = configTable(typeChart, data);
      return configChart;
    }

    default: {
      break;
    }
  }
};
