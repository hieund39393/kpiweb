import { useEffect, useState } from "react";
import { Image, Spin } from 'antd';
import {
  SortAscendingOutlined,
  SortDescendingOutlined
} from '@ant-design/icons';
import {
  _BARTOPHIGHESTSTRING,
  _BARTOPLOWESTSTRING,
  _BARTOPLUYKEHIGHESTSTRING,
  _BARTOPLUYKELOWESTSTRING,
  _SPEEDOMETERSTRING,
  _PIESTRING,
} from 'constant/chart';

import { formatConfigChart } from "core/utils/chartUtil";
import { _FALSE, _TRUE } from "constant";
import LazyLoad from 'react-lazyload';
import Bar from "core/components/charts/bar";

import icUp from '../../../modules/shared/assets/images/arrow-up.svg';
import icDown from '../../../modules/shared/assets/images/arrow-down.svg';
import BarChart from "modules/tivishow/components/charts/bar";

export default function CombineChart(props) {
  const { dataLv3Item, dataPeriods, typePeriods, increaseAlertRate, decreaseAlertRate, isDashboard } = props;
  const [sortAscending, setSortAscending] = useState(_TRUE);
  const configs = dataLv3Item.map((element) => {
    return formatConfigChart(element.type, element);
  });

  const isHigherThanPRate = (percentage, alertRate) => {
    const percent = percentage.replace('%', '');
    return Number(percent) >= Number(alertRate) ? _TRUE : _FALSE;
  };

  const renderPeriod = () => {
    return (
      <>
        {dataPeriods !== undefined && dataPeriods !== null && (
          <div className="box-statistical">
            <div className="box-statistical--content">
              {dataPeriods !== undefined &&
                dataPeriods.map((item, index) => (
                  <div className="box-statistical--child" key={index}>
                    <h5>{item.pName}</h5>
                    <div className={item.pRate !== '0%' && item.pRate !== '0' ? 'box-statistical--child--value' : 'box-statistical--child--not-value'}>
                      <h3>{item.pValue}</h3>
                      <span className="period-item--wrapper box-statistical--child--percent">
                        {typePeriods === 1 ? (
                          item.pPositive && item.pRate !== '0%' && item.pRate !== '0' ? (
                            <>
                              <Image preview={_FALSE} src={icUp} alt="up" />
                              <span
                                className={`statical-percentage ${isHigherThanPRate(item.pRate, increaseAlertRate) ? 'color-red' : ''
                                  }`}
                              >
                                {item.pRate}
                              </span>
                            </>
                          ) : item.pRate !== '0%' && item.pRate !== '0' ? (
                            <>
                              <Image preview={_FALSE} src={icDown} alt="down" />
                              <span
                                className={`statical-percentage ${isHigherThanPRate(item.pRate, decreaseAlertRate) ? 'color-blue' : ''
                                  } `}
                              >
                                {item.pRate}
                              </span>
                            </>
                          ) : (
                            <>
                              <Image preview={_FALSE} />
                              <span className="statical-percentage"></span>
                            </>
                          )
                        ) : item.pPositive && item.pRate !== '0%' && item.pRate !== '0' ? (
                          <>
                            <Image
                              preview={_FALSE}
                              src={icDown}
                              alt="down"
                              style={{ transform: 'rotate(180deg)' }}
                            />
                            <span
                              className={`statical-percentage ${isHigherThanPRate(item.pRate, increaseAlertRate) ? 'color-blue' : ''
                                }`}
                            >
                              {item.pRate}
                            </span>
                          </>
                        ) : item.pRate !== '0%' && item.pRate !== '0' ? (
                          <>
                            <Image
                              preview={_FALSE}
                              src={icUp}
                              alt="up"
                              style={{ transform: 'rotate(180deg)' }}
                            />
                            <span
                              className={`statical-percentage ${isHigherThanPRate(item.pRate, decreaseAlertRate) ? 'color-red' : ''
                                }`}
                            >
                              {item.pRate}
                            </span>
                          </>
                        ) : (
                          <>
                            <Image preview={_FALSE} />
                            <span className="statical-percentage"></span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderTitle = (title, chartType, unit) => {
    if (chartType === _SPEEDOMETERSTRING && unit) {
      return (
        <>
          <h3>{title}</h3>
          <h5>Đơn vị: {unit}</h5>
        </>
      );
    }

    if (chartType === _PIESTRING && unit) {
      return (
        <>
          <h3>{title}</h3>
          <h5>Đơn vị: %</h5>
        </>
      );
    }

    return (
      <>
        <h3>{title}</h3>
      </>
    );
  };

  const RenderMultipleColumnTopHighest = (parent, child, childIndex) => {
    return (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        <div
          key={childIndex}
          className={`page-setOfIndicators--charts page-setOfIndicators--charts-top `}
        >
          <LazyLoad placeholder={<Spin />}>
            <div key={childIndex} className="low-high-box">
              <h2 className="content-title">
                {renderTitle(child.title, child.typeChart, child.unit)}
              </h2>
              {
                isDashboard ? <div className="sort-button" onClick={() => setSortAscending(!sortAscending)}>
                  <SortDescendingOutlined />
                </div> : null
              }
              {
                isDashboard ? <Bar config={child} /> : <BarChart config={child} />
              }
            </div>
          </LazyLoad>
        </div>
      </>
    );
  };

  const RenderMultipleColumnTopLowest = (parent, child, childIndex) => {
    return (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        <div
          key={childIndex}
          className={`page-setOfIndicators--charts page-setOfIndicators--charts-top`}
        >
          <LazyLoad placeholder={<Spin />}>
            <div key={childIndex} className="low-high-box">
              <h2 className="content-title">
                {renderTitle(child.title, child.typeChart, child.unit)}
              </h2>
              {
                isDashboard ? <div className="sort-button" onClick={() => setSortAscending(!sortAscending)}>
                  <SortAscendingOutlined />
                </div> : null
              }
              {
                isDashboard ? <Bar config={child} /> : <BarChart config={child} />
              }
            </div>
          </LazyLoad>
        </div>
      </>
    );
  };


  useEffect(() => {
    // eslint-disable-next-line
    configs.forEach(conf => {
      if (conf.typeChart.indexOf("bartop") > -1) {
        if (conf.typeChart.indexOf("lowest") > -1 && conf.order === 1) {
          setSortAscending(_FALSE);
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="statistical">
      {
        configs.map((el, index) => {
          if (el === undefined) return null;
          if (
            el.typeChart === _BARTOPHIGHESTSTRING ||
            el.typeChart === _BARTOPLUYKEHIGHESTSTRING
          ) {
            return sortAscending === _TRUE && el.order === 1 ? RenderMultipleColumnTopHighest(configs, el, index) : null;
          } else if (
            el.typeChart === _BARTOPLOWESTSTRING ||
            el.typeChart === _BARTOPLUYKELOWESTSTRING
          ) {
            return sortAscending === _FALSE ? RenderMultipleColumnTopLowest(configs, el, index) : null;
          }
          return null;
        })
      }
    </div>
  )
}