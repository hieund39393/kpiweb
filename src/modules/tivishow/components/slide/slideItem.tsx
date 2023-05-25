import { formatConfigChart } from 'core/utils/chartUtil';
import PeriodItem from './periodItem'
import SummaryItem from './summaryItem'
import LineChart from '../charts/line';
import DualAxesChart from '../charts/dualAxes';
import Gauge from '../charts/gauge';
import BarChart from '../charts/bar';
import BarColumn from '../charts/column';
import {
  _BARTOPHIGHESTSTRING, _BARTOPLOWESTSTRING, _BARTOPLUYKEHIGHESTSTRING, _BARTOPLUYKELOWESTSTRING, _SPEEDOMETERSTRING,
  _LINESTRING, _LINEBARSTRING, _BARSTRING, _PIESTRING, _VERTICAL, _UNITPHANTRAM, _TABLESTRING
} from 'constant/chart';
import { Col, Row, Table } from 'antd';
import BarHorizontalTivi from '../charts/bar/barHorizontal';
import TableChart from '../charts/table';

function SlideItem(props) {
  const { parentTitle, title, increaseAlertRate, decreaseAlertRate, dataPeriods, typePeriods, dataLv3Item } = props;

  if (dataLv3Item === null || dataLv3Item === undefined) return null;

  const configs = dataLv3Item.map((element) => {
    return formatConfigChart(element.type, element);
  });

  const isPeriods = dataPeriods !== undefined && dataPeriods !== null;

  const typeCharts = configs.map(x => x.typeChart);

  // const additionalData = configs.map(y => y.additionalData)

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'aName',
      key: 'aName',
      width: '50%',
    },
    {
      title: 'Công trình',
      dataIndex: 'aValue',
      key: 'aValue',
      width: '50%',
    },
  ];

  const classCustom = () => {
    if (isPeriods) {
      if (configs[0].typeChart === _LINEBARSTRING) return 'linebar-first'
      else if (configs[0].typeChart === _SPEEDOMETERSTRING) return 'speed-first'
    } else {
      if (configs[0].typeChart === _SPEEDOMETERSTRING) return 'speed-first'
      else if (typeCharts.includes(_BARTOPHIGHESTSTRING) ||
        typeCharts.includes(_BARTOPLOWESTSTRING) ||
        typeCharts.includes(_BARTOPLUYKEHIGHESTSTRING) ||
        typeCharts.includes(_BARTOPLUYKELOWESTSTRING)) return 'bartop-second'
      else if (configs[0].typeChart === _PIESTRING) return 'pie-first'
      else if (configs[0].typeChart === _LINEBARSTRING) return 'linebar-first'
    }
    return ""
  }

  const classItem = () => {
    if (isPeriods) return 'have-periods'
    else return 'not-periods'
  }

  const classLineBar = () => {
    if (configs.lenght >= 2) {
      // eslint-disable-next-line
      configs.map(el => {
        if (el.typeChart === _LINEBARSTRING) return 'linebarOneRow'
      })
    } else return ''
  }

  const classLength = () => {
    let length = configs.length
    switch (length) {
      case 1:
        return 'chart-one-row one-chart'
      case 2:
        return 'chart-one-row two-chart'
      case 3:
        return 'chart-two-row three-chart'
      case 4:
        return 'chart-two-row four-chart'
      case 5:
        return 'chart-three-row five-chart'
      case 6:
        return 'chart-three-row six-chart'
      default:
        return 'chart-one-row one-chart'
    }
  }

  const renderHeaderChart = (value, unit, title) => {
    if (value !== '') {
      return (
        <div className="title-chart-linebar">
          <div className="linebar-header">
            <span>Giá trị kế hoạch: </span>
            <span>{unit === _UNITPHANTRAM ? (value + '' + unit) : (value + ' ' + unit)}</span>
          </div>
          <h2 className="content-title">{title}</h2>
        </div>
      )
    } else return (
      <h2 className="content-title">{title}</h2>
    )
  }

  return (
    <div className={`statistical ${classItem()} ${classLineBar()}`}>
      <div className="title-full-width">
        <div className="title-group">
          <div className="title-parent">{parentTitle}</div>
          <div className="title-line">{title}</div>
        </div>
      </div>
      <div className={`content-full-width ${classCustom()}`}>
        <PeriodItem
          isPeriods={isPeriods}
          dataPeriods={dataPeriods}
          typePeriods={typePeriods}
          increaseAlertRate={increaseAlertRate}
          decreaseAlertRate={decreaseAlertRate}
        />

        {configs.map((el, index) => {
          if (el === undefined) return null;
          if (el.typeChart === _TABLESTRING) {
            return (
              <div key={index}>
                <TableChart
                  dataTable={el}
                  length={configs.length}
                />
              </div>
            );
          } else if (el.typeChart === _SPEEDOMETERSTRING) {
            return (
              <>
                {
                  el.additionalData && el.additionalData.length ?
                    <>
                      <div key={index} className={`speedometer-box chart-content border-right ${classLength()}`}>
                        <h2 className="content-title">{el.title}</h2>
                        <span style={{ textAlign: "center" }}>Đơn vị: {el.unit}</span>
                        <Row gutter={24}>
                          <Col span={16}>
                            <Gauge config={el.data} />
                          </Col>
                          <Col span={8}>
                            <div key={index} className="chart-speedometer-table">
                              <Table
                                className="table-list-tivishow"
                                columns={columns}
                                dataSource={el.additionalData}
                                pagination={false}
                              />
                            </div>
                          </Col>
                        </Row>

                      </div>

                    </>
                    : <div key={index} className={`speedometer-box chart-content ${classLength()}`}>
                      <h2 className="content-title">{el.title}</h2>
                      <span style={{ textAlign: "center" }}>Đơn vị: {el.unit}</span>
                      <Gauge config={el.data} />
                    </div>
                }
              </>
            )
          } else if ([_BARTOPLOWESTSTRING, _BARTOPLUYKELOWESTSTRING, _BARTOPHIGHESTSTRING, _BARTOPLUYKEHIGHESTSTRING].includes(el.typeChart)) {
            return el.order === 1 ? (
              <div key={index} className={`low-high-box chart-content ${classLength()}`}>
                <h2 className="content-title bar-top-title">{el.title}</h2>
                <BarChart config={el} />
              </div>
            ) : null
          } else if (el.typeChart === _PIESTRING) {
            return (
              <div key={index} className={`pie-chart chart-content ${classLength()} ${!isPeriods && configs.length === 1 ? "x3-width" : "x2-width"}`}>
                {/* <div className="pie-box">
                  <h2 className="content-title">{el.title}</h2>
                  <div style={{ textAlign: 'center' }}><span>Đơn vị: %</span></div>
                  <PieChart config={el} />
                </div> */}
                <SummaryItem
                  periodData={el.periodData}
                  unit={el.unit}
                  typePeriods={typePeriods}
                  increaseAlertRate={increaseAlertRate}
                  decreaseAlertRate={decreaseAlertRate}
                  title={el.title}
                />
              </div>
            );
          } else if (el.typeChart === _BARSTRING && el.align === _VERTICAL) {
            return (
              <div key={index} className={`bar-box chart-content ${classLength()}`}>
                {
                  renderHeaderChart(el.additionalTitle, el.unit, el.title)
                }
                <BarColumn config={el} />
              </div>
            )
          } else if (el.typeChart === _BARSTRING && el.align !== _VERTICAL) {
            return (
              <div key={index} className={`bar-box chart-content ${classLength()}`}>
                {
                  renderHeaderChart(el.additionalTitle, el.unit, el.title)
                }
                <BarHorizontalTivi config={el} />
              </div>
            )
          } else if (el.typeChart === _LINESTRING) {
            return <LineChart config={el} key={index} title={el.title} className={classLength()} />;
          } else if (el.typeChart === _LINEBARSTRING) {
            return <DualAxesChart config={el} key={index} title={el.title} className={classLength()} />;
          }

          return null;
        })}
      </div>
    </div>
  );
}

export default SlideItem;
