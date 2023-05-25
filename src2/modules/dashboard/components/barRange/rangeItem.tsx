import { formatConfigChart } from "core/utils/chartUtil";
import { useEffect, useMemo, useState } from "react";
import { _FALSE, _TRUE } from "constant";
import { _BARTOPHIGHESTSTRING, _BARTOPLOWESTSTRING, _BARTOPLUYKEHIGHESTSTRING, _BARTOPLUYKELOWESTSTRING, _PIESTRING, _SPEEDOMETERSTRING, _TABLESTRING } from "constant/chart";
import TableChart from "core/components/charts/table";
import { Spin, Select } from 'antd';
import LazyLoad from 'react-lazyload';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import Bar from "core/components/charts/bar";


const { Option } = Select
function Range(props) {
  const { dataLevel3 } = props;

  const [data, setData] = useState<any>([])
  const [optionRange, setOptionRange] = useState<any>([])
  const [sortAscending, setSortAscending] = useState(true);
  const [topRange, setTopRange] = useState('');
  //gom tất cả các chart vào 1 arr
  function convertData() {
    let data: any = [];
    let option: any = []
    // eslint-disable-next-line
    dataLevel3.map((element: { charts: [] }) => {
      // eslint-disable-next-line
      element?.charts.map((el: { type, index }) => {
        if (el.index !== undefined && el.index !== '') option.push({ id: el.index, name: el.index })
        const configs = formatConfigChart(el.type, el)
        data.push(configs)

      })
    })
    const unique = option.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.name === v.name)) === i)
    setOptionRange(unique)
    setData(data)
    setTopRange(unique[0]?.name)
  }

  function changeTopRange(value) {
    setTopRange(value)
  }

  //render range topbar
  const selectOptionRange = useMemo(() => {

    return (
      <div className="option-range" style={{ textAlign: 'right', marginTop: '8px' }}>
        <Select defaultValue={topRange} onChange={changeTopRange} style={{ width: '200px', textAlign: 'center' }}>
          {
            optionRange && optionRange.length > 0 ?
              optionRange.map((item, index) => (
                <Option key={index} value={item.name}>{item.name}</Option>
              )) : null
          }
        </Select>
      </div>
    )
    // eslint-disable-next-line
  }, [topRange, optionRange])

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

  const RenderMultipleColumnTopHighest = (parent, child, childIndex, count) => {
    if (count === topRange) {
      return (
        <div className="top-bar-hightest">
          {selectOptionRange}
          <div
            key={childIndex}
            className={`page-setOfIndicators--charts page-setOfIndicators--charts-top`}
          >

            <LazyLoad placeholder={<Spin />}>
              <div key={childIndex} className="low-high-box">
                <h2 className="content-title">
                  {renderTitle(child.title, child.typeChart, child.unit)}
                </h2>
                <div className="sort-button" onClick={() => setSortAscending(!sortAscending)}>
                  <SortDescendingOutlined />
                </div>
                <Bar config={child} />
              </div>
            </LazyLoad>
          </div>
        </div>
      );
    } else return null


  };

  const RenderMultipleColumnTopLowest = (parent, child, childIndex, count) => {
    if (count === topRange) {
      return (
        <div className="top-bar-lowest">
          {selectOptionRange}
          {/* {childIndex === 0 ? renderPeriod() : null}
                {(isHeader !== '' && isHeader !== undefined) ? renderHeaderLineBar(isHeader, child.unit) : null} */}
          <div
            key={childIndex}
            className={`page-setOfIndicators--charts page-setOfIndicators--charts-top`}
          >
            <LazyLoad placeholder={<Spin />}>
              <div key={childIndex} className="low-high-box">
                <h2 className="content-title">
                  {renderTitle(child.title, child.typeChart, child.unit)}
                </h2>
                <div className="sort-button" onClick={() => setSortAscending(!sortAscending)}>
                  <SortAscendingOutlined />
                </div>
                <Bar config={child} />
              </div>
            </LazyLoad>
          </div>
        </div>
      );
    }
    else return null
  };


  useEffect(() => {
    convertData();

    data.forEach(conf => {
      if (conf.typeChart.indexOf("bartop") > -1) {
        if (conf.typeChart.indexOf("lowest") > -1 && conf.order === 1) {
          setSortAscending(_FALSE);
        }
      }
    });
    // eslint-disable-next-line
  }, [dataLevel3])

  return (
    <div className="range-charts" >
      {
        data && data.length ?
          <div className="range-charts--item ">
            {
              // eslint-disable-next-line
              data.map((el, index) => {
                if (el === undefined) return null;
                if (el.typeChart === _TABLESTRING) {
                  return <div key={index} className="table-charts">
                    <TableChart
                      dataTable={el}
                      typeChart={el.typeChart}
                    />
                  </div>
                } else if (
                  el.typeChart === _BARTOPHIGHESTSTRING ||
                  el.typeChart === _BARTOPLUYKEHIGHESTSTRING
                ) {
                  return sortAscending === _TRUE ? RenderMultipleColumnTopHighest(data, el, index, el.valueID) : null;
                } else if (
                  el.typeChart === _BARTOPLOWESTSTRING ||
                  el.typeChart === _BARTOPLUYKELOWESTSTRING
                ) {
                  return sortAscending === _FALSE ? RenderMultipleColumnTopLowest(data, el, index, el.valueID) : null;
                }
              })
            }
          </div>
          : null
      }

    </div>
  )
}

export default Range