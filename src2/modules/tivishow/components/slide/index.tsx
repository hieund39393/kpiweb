import { memo, useMemo } from 'react';
import RangeItem from './rangeItem';
import SlideItem from './slideItem';

function Slide(props) {
  const { data, Slider, sliderRef, setting } = props;

  const renderData = useMemo(() => {
    return (
      <Slider ref={sliderRef} {...setting}>
        {
          data.map((element: { title; charts; isRow; periodData; isTable; groupName; group }, index) => {
            if (element.group === 1) {
              return <RangeItem dataLevel3={element?.charts} index={index} />
            } else {
              return (
                element.charts.map((row, line) => {
                  return (
                    <SlideItem
                      key={line}
                      parentTitle={element.title}
                      title={row.title}
                      increaseAlertRate={row.periodData?.alertRateIncrease}
                      decreaseAlertRate={row.periodData?.alertRateDecrease}
                      dataPeriods={row.periodData?.periods}
                      typePeriods={row.periodData?.alertType}
                      dataLv3Item={row?.charts}
                    />
                  );
                })
              );
            }
          })}
      </Slider>
    )
    // eslint-disable-next-line
  }, [data, Slider, sliderRef, setting.slidesToShow])

  return renderData
}

export default memo(Slide);