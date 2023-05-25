import { Image } from 'antd';
import icUp from '../../../shared/assets/images/arrow-up.svg';
import icDown from '../../../shared/assets/images/arrow-down.svg';
import { _FALSE, _TRUE } from 'constant';

function SummaryItem(props) {
  const { periodData, typePeriods, title } = props;

  const isHigherThanPRate = (percentage, alertRate) => {
    const percent = percentage.replace('%', '');
    return Number(percent) > Number(alertRate) ? _TRUE : _FALSE;
  };
  return (
    <>
      {periodData.periods !== undefined && periodData.periods !== null && (
        <div className="summary sltp--pie-chart-item">
          <h5>{title}</h5>
          <div className="summary-header">
            <span></span>
            <span>Tháng</span>
            <span>So với cùng kỳ năm ngoái</span>
            <span>Lũy kế</span>
            <span>So với cùng kỳ năm ngoái</span>
          </div>
          {periodData.periods.map((period, index) => (
            <div className={"period-item period-item-" + index} key={index}>
              <span className="p-name">{period.pName}</span>
              <span className="p-value">
                {period.pValue}
              </span>
              <span className="p-rate">
                <div className="period-item--wrapper">
                  {typePeriods === 1 ? (
                    period.pPositive && period.pRate !== '0%' ? (
                      <>
                        <Image preview={_FALSE} src={icUp} alt="up" />
                        <span
                          className={`statical-percentage ${isHigherThanPRate(period.pRate, periodData.alertRateIncrease)
                            ? 'color-red'
                            : ''
                            }`}
                        >
                          {period.pRate}
                        </span>
                      </>
                    ) : period.pRate !== '0%' ? (
                      <>
                        <Image preview={_FALSE} src={icDown} alt="down" />
                        <span
                          className={`statical-percentage ${isHigherThanPRate(period.pRate, periodData.alertRateDecrease)
                            ? 'color-blue'
                            : ''
                            } `}
                        >
                          {period.pRate}
                        </span>
                      </>
                    ) : (
                      <>
                        <Image preview={_FALSE} />
                        <span className="statical-percentage"></span>
                      </>
                    )
                  ) : period.pPositive && period.pRate !== '0%' ? (
                    <>
                      <Image
                        preview={_FALSE}
                        src={icDown}
                        alt="down"
                        style={{ transform: 'rotate(180deg)' }}
                      />
                      <span
                        className={`statical-percentage ${isHigherThanPRate(period.pRate, periodData.alertRateIncrease)
                          ? 'color-blue'
                          : ''
                          }`}
                      >
                        {period.pRate}
                      </span>
                    </>
                  ) : period.pRate !== '0%' ? (
                    <>
                      <Image
                        preview={_FALSE}
                        src={icUp}
                        alt="up"
                        style={{ transform: 'rotate(180deg)' }}
                      />
                      <span
                        className={`statical-percentage ${isHigherThanPRate(period.pRate, periodData.alertRateDecrease)
                          ? 'color-red'
                          : ''
                          }`}
                      >
                        {period.pRate}
                      </span>
                    </>
                  ) : (
                    <>
                      <Image preview={_FALSE} />
                      <span className="statical-percentage"></span>
                    </>
                  )}
                </div>
              </span>
              <span className="p-luyke">{period.pAValue}</span>
              <span className="p-luyke-rate">
                <div className="period-item--wrapper">
                  {typePeriods === 1 ? (
                    period.pAPositive && period.pARate !== '0%' ? (
                      <>
                        <Image preview={_FALSE} src={icUp} alt="up" />
                        <span
                          className={`statical-percentage ${isHigherThanPRate(period.pARate, periodData.alertRateIncrease)
                            ? 'color-red'
                            : ''
                            }`}
                        >
                          {period.pARate}
                        </span>
                      </>
                    ) : period.pARate !== '0%' ? (
                      <>
                        <Image preview={_FALSE} src={icDown} alt="down" />
                        <span
                          className={`statical-percentage ${isHigherThanPRate(period.pARate, periodData.alertRateDecrease)
                            ? 'color-blue'
                            : ''
                            } `}
                        >
                          {period.pARate}
                        </span>
                      </>
                    ) : (
                      <>
                        <Image preview={_FALSE} />
                        <span className="statical-percentage"></span>
                      </>
                    )
                  ) : period.pAPositive && period.pARate !== '0%' ? (
                    <>
                      <Image
                        preview={_FALSE}
                        src={icDown}
                        alt="down"
                        style={{ transform: 'rotate(180deg)' }}
                      />
                      <span
                        className={`statical-percentage ${isHigherThanPRate(period.pARate, periodData.alertRateIncrease)
                          ? 'color-blue'
                          : ''
                          }`}
                      >
                        {period.pARate}
                      </span>
                    </>
                  ) : period.pARate !== '0%' ? (
                    <>
                      <Image
                        preview={_FALSE}
                        src={icUp}
                        alt="up"
                        style={{ transform: 'rotate(180deg)' }}
                      />
                      <span
                        className={`statical-percentage ${isHigherThanPRate(period.pARate, periodData.alertRateDecrease)
                          ? 'color-red'
                          : ''
                          }`}
                      >
                        {period.pARate}
                      </span>
                    </>
                  ) : (
                    <>
                      <Image preview={_FALSE} />
                      <span className="statical-percentage"></span>
                    </>
                  )}
                </div>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SummaryItem;
