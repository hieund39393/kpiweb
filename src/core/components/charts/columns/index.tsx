import { Column } from '@ant-design/charts';
import { Space, Button } from 'antd';
import { _IDCONTACDICHVUKHACHHANG } from 'constant/chart';
import { switchSliderOne, switchSliderTwo } from 'core/utils/utility';
import { useEffect, useState } from 'react';
import configColumns from './config';
import {
  InfoCircleOutlined
} from '@ant-design/icons';
function BarHorizontal(props) {
  const { setIsChange, isChange, config, renderTitle, dataID, showDetails, showModalGiaiQuyet } = props;
  const [showSliderLine, setShowSliderLine] = useState(setDefaultMonth());

  //render slider 6 tháng
  const checkRender = (value) => {
    let length = checkLengthData(configColumn);
    renderSixMonth(value, length)
    setIsChange(false)
  }

  //check length data
  const checkLengthData = (configColumn) => {
    return configColumn.monthLength.length
  }

  //hiển thị default 6 tháng
  function setDefaultMonth() {
    let defaultValue: number = 0
    if (config.monthLength.length <= 6) defaultValue = 1
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
      switchSliderOne(length, config)
    } else {
      switchSliderTwo(length, config)
    }
  }

  useEffect(() => {
    if (isChange) setShowSliderLine(2)
    checkRender(isChange ? 2 : showSliderLine)
    // eslint-disable-next-line
  }, [showSliderLine, isChange])

  const configColumn = configColumns(config);
  return (
    <div className="line-box">
      <div className="chart-header-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="tag-chart"></div>
        <div className="content-title" style={{ display: 'flex', alignItems: 'center' }}>{renderTitle(config.title, config.typeChart, config.unit)}
          {(dataID === _IDCONTACDICHVUKHACHHANG && showDetails) ? <div className="ketqua-giaiquyet"><Button type="link"
            className="link-popup-detail button-closed button-giaiQuyet" onClick={showModalGiaiQuyet} icon={<InfoCircleOutlined />}>Chi tiết</Button></div>
            : null
          }
        </div>

        <div className="choice-display">
          {
            checkLengthData(configColumn) <= 6 ? null :
              <Space direction="horizontal">
                <Button type="link" className="dis-chart prev-charts" onClick={() => setHandler(1)} disabled={showSliderLine === 1 ? true : false}></Button>
                <Button type="link" className="dis-chart next-charts" onClick={() => setHandler(2)} disabled={showSliderLine === 2 ? true : false}></Button>
              </Space>
          }
        </div>
      </div>
      <Column {...configColumn} />
    </div>
  )
}

export default BarHorizontal;