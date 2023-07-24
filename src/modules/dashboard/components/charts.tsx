import { memo, useEffect, useState } from 'react';
// import Periods from '../../../core/components/charts/periods';
import { _PAGEINDEX } from 'constant';
import ChartService from '../services/ChartService';
// import { BoChiTieu } from '../dtos/responses/ChartResponse';

//Styling
import '../assets/css/style.css';
import '../assets/css/Filter.css';
import '../assets/css/Period.css';
import '../assets/css/PeriodItem.css';
import '../assets/css/Line.css';
import '../assets/css/Table.css';
import '../assets/css/Speedometer.css';
import '../assets/css/TopLowHigh.css';
import '../assets/css/Pie.css';
import '../assets/css/Bar.css';
import Periods from './periods';
import { _CTDOTINCAYID, _SPEEDOMETERSTRING } from 'constant/chart';
import RangeItem from './barRange/rangeItem';

const chartService = ChartService.instance();

function Charts(props) {
  const {
    donViID,
    ngayBaoCao,
    fetchAt,
    indicatorsLevel,
    boChiTieuDisplayID,
    setIsChange,
    isChange,
    chiTieuId,
    chiTieuChaId,
  } = props;
  const [arrTongHop, setArrTongHop] = useState<Array<[]>>([]);
  const [arrToanPhan, setArrToanPhan] = useState<Array<[]>>([]);
  const [arrPhanPhoi, setArrPhanPhoi] = useState<Array<[]>>([]);
  const [arrSauMienTru, setArrSauMienTru] = useState<Array<[]>>([]);
  const [tongHop, setTongHop] = useState(false);
  const [toanPhan, setToanPhan] = useState(false);
  const [phanPhoi, setPhanPhoi] = useState(false);
  const [sauMienTru, setSauMienTru] = useState(false);
  const [countTongHop, setCountTongHop] = useState(0);
  const [countToanPhan, setCountToanPhan] = useState(0);
  const [countPhanPhoi, setCountPhanPhoi] = useState(0);
  const [countSauMienTru, setCountSauMienTru] = useState(0);
  //data
  const [dataChartLevel2, setDataChartLevel2] = useState<Array<any>>([]);

  const fetchDataChartLevel2 = (chiTieu, chiTieuId) => {
    const request = {
      chiTieuID: chiTieu.id,
      chiTieuConId: chiTieuId,
      donViID: donViID,
      ngayBaoCao: ngayBaoCao,
      pageIndex: _PAGEINDEX,
      pageSize: 100,
      tanSuat: chiTieuId === 43 ? 'd' : null,
    };

    return chartService
      .getDataChartLevel2(request)
      .then((res) => {
        if (res.statusCode === 200 && res.data.charts.length > 0) {
          res.data.isTable = chiTieu.isTable;
          return res.data;
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    let arrTongHop: any = [];
    let arrToanPhan: any = [];
    let arrPhanPhoi: any = [];
    let arrSauMienTru: any = [];
    let countTongHop: number = 0;
    let countToanPhan: number = 0;
    let countPhanPhoi: number = 0;
    let countSauMienTru: number = 0;
    indicatorsLevel &&
      Promise.all(
        indicatorsLevel.map((element) => {
          if (element.id === chiTieuChaId) {
            return fetchDataChartLevel2(element, chiTieuId);
          }
        })
      ).then((data: any) => {
        // eslint-disable-next-line
        data.map((item) => {
          if (item?.ctid === _CTDOTINCAYID) {
            // eslint-disable-next-line
            item.charts.map((item) => {
              if (item.id === 40 || item.id === 39 || item.id === 41) {
                if (item.charts[0].type !== _SPEEDOMETERSTRING) setTongHop(false);
                else setTongHop(true);
                arrTongHop.push(item);
              }
              if (item.id === 127 || item.id === 126 || item.id === 128) {
                if (item.charts[0].type !== _SPEEDOMETERSTRING) setToanPhan(false);
                else setToanPhan(true);
                arrToanPhan.push(item);
              }
              if (item.id === 130 || item.id === 129 || item.id === 131) {
                if (item.charts[0].type !== _SPEEDOMETERSTRING) setPhanPhoi(false);
                else setPhanPhoi(true);
                arrPhanPhoi.push(item);
              }
              if (item.id === 120 || item.id === 119 || item.id === 121) {
                if (item.charts[0].type !== _SPEEDOMETERSTRING) setSauMienTru(false);
                else setSauMienTru(true);
                arrSauMienTru.push(item);
              }
            });

            setArrTongHop(arrTongHop);
            setArrToanPhan(arrToanPhan);
            setArrPhanPhoi(arrPhanPhoi);
            setArrSauMienTru(arrSauMienTru);
          }
        });
        setDataChartLevel2(data);

        arrTongHop.map((item) => {
          item.charts.map((el) => {
            if (el.type === _SPEEDOMETERSTRING) countTongHop++;
            return countTongHop;
          });
          return arrTongHop;
        });
        arrToanPhan.map((item) => {
          item.charts.map((el) => {
            if (el.type === _SPEEDOMETERSTRING) countToanPhan++;
            return countToanPhan;
          });
          return arrToanPhan;
        });
        arrPhanPhoi.map((item) => {
          item.charts.map((el) => {
            if (el.type === _SPEEDOMETERSTRING) countPhanPhoi++;
            return countPhanPhoi;
          });
          return arrPhanPhoi;
        });
        arrSauMienTru.map((item) => {
          item.charts.map((el) => {
            if (el.type === _SPEEDOMETERSTRING) countSauMienTru++;
            return countSauMienTru;
          });
          return arrSauMienTru;
        });
        setCountTongHop(countTongHop);
        setCountToanPhan(countToanPhan);
        setCountPhanPhoi(countPhanPhoi);
        setCountSauMienTru(countSauMienTru);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicatorsLevel, fetchAt]);

  return (
    <div className="bct-data__charts">
      {dataChartLevel2.map(
        (element: { title; charts; isRow; periodData; isTable; ctid; group }, index) => {
          if (element?.group === 1) {
            return (
              <div className="page-setOfIndicators--content content-body" key={index}>
                <div className="content-title title-lv2">
                  <h2 id={element?.ctid} style={{ textAlign: 'center' }}>
                    {element?.title}
                  </h2>
                  <RangeItem dataLevel3={element?.charts} />
                </div>
              </div>
            );
          } else {
            let classTrungThe: string = '';
            if (element?.ctid === 'CT_23' && element?.charts[0]?.charts.length === 6)
              classTrungThe = 'sixLength';
            else if (element?.ctid === 'CT_23' && element?.charts[0]?.charts.length >= 8)
              classTrungThe = 'eightLength';
            else classTrungThe = '';
            return (
              element !== undefined && (
                // <div key={index}>
                <Periods
                  countTongHop={countTongHop}
                  countToanPhan={countToanPhan}
                  countPhanPhoi={countPhanPhoi}
                  countSauMienTru={countSauMienTru}
                  arrTongHop={arrTongHop}
                  arrToanPhan={arrToanPhan}
                  arrPhanPhoi={arrPhanPhoi}
                  arrSauMienTru={arrSauMienTru}
                  tongHop={tongHop}
                  toanPhan={toanPhan}
                  phanPhoi={phanPhoi}
                  sauMienTru={sauMienTru}
                  donViID={donViID}
                  ctId={element?.ctid}
                  ngayBaoCao={ngayBaoCao}
                  title={element?.title}
                  dataChartsLv3={element?.charts}
                  index={index}
                  boChiTieuDisplayID={boChiTieuDisplayID}
                  setIsChange={setIsChange}
                  isChange={isChange}
                  classTrungThe={classTrungThe}
                  key={index} // Thêm key vào đây
                />
              )
            );
          }
        }
      )}
    </div>
  );
}

export default memo(Charts);
