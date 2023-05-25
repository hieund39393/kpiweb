import { Image } from 'antd';
import icUp from '../../../shared/assets/images/arrow-up.svg';
import icDown from '../../../shared/assets/images/arrow-down.svg';
import { _FALSE, _TRUE } from 'constant';

function PeriodItem(props) {
  const { isPeriods, dataPeriods, typePeriods, increaseAlertRate, decreaseAlertRate } = props;

  const isHigherThanPRate = (percentage, alertRate) => {
    const percent = percentage.replace('%', '');
    return Number(percent) > Number(alertRate) ? _TRUE : _FALSE;
  };

  return isPeriods ? (
    <div className="box-statistical chart-content">
      <div className="box-statistical--content">
        {dataPeriods.map((item, index) => (
          <div className="box-statistical--child" key={index}>
            <h5>{item.pName}</h5>
            <h3>{item.pValue}</h3>
            <span className="period-item--wrapper">
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
                  <Image src={icDown} preview={_FALSE} alt="down" style={{ transform: 'rotate(180deg)' }} />
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
        ))}
      </div>
    </div>
  ) : null;
}

export default PeriodItem;