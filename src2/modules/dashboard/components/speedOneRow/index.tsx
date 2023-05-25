import { Spin } from 'antd';
import { Gauge } from '@ant-design/plots';
import LazyLoad from 'react-lazyload';

import { _SPEEDOMETERSTRING } from 'constant/chart';
import { formatConfigChart } from 'core/utils/chartUtil';
import { useMemo } from 'react';

export default function SpeedRow(props) {
  const { dataLv3Item, index, countTongHop, countSauMienTru, countPhanPhoi, countToanPhan } = props;
  const configs = dataLv3Item.map((element) => {
    return formatConfigChart(element.type, element);
  });

  const renderSpeed = useMemo(() => {
    if (configs[0].typeChart === _SPEEDOMETERSTRING) {
      return (
        <LazyLoad key={index} placeholder={<Spin />}>
          {
            configs.map((el, index) => {
              if (el.typeChart === _SPEEDOMETERSTRING) {
                return (
                  <div key={index} className="speedometer-box single-speedometer">
                    <h2 className="content-title">
                      <h3>{el.title}</h3>
                      <h5>Đơn vị: {el.unit}</h5>
                    </h2>
                    <Gauge {...el.data} />
                  </div>
                );
              } else return null;
            })}
        </LazyLoad>
      )
    } else return <></>
  }, [configs, index])
  return (
    <div className={`${countTongHop === 3 || countSauMienTru === 3 || countPhanPhoi === 3 || countToanPhan === 3
      ? 'speed-one-columns' : countTongHop === 2 || countSauMienTru === 2 || countPhanPhoi === 2 || countToanPhan === 2
        ? 'speed-one-columns-two-chart' : 'speed-one-columns-one-chart'}`}>
      {renderSpeed}
    </div>
  )
}