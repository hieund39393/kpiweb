import { _TRUE } from 'constant';
import PeriodsItem from './item';
import {
  chartTypes,
  _CONGTACNGUNGGIAMCUNGCAPDIENTRUNGTHE,
  _DTCCCD,
  _IDCHARTGIAIQUYET,
  _IDSANLUONGDIENTHUONGPHAM,
  _SOTBACONGCONG,
  _SUCOLUOIDIEN110,
  _TINHHINHVANHANHDAYTAIID,
} from 'constant/chart';
import PieOneRow from '../speedOneRow';
import { titleCase } from 'core/utils/utility';
import { formatConfigChart } from 'core/utils/chartUtil';

function Periods(props) {
  const {
    arrTongHop,
    arrToanPhan,
    arrPhanPhoi,
    arrSauMienTru,
    donViID,
    ngayBaoCao,
    title,
    dataChartsLv3,
    index,
    boChiTieuDisplayID,
    ctId,
    setIsChange,
    isChange,
    classTrungThe,
    countTongHop,
    countToanPhan,
    countPhanPhoi,
    countSauMienTru,
  } = props;

  const renderLayoutClass = (parentTitle) => {
    if (parentTitle === chartTypes.congTacXuLyDien) return 'ctxlvphlld-layout--item-wrap';
    else if (ctId === _CONGTACNGUNGGIAMCUNGCAPDIENTRUNGTHE) return 'ctngccd-layout';
    else if (ctId === _SUCOLUOIDIEN110) return 'scld110-layout';
    else if (ctId === _TINHHINHVANHANHDAYTAIID) return 'thvhdt-layout';
    else if (ctId === _SOTBACONGCONG) return 'stbacc-layout';
    return '';
  };

  return (
    <div className="page-setOfIndicators--content content-body" key={index}>
      <div className="content-title title-lv2">
        <h2 id={ctId} style={{ textAlign: 'center' }}>
          {title}
        </h2>

        {titleCase(title) === _DTCCCD ? (
          <div className={titleCase(title) === _DTCCCD ? 'doTinCayCungCapDien' : ''}>
            {(arrTongHop && arrTongHop.length > 0) ||
            (arrSauMienTru && arrSauMienTru.length > 0) ? (
              <div className="speed-thtp">
                <div className="speed-tongHop">
                  {arrTongHop && arrTongHop.length > 0
                    ? arrTongHop.map((element, index) => {
                        return (
                          <PieOneRow
                            index={index}
                            dataLv3Item={element.charts}
                            countTongHop={countTongHop}
                          />
                        );
                      })
                    : null}
                </div>
                <div className="speed-toanPhan">
                  {arrSauMienTru || arrSauMienTru.length > 0
                    ? arrSauMienTru.map((element, index) => {
                        return (
                          <PieOneRow
                            index={index}
                            dataLv3Item={element.charts}
                            countSauMienTru={countSauMienTru}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}

            {arrPhanPhoi && arrPhanPhoi.length > 0 && arrToanPhan && arrToanPhan.length > 0 ? (
              <div className="speed-thtp">
                <div className="speed-smt">
                  {arrToanPhan && arrToanPhan.length > 0
                    ? arrToanPhan.map((element, index) => {
                        return (
                          <PieOneRow
                            index={index}
                            dataLv3Item={element.charts}
                            countToanPhan={countToanPhan}
                          />
                        );
                      })
                    : null}
                </div>
                <div className="speed-phanPhoi">
                  {arrPhanPhoi && arrPhanPhoi.length > 0
                    ? arrPhanPhoi.map((element, index) => {
                        return (
                          <PieOneRow
                            index={index}
                            dataLv3Item={element.charts}
                            countPhanPhoi={countPhanPhoi}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div key={index} className={`periods-item-wrap ${classTrungThe} ${renderLayoutClass(title)}`}>
        {dataChartsLv3.map((element, index) => {
          let idDienThuongPham: number = 0;
          if (element.id === _IDSANLUONGDIENTHUONGPHAM) idDienThuongPham = element.id;
          let idChiTieuSuCo: number = 0;
          if (element.showDetails === _TRUE) {
            idChiTieuSuCo = element.id;
          }
          let idChiTieuGiaiQuyet: number = 0;
          if (element.id === _IDCHARTGIAIQUYET) idChiTieuGiaiQuyet = _IDCHARTGIAIQUYET;

          const configs = element?.charts.map((element) => {
            return formatConfigChart(element.type, element);
          });
          return (
            <PeriodsItem
              key={element.id + index} // Add a unique "key" prop here
              index={index}
              parentTitle={title}
              increaseAlertRate={element.periodData?.alertRateIncrease}
              decreaseAlertRate={element.periodData?.alertRateDecrease}
              dataPeriods={element.periodData?.periods}
              typePeriods={element.periodData?.alertType}
              showDetails={element.showDetails}
              idChiTieuSuCo={idChiTieuSuCo}
              idChiTieuGiaiQuyet={idChiTieuGiaiQuyet}
              donViID={donViID}
              chiTieuEVNID={element.chiTieuEVNID}
              ngayBaoCao={ngayBaoCao}
              isRow={element.isRow}
              boChiTieuDisplayID={boChiTieuDisplayID}
              isHeader={element.additionalTitle !== '' ? element.additionalTitle : ''}
              idDienThuongPham={idDienThuongPham}
              setIsChange={setIsChange}
              isChange={isChange}
              configs={configs}
              ctId={ctId}
              // showModalDetail={showModalDetailHandler}
            />
          );
        })}
      </div>
    </div>
    // </div>
  );
}

export default Periods;
