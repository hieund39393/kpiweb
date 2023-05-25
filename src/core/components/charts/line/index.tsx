import { Line } from '@ant-design/charts';

function LineChart(props) {
  const { index, config, title } = props;

  // const [showSliderLine, setShowSliderLine] = useState(setDefaultMonth());

  // //hiển thị default 6 tháng
  // function setDefaultMonth() {
  //   let defaultValue: number = 0
  //   if (config.monthLength.length <= 6) defaultValue = 1
  //   else defaultValue = 2
  //   return defaultValue
  // }

  // //render slider 6 tháng
  // const checkRender = (value) => {
  //   let length = checkLengthData(config);
  //   renderSixMonth(value, length)
  // }

  // //check length data
  // const checkLengthData = (config) => {
  //   return config.monthLength.length
  // }

  // //click slider
  // const setHandler = (value) => {
  //   setShowSliderLine(value)
  //   checkRender(value)
  // }

  // //set slider hiển thị
  // function renderSixMonth(value, length) {
  //   if (value === 1) {
  //     switchSliderOne(length, config)
  //   } else {
  //     switchSliderTwo(length, config)
  //   }
  // }

  // useEffect(() => {
  //   checkRender(showSliderLine)
  //   // eslint-disable-next-line
  // }, [showSliderLine])

  return (
    <div key={index} className="page-setOfIndicators--charts page-setOfIndicators--charts-line">
      {/* <LazyLoad placeholder={<Spin />}> */}
      <div className="line-box">
        <div className="content-title">{title}</div>
        <Line {...config} />
      </div>
      {/* <div className="line-box">
        <div className="chart-header-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="tag-chart"></div>
          <div className="content-title">{title}</div>
          <div className="choice-display">
            {
              (checkLengthData(config) <= 6) ? null :
                <Space direction="horizontal">
                  <Button type="link" className="dis-chart prev-charts" onClick={() => setHandler(1)} disabled={showSliderLine === 1 ? true : false}></Button>
                  <Button type="link" className="dis-chart next-charts" onClick={() => setHandler(2)} disabled={showSliderLine === 2 ? true : false}></Button>
                </Space>
            }
          </div>
        </div>
        <Line {...config} /> */}
      {/* </LazyLoad> */}
    </div>
  );
}

export default LineChart;