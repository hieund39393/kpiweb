
import { Bar } from '@ant-design/charts';
import { Space, Button } from 'antd';
import { switchSliderOne, switchSliderTwo } from 'core/utils/utility';
import { useEffect, useState } from 'react';
import { configChartBarVertical } from './config';

function BarHorizontal(props) {
  const { setIsChange, isChange, config, renderTitle } = props;
  const configs = configChartBarVertical(config)
  const [showSliderLine, setShowSliderLine] = useState(setDefaultMonth());

  //render slider 6 tháng
  const checkRender = (value) => {
    let length = checkLengthData(configs);
    renderSixMonth(value, length)
    setIsChange(false)
  }

  //check length data
  const checkLengthData = (configs) => {
    return configs.monthLength.length
  }

  //hiển thị default 6 tháng
  function setDefaultMonth() {
    let defaultValue: number = 0
    if (configs.monthLength.length <= 6) defaultValue = 1
    else defaultValue = 2
    return defaultValue
  }

  //click slider
  const setHandler = (value) => {
    setShowSliderLine(value)
    checkRender(value)
  }

  //set slider hiển thị
  function renderSixMonth(value, length) {
    if (value === 1) {
      switchSliderOne(length, configs)
    } else {
      switchSliderTwo(length, configs)
    }
  }

  useEffect(() => {
    if (isChange) setShowSliderLine(2)
    checkRender(isChange ? 2 : showSliderLine)
    // eslint-disable-next-line
  }, [showSliderLine, isChange])
  return (
    <div className="line-box">
      <div className="chart-header-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="tag-chart"></div>
        <div className="content-title">{renderTitle(config.title, config.typeChart, config.unit)}</div>
        <div className="choice-display">
          {
            checkLengthData(config) <= 6 ? null :
              <Space direction="horizontal">
                <Button type="link" className="dis-chart prev-charts" onClick={() => setHandler(1)} disabled={showSliderLine === 1 ? true : false}></Button>
                <Button type="link" className="dis-chart next-charts" onClick={() => setHandler(2)} disabled={showSliderLine === 2 ? true : false}></Button>
              </Space>
          }
        </div>
      </div>
      <Bar {...configs} />
    </div>
  )
}

export default BarHorizontal;