import SlideItem from "./slideItem";

export default function RangeItem(props) {
  const { dataLevel3, index } = props;

  return (
    <SlideItem
      key={index}
      parentTitle={dataLevel3[0].title}
      // title={dataLevel3[0].charts[1]?.title}
      increaseAlertRate={dataLevel3[0].periodData?.alertRateIncrease}
      decreaseAlertRate={dataLevel3[0].periodData?.alertRateDecrease}
      dataPeriods={dataLevel3[0].periodData?.periods}
      typePeriods={dataLevel3[0].periodData?.alertType}
      dataLv3Item={dataLevel3[0]?.charts}
    />
  )
}