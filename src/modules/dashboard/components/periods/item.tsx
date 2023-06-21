import { memo, useEffect, useMemo, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Button, Image, Spin, Row, Col, Table } from 'antd';

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import icUp from '../../../../modules/shared/assets/images/arrow-up.svg';
import icDown from '../../../../modules/shared/assets/images/arrow-down.svg';
import { _FALSE, _PAGEINDEX, _PAGESIZE, _TRUE } from 'constant';

// import Gauge from '@ant-design/charts/es/plots/gauge';
import Bar from 'core/components/charts/bar';
import Column from 'core/components/charts/columns';
import ManyColumnsOneLine from 'core/components/charts/dualAxes';
import LineChart from 'core/components/charts/line';
import PieChart from 'core/components/charts/pie';

import ChiTietSuCo from 'modules/dashboard/modal/chiTietSuCo';
import DanhSachCongTrinh from 'modules/dashboard/modal/danhSachCongTrinh';
import ChartService from 'modules/dashboard/services/ChartService';
import { SuCoProps } from 'core/dtos/requests/ComponentRequest';
import {
  chartTypes,
  _BARSTRING,
  _BARTOPHIGHESTSTRING,
  _BARTOPLOWESTSTRING,
  _BARTOPLUYKEHIGHESTSTRING,
  _BARTOPLUYKELOWESTSTRING,
  _BOCHITIEUSUACHUALON,
  _CONGSUAT,
  _DOANHTHU,
  _DTCCCD,
  _GIADIENBINHQUANTHANGN,
  _GIATRITHUCHIEN,
  _HORIZONTAL,
  _IDCONTACDICHVUKHACHHANG,
  _IDKHOILUONGTBAMBACAOTHE,
  _IDSANLUONGDIENTHUONGPHAM,
  _LINEBARSTRING,
  _LINESTRING,
  _PIESTRING,
  _SANLUONGDIENTHUONGPHAM,
  _SPEEDOMETERSTRING,
  _SUCOLUOIDIENTRUNGTHE,
  _TABLESTRING,
  _TEXTMONTHDATA,
  _THREELENGTHCHART,
  _TONTHATDIENNANG,
  _TWOLENGTHCHART,
  _UNITPHANTRAM,
  _VERTICAL,
} from 'constant/chart';
import { titleCase } from 'core/utils/utility';
import BarHorizontal from 'core/components/charts/bar/barHorizontal';
import ChiTietGiaiQuyet from 'modules/dashboard/modal/chiTietGiaiQuyet';

import '../../assets/css/modal.css';
import TableChart from 'core/components/charts/table';
import { Gauge } from '@ant-design/plots';

const chartService = ChartService.instance();

function PeriodsItem(props) {
  const {
    parentTitle,
    dataPeriods,
    typePeriods,
    // showModalDetail,
    showDetails,
    idChiTieuSuCo,
    idChiTieuGiaiQuyet,
    increaseAlertRate,
    decreaseAlertRate,
    donViID,
    chiTieuEVNID,
    ngayBaoCao,
    isRow,
    isHeader,
    idDienThuongPham,
    setIsChange,
    isChange,
    configs,
    ctId,
  } = props;

  const [isShowChiTietSuCoModal, setShowChiTietSuCoModal] = useState(_FALSE);
  const [isShowDanhSachCongTrinhCoModal, setShowDanhSachCongTrinhModal] = useState(_FALSE);

  const [isModalVisible, setIsModalVisible] = useState(_FALSE);
  const [suCoDetail, setSuCoDetail] = useState<SuCoProps[]>([]);
  const [loaiSuCo, setLoaiSuCo] = useState('');
  const [tenSuCo, setTenSuCo] = useState('');
  const [totalSuCo, setTotalSuCo] = useState(0);
  const [chiTieuID, setChiTieuID] = useState(0);
  const [sortAscending, setSortAscending] = useState(_TRUE);
  const [ngaySuCo, setNgaySuCo] = useState([]);
  const [ngayGanNhat, setNgayGanNhat] = useState('');
  const chiTietSuCoHandler = async (id) => {
    const response = await chartService.listDetail({
      chiTieuID: id,
      chiTieuEVNID: chiTieuEVNID,
      donViID: donViID,
      ngay: ngayBaoCao,
      layNgayGanNhat: _TRUE,
      pageIndex: _PAGEINDEX,
      pageSize: _PAGESIZE,
    });

    if (response.data.suCo.chiTietSuCos) {
      setSuCoDetail(response.data.suCo.chiTietSuCos);
      setTotalSuCo(response.data.total);
      setLoaiSuCo(response.data.suCo.loaiSuCo);
      setTenSuCo(response.data.suCo.tenSuCo);
      if (response.data.suCo.chiTietSuCos.length > 0)
        setNgayGanNhat(response.data.suCo.chiTietSuCos[0].ngayXayRaSuCo);
      else setNgayGanNhat(ngayBaoCao);
    } else {
      setNgayGanNhat(ngayBaoCao);
      setSuCoDetail([]);
    }

    const responseNgaySuCo = await chartService.listNgaySuCo({
      chiTieuID: id,
      chiTieuEVNID: chiTieuEVNID,
      donViID: donViID,
      ngay: ngayBaoCao,
    });
    if (responseNgaySuCo.data) setNgaySuCo(responseNgaySuCo.data.ngayCoSuCos);
    else setNgaySuCo([]);

    setChiTieuID(id);
    setShowChiTietSuCoModal(_TRUE);
  };

  const closeChiTietSuCoModal = () => {
    setShowChiTietSuCoModal(_FALSE);
  };

  const closeDanhSachCongTrinhModal = () => {
    setShowDanhSachCongTrinhModal(_FALSE);
  };

  const cancalModalGiaiQuyet = () => {
    setIsModalVisible(_FALSE);
  };

  const showModalGiaiQuyet = () => {
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'aName',
      key: 'aName',
      width: '50%',
    },
    {
      title: 'Công trình',
      dataIndex: 'aValue',
      key: 'aValue',
      width: '50%',
    },
  ];

  const modal = useMemo(
    () =>
      isShowChiTietSuCoModal && (
        <ChiTietSuCo
          ngayGanNhat={ngayGanNhat}
          ngaySuCo={ngaySuCo}
          totalSuCo={totalSuCo}
          detail={suCoDetail}
          chiTieuID={chiTieuID}
          chiTieuEVNID={chiTieuEVNID}
          donViID={donViID}
          loaiSuCo={loaiSuCo}
          tenSuCo={tenSuCo}
          ngayBaoCao={ngayBaoCao}
          isShowModal={isShowChiTietSuCoModal}
          closeModal={closeChiTietSuCoModal}
        />
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isShowChiTietSuCoModal]
  );

  const handleOpenSanhSachCongTrinh = () => {
    setShowDanhSachCongTrinhModal(true);
  };

  const modalDanhSachCongTrinh = useMemo(
    () =>
      isShowDanhSachCongTrinhCoModal && (
        <DanhSachCongTrinh
          chiTieuID={idChiTieuSuCo}
          chiTieuEVNID={chiTieuEVNID}
          donViID={donViID}
          tenSuCo={tenSuCo}
          isShowModal={isShowDanhSachCongTrinhCoModal}
          closeModal={closeDanhSachCongTrinhModal}
        />
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isShowDanhSachCongTrinhCoModal]
  );

  useEffect(() => {
    // eslint-disable-next-line
    configs.forEach((conf) => {
      if (conf.typeChart.indexOf('bartop') > -1) {
        if (conf.typeChart.indexOf('lowest') > -1 && conf.order === 1) {
          setSortAscending(_FALSE);
        }
      }
    });
    // eslint-disable-next-line
  }, [configs]);

  const renderTitle = (title, chartType, unit) => {
    if (chartType === _SPEEDOMETERSTRING && unit) {
      return (
        <>
          <h3>{title}</h3>
          <h5>Đơn vị: {unit}</h5>
        </>
      );
    }

    if (chartType === _PIESTRING && unit) {
      return (
        <>
          <h3>{title}</h3>
          <h5>Đơn vị: %</h5>
        </>
      );
    }

    return (
      <>
        <h3>{title}</h3>
      </>
    );
  };

  const isHigherThanPRate = (percentage, alertRate) => {
    const percent = percentage.replace('%', '');
    return Number(percent) >= Number(alertRate) ? _TRUE : _FALSE;
  };

  const renderPeriod = () => {
    return (
      <>
        {dataPeriods !== undefined && dataPeriods !== null && (
          <div className="box-statistical">
            <div className="box-statistical--content">
              {dataPeriods !== undefined &&
                dataPeriods.map((item, index) => (
                  <div className="box-statistical--child" key={index}>
                    <h5>{item.pName}</h5>
                    <div
                      className={
                        item.pRate !== '0%' && item.pRate !== '0'
                          ? 'box-statistical--child--value'
                          : 'box-statistical--child--not-value'
                      }
                    >
                      <h3>{item.pValue}</h3>
                      <span className="period-item--wrapper box-statistical--child--percent">
                        {typePeriods === 1 ? (
                          item.pPositive && item.pRate !== '0%' && item.pRate !== '0' ? (
                            <>
                              <Image preview={_FALSE} src={icUp} alt="up" />
                              <span
                                className={`statical-percentage ${
                                  isHigherThanPRate(item.pRate, increaseAlertRate)
                                    ? 'color-red'
                                    : ''
                                }`}
                              >
                                {item.pRate}
                              </span>
                            </>
                          ) : item.pRate !== '0%' && item.pRate !== '0' ? (
                            <>
                              <Image preview={_FALSE} src={icDown} alt="down" />
                              <span
                                className={`statical-percentage ${
                                  isHigherThanPRate(item.pRate, decreaseAlertRate)
                                    ? 'color-blue'
                                    : ''
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
                            <Image
                              preview={_FALSE}
                              src={icDown}
                              alt="down"
                              style={{ transform: 'rotate(180deg)' }}
                            />
                            <span
                              className={`statical-percentage ${
                                isHigherThanPRate(item.pRate, increaseAlertRate) ? 'color-blue' : ''
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
                              className={`statical-percentage ${
                                isHigherThanPRate(item.pRate, decreaseAlertRate) ? 'color-red' : ''
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
                  </div>
                ))}
            </div>

            {showDetails && (
              <div className="box-statistical--detail">
                {idChiTieuSuCo === 19 ? (
                  <Button
                    data-id={idChiTieuSuCo}
                    onClick={() => chiTietSuCoHandler(idChiTieuSuCo)}
                    type="link"
                    className="link-popup-detail button-closed"
                    icon={<InfoCircleOutlined />}
                  >
                    Chi tiết
                  </Button>
                ) : idChiTieuSuCo === 101 ||
                  idChiTieuSuCo === 98 ||
                  idChiTieuSuCo === 99 ||
                  idChiTieuSuCo === 102 ? (
                  <Button
                    data-id={idChiTieuSuCo}
                    onClick={handleOpenSanhSachCongTrinh}
                    type="link"
                    className="link-popup-detail button-closed"
                    icon={<InfoCircleOutlined />}
                  >
                    Chi tiết
                  </Button>
                ) : null}
              </div>
            )}

            {modal}
            {modalDanhSachCongTrinh}
          </div>
        )}
      </>
    );
  };

  const renderSummary = (periodData, child, isTitle) => {
    return (
      <>
        {periodData.periods !== undefined && periodData.periods !== null && (
          <div className="summary sltp--pie-chart-item">
            {isTitle ? <h5>{child.title}</h5> : null}
            <div className="summary-header">
              <span></span>
              <span>Tháng</span>
              <span>So với cùng kỳ năm ngoái</span>
              <span>Lũy kế</span>
              <span>So với cùng kỳ năm ngoái</span>
            </div>
            {periodData.periods.map((period) => (
              <div className="period-item">
                <span className="p-name">{period.pName}</span>
                <span className="p-value">{period.pValue}</span>
                <span className="p-rate">
                  <div className="period-item--wrapper">
                    {typePeriods === 1 ? (
                      period.pPositive && period.pRate !== '0%' ? (
                        <>
                          <Image preview={_FALSE} src={icUp} alt="up" />
                          <span
                            className={`statical-percentage ${
                              isHigherThanPRate(period.pRate, periodData.alertRateIncrease)
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
                            className={`statical-percentage ${
                              isHigherThanPRate(period.pRate, periodData.alertRateDecrease)
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
                          className={`statical-percentage ${
                            isHigherThanPRate(period.pRate, periodData.alertRateIncrease)
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
                          className={`statical-percentage ${
                            isHigherThanPRate(period.pRate, periodData.alertRateDecrease)
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
                      period.pAPositive &&
                      period.pARate !== '0%' &&
                      period.pAPositive &&
                      period.pARate !== '0' ? (
                        <>
                          <Image preview={_FALSE} src={icUp} alt="up" />
                          <span
                            className={`statical-percentage ${
                              isHigherThanPRate(period.pARate, periodData.alertRateIncrease)
                                ? 'color-red'
                                : ''
                            }`}
                          >
                            {period.pARate}
                          </span>
                        </>
                      ) : period.pARate !== '0%' && period.pARate !== '0' ? (
                        <>
                          <Image preview={_FALSE} src={icDown} alt="down" />
                          <span
                            className={`statical-percentage ${
                              isHigherThanPRate(period.pARate, periodData.alertRateDecrease)
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
                    ) : period.pAPositive &&
                      period.pARate !== '0%' &&
                      period.pAPositive &&
                      period.pARate !== '0' ? (
                      <>
                        <Image
                          preview={_FALSE}
                          src={icDown}
                          alt="down"
                          style={{ transform: 'rotate(180deg)' }}
                        />
                        <span
                          className={`statical-percentage ${
                            isHigherThanPRate(period.pARate, periodData.alertRateIncrease)
                              ? 'color-blue'
                              : ''
                          }`}
                        >
                          {period.pARate}
                        </span>
                      </>
                    ) : period.pARate !== '0%' && period.pARate !== '0' ? (
                      <>
                        <Image
                          preview={_FALSE}
                          src={icUp}
                          alt="up"
                          style={{ transform: 'rotate(180deg)' }}
                        />
                        <span
                          className={`statical-percentage ${
                            isHigherThanPRate(period.pARate, periodData.alertRateDecrease)
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
  };

  const renderSingleGaunge = (parent, child, childIndex, bigSpeed) => {
    return (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        <div
          key={childIndex}
          id={
            child.additionalData && child.additionalData.length
              ? 'two-column-speedometer-box-table'
              : ''
          }
          className={`${
            child.layout === 1
              ? 'page-setOfIndicators--charts-speedometer'
              : 'page-setOfIndicators--two-column-charts-speedometer'
          } 
        
        ${isRow ? (parent.length > 1 ? 'small-speedometer row-item-pc' : 'medium-speedometer') : ''}
        page-setOfIndicators--charts ${bigSpeed}`}
        >
          <h2 className="content-title">{renderTitle(child.title, child.typeChart, child.unit)}</h2>
          <LazyLoad placeholder={<Spin />}>
            <div
              key={childIndex}
              className={`${child.layout === 1 ? 'speedometer-box' : 'two-column-speedometer-box'}`}
            >
              {child.additionalData && child.additionalData.length ? (
                <Row gutter={24}>
                  <Col span={16} className="dashboard-kt-speedmeter">
                    <Gauge {...child.data} />
                  </Col>
                  <Col span={8} className="dashboard-kt-table">
                    <Table
                      className="table-list-ct"
                      columns={columns}
                      dataSource={child.additionalData}
                      pagination={_FALSE}
                    />
                  </Col>
                </Row>
              ) : (
                <Gauge {...child.data} />
              )}
            </div>
          </LazyLoad>
        </div>
      </>
    );
  };

  const renderMultipleColumnGauge = (parent, child, childIndex, fullRow, removeSpeed) => {
    return isRow && fullRow && (child.additionalData && child.additionalData.length) === 0 ? (
      <div className="speedometer-no-table-row">
        {childIndex === 0 ? renderPeriod() : null}
        <div
          key={childIndex}
          id={
            child.additionalData && child.additionalData.length
              ? 'two-column-speedometer-box-table'
              : ''
          }
          className={`${
            child.layout === 1
              ? 'page-setOfIndicators--charts-speedometer'
              : 'page-setOfIndicators--two-column-charts-speedometer'
          } ${
            isRow
              ? parent.length > 3
                ? 'small-speedometer row-item-pc'
                : 'medium-speedometer'
              : ''
          } ${fullRow ? 'full-row-speedometer' : ''} page-setOfIndicators--charts 
            ${removeSpeed} ${
            titleCase(child.title) === 'boChiTieuSuaChuaLon' ? 'boChiTieuSuaChuaLon' : ''
          }`}
        >
          <h2 className="content-title">{renderTitle(child.title, child.typeChart, child.unit)}</h2>
          <LazyLoad placeholder={<Spin />}>
            <div
              key={childIndex}
              className={`${child.layout === 1 ? 'speedometer-box' : 'two-column-speedometer-box'}`}
            >
              {child.additionalData && child.additionalData.length ? (
                <Row gutter={24}>
                  <Col span={16} className="dashboard-kt-speedmeter">
                    <Gauge {...child.data} />
                  </Col>
                  <Col span={8} className="dashboard-kt-table">
                    <Table
                      className="table-list-ct"
                      columns={columns}
                      dataSource={child.additionalData}
                      pagination={_FALSE}
                    />
                  </Col>
                </Row>
              ) : (
                <Gauge {...child.data} />
              )}
            </div>
          </LazyLoad>
        </div>
      </div>
    ) : (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        <div
          key={childIndex}
          id={
            child.additionalData && child.additionalData.length
              ? 'two-column-speedometer-box-table'
              : ''
          }
          className={`${
            child.layout === 1
              ? 'page-setOfIndicators--charts-speedometer '
              : 'page-setOfIndicators--two-column-charts-speedometer'
          } ${
            isRow
              ? parent.length > 3
                ? 'small-speedometer row-item-pc'
                : 'medium-speedometer'
              : ''
          } ${fullRow ? 'full-row-speedometer' : ''} page-setOfIndicators--charts ${removeSpeed}`}
        >
          <h2 className="content-title">{renderTitle(child.title, child.typeChart, child.unit)}</h2>
          <LazyLoad placeholder={<Spin />}>
            <div
              key={childIndex}
              className={`${child.layout === 1 ? 'speedometer-box' : 'two-column-speedometer-box'}`}
            >
              {child.additionalData && child.additionalData.length ? (
                <Row gutter={24}>
                  <Col span={16} className="dashboard-kt-speedmeter">
                    <Gauge {...child.data} />
                  </Col>
                  <Col span={8} className="dashboard-kt-table">
                    <Table
                      className="table-list-ct"
                      columns={columns}
                      dataSource={child.additionalData}
                      pagination={_FALSE}
                    />
                  </Col>
                </Row>
              ) : (
                <Gauge {...child.data} />
              )}
            </div>
          </LazyLoad>
        </div>
      </>
    );
  };

  const RenderMultipleColumnLine = (parent, child, childIndex, fullRow) => {
    return (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        {isHeader !== '' && isHeader !== undefined
          ? renderHeaderLineBar(isHeader, child.unit)
          : null}
        <LineChart
          index={childIndex}
          parentTitle={parentTitle}
          config={child}
          title={renderTitle(child.title, child.typeChart, child.unit)}
        />
      </>
    );
  };

  const RenderMultipleColumnBar = (parent, child, childIndex, fullRow, additionalTitle) => {
    const min = child.monthLength[child.monthLength.length - child.monthLength.length];
    const max = child.monthLength[child.monthLength.length - 1];
    const convertMin = min.split(_TEXTMONTHDATA)[1];
    const convertMax = max.split(_TEXTMONTHDATA)[1];
    const convertYear = ngayBaoCao.split('-')[0];
    return (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        {additionalTitle === '' ? null : renderHeaderLineBar(additionalTitle, child.unit)}

        <div
          className={`page-setOfIndicators--charts page-setOfIndicators--charts-bar ${
            child.dataID === _IDCONTACDICHVUKHACHHANG ? 'congTacDichVu-giaiQuyet' : ''
          }`}
        >
          <LazyLoad placeholder={<Spin />}>
            <div className="bar-box">
              <Column
                setIsChange={setIsChange}
                isChange={isChange}
                config={child}
                renderTitle={renderTitle}
                dataID={child.dataID}
                showDetails={child.showDetails}
                showModalGiaiQuyet={showModalGiaiQuyet}
              />
            </div>
          </LazyLoad>
        </div>

        {isModalVisible ? (
          <ChiTietGiaiQuyet
            isShowModal={isModalVisible}
            closeModal={cancalModalGiaiQuyet}
            donViID={donViID}
            ngayBaoCao={ngayBaoCao}
            chiTieuID={idChiTieuGiaiQuyet}
            convertMin={convertMin}
            convertMax={convertMax}
            convertYear={convertYear}
          />
        ) : null}
      </>
    );
  };

  const RenderMultipleBarHorizontal = (parent, child, childIndex, fullRow, additionalTitle) => {
    return (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        {additionalTitle === '' ? null : renderHeaderLineBar(additionalTitle, child.unit)}
        <div
          className={`page-setOfIndicators--charts page-setOfIndicators--charts-bar ${
            child.dataID === 225 ? 'bar-horizontal-many' : 'bar-horizontal'
          }`}
        >
          <LazyLoad placeholder={<Spin />}>
            <div className="bar-box">
              <BarHorizontal
                setIsChange={setIsChange}
                isChange={isChange}
                config={child}
                renderTitle={renderTitle}
              />
            </div>
          </LazyLoad>
        </div>
      </>
    );
  };

  const RenderMultipleColumnTopHighest = (parent, child, childIndex, fullRow) => {
    return (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        {isHeader !== '' && isHeader !== undefined
          ? renderHeaderLineBar(isHeader, child.unit)
          : null}
        <div
          key={childIndex}
          className={`page-setOfIndicators--charts page-setOfIndicators--charts-top ${
            isRow ? 'top-no-mt' : ''
          }`}
        >
          <LazyLoad placeholder={<Spin />}>
            <div key={childIndex} className="low-high-box">
              <h2 className="content-title">
                {renderTitle(child.title, child.typeChart, child.unit)}
              </h2>
              <div className="sort-button" onClick={() => setSortAscending(!sortAscending)}>
                <SortDescendingOutlined />
              </div>
              <Bar config={child} />
            </div>
          </LazyLoad>
        </div>
      </>
    );
  };

  const RenderMultipleColumnTopLowest = (parent, child, childIndex, fullRow) => {
    return (
      <>
        {childIndex === 0 ? renderPeriod() : null}
        {isHeader !== '' && isHeader !== undefined
          ? renderHeaderLineBar(isHeader, child.unit)
          : null}
        <div
          key={childIndex}
          className={`page-setOfIndicators--charts page-setOfIndicators--charts-top ${
            isRow ? 'top-no-mt' : ''
          }`}
        >
          <LazyLoad placeholder={<Spin />}>
            <div key={childIndex} className="low-high-box">
              <h2 className="content-title">
                {renderTitle(child.title, child.typeChart, child.unit)}
              </h2>
              <div className="sort-button" onClick={() => setSortAscending(!sortAscending)}>
                <SortAscendingOutlined />
              </div>
              <Bar config={child} />
            </div>
          </LazyLoad>
        </div>
      </>
    );
  };

  const RenderMultipleColumnPie = (parent, child, childIndex, fullRow, isTitle) => {
    return (
      <div className="summary-pie-box">
        <div key={childIndex} className={`pie-chart pie-summary`}>
          <LazyLoad placeholder={<Spin />} className="pie-lazyload">
            {renderSummary(child.periodData, child, isTitle)}
          </LazyLoad>
        </div>
      </div>
      // <div className="pie-box-wrapper">
      //   <div key={childIndex} className={`pie-chart pie-content`}>
      //     <LazyLoad placeholder={<Spin />} className="pie-lazyload">
      //       <PieChart
      //         config={child}
      //         key={childIndex}
      //         title={renderTitle(child.title, child.typeChart, child.unit)}
      //       />
      //     </LazyLoad>
      //   </div>
      //   <div key={childIndex} className={`pie-chart pie-summary`}>
      //     <LazyLoad placeholder={<Spin />} className="pie-lazyload">
      //       {renderSummary(child.periodData, child.unit)}
      //     </LazyLoad>
      //   </div>
      // </div>
    );
  };

  const renderHeaderLineBar = (value, unit) => {
    return (
      <div className="linebar-header">
        <span>Giá trị kế hoạch: </span>
        <span>{unit === _UNITPHANTRAM ? value + '' + unit : value + ' ' + unit}</span>
      </div>
    );
  };

  const RenderMultipleColumnLineBar = (parent, child, childIndex, fullRow, additionalTitle) => {
    return (
      <>
        {childIndex === 0 && renderPeriod()}
        {additionalTitle === '' ? null : renderHeaderLineBar(additionalTitle, child.unit)}
        <div
          key={childIndex}
          className={`page-setOfIndicators--charts page-setOfIndicators--charts-line ${
            parent[1].typeChart === _SPEEDOMETERSTRING ? 'ctxlvphlld-layout--general-charts' : ''
          }`}
        >
          <LazyLoad placeholder={<Spin />}>
            <ManyColumnsOneLine
              config={child}
              key={childIndex}
              title={renderTitle(child.title, child.typeChart, child.unit)}
            />
          </LazyLoad>
        </div>
      </>
    );
  };

  //Render 2 columns layout with 1 chart per column
  if (configs.length === 1) {
    let fullRow = false;
    //Số công trình khởi công , đóng điện lưới 220-110 kV condition
    if (!configs.some((conf) => conf.typeChart.indexOf('pie') > 0)) fullRow = true;
    let bigSpeed = '';
    if (titleCase(parentTitle) === _GIATRITHUCHIEN) bigSpeed = 'big-speed';
    else if (titleCase(parentTitle) === _DTCCCD) bigSpeed = 'remove-speed';
    let doanhThu = '';
    if (titleCase(parentTitle) === _DOANHTHU) doanhThu = 'doanhThu';
    else doanhThu = '';
    return configs.map((el, index) => {
      if (el === undefined) return null;
      if (el.typeChart === _SPEEDOMETERSTRING) {
        return (
          <div className={`statistical ${doanhThu}`}>
            {renderSingleGaunge(configs, el, index, bigSpeed)}
          </div>
        );
      } else if (el.typeChart === _LINESTRING) {
        return (
          <div
            className={`statistical ${
              ctId === _IDKHOILUONGTBAMBACAOTHE ? 'caoThe' : ''
            } ${doanhThu}`}
          >
            {RenderMultipleColumnLine(configs, el, index, fullRow)}
          </div>
        );
      } else if (el.typeChart === _BARSTRING && el.align === _VERTICAL) {
        return (
          <div className={`statistical ${doanhThu}`}>
            {RenderMultipleColumnBar(configs, el, index, fullRow, el.additionalTitle)}
          </div>
        );
      } else if (el.typeChart === _BARSTRING && el.align !== _VERTICAL) {
        return (
          <div className={`statistical ${doanhThu}`}>
            {RenderMultipleBarHorizontal(configs, el, index, fullRow, el.additionalTitle)}
          </div>
        );
      } else if (
        el.typeChart === _BARTOPHIGHESTSTRING ||
        el.typeChart === _BARTOPLUYKEHIGHESTSTRING
      ) {
        return sortAscending === _TRUE
          ? RenderMultipleColumnTopHighest(configs, el, index, fullRow)
          : null;
      } else if (
        el.typeChart === _BARTOPLOWESTSTRING ||
        el.typeChart === _BARTOPLUYKELOWESTSTRING
      ) {
        return sortAscending === _FALSE
          ? RenderMultipleColumnTopLowest(configs, el, index, fullRow)
          : null;
      } else if (el.typeChart === _PIESTRING) {
        return (
          <div
            className={`${
              el.layout === 1 ? 'statistical' : 'statistical two-column-pie-statistical'
            } ${fullRow ? 'statistical-row-style statistical-row-wrap' : 'statistical-row-style'}
              ${
                el.data.length <= 3
                  ? 'pie-one-row'
                  : el.data.length >= 4 && el.data.length <= 6
                  ? 'pie-two-row'
                  : el.data.length >= 7 && el.data.length <= 9
                  ? 'pie-three-row'
                  : 'pie-four-row'
              }`}
          >
            <div key={index} className={`pie-chart pie-content ${isRow ? 'mediumn-pie' : ''}`}>
              <LazyLoad placeholder={<Spin />} className="pie-lazyload">
                <PieChart
                  config={el}
                  key={index}
                  title={renderTitle(el.title, el.typeChart, el.unit)}
                />
              </LazyLoad>
            </div>
            <div key={index} className={`pie-chart pie-summary ${isRow ? 'mediumn-pie' : ''}`}>
              <LazyLoad placeholder={<Spin />} className="pie-lazyload">
                {renderSummary(el.periodData, el.unit, true)}
              </LazyLoad>
            </div>
          </div>
        );
      } else if (el.typeChart === _TABLESTRING) {
        return (
          <div key={index} className="only-table">
            <TableChart dataTable={el} typeChart={el.typeChart} />
          </div>
        );
      } else {
        return (
          <div className={`statistical fullrow ${doanhThu}`}>
            {renderPeriod()}
            {el.additionalTitle === '' ? null : (
              <div className="linebar-header">
                <span>Giá trị kế hoạch: </span>
                <span>
                  {el.unit === _UNITPHANTRAM
                    ? el.additionalTitle + '' + el.unit
                    : el.additionalTitle + ' ' + el.unit}
                </span>
              </div>
            )}

            <div
              key={index}
              className="page-setOfIndicators--charts page-setOfIndicators--charts-line"
            >
              <LazyLoad placeholder={<Spin />}>
                <ManyColumnsOneLine
                  config={el}
                  key={index}
                  title={renderTitle(el.title, el.typeChart, el.unit)}
                  type={parentTitle === chartTypes.kyThuatDoTinCay ? 'three-col' : ''}
                />
              </LazyLoad>
            </div>
          </div>
        );
      }
    });
  }

  // Render multiple columns layout with multiple charts per column
  if (configs.length >= 2) {
    let fullRow = false;
    //Số công trình khởi công , đóng điện lưới 220-110 kV condition
    if (
      (configs.length === 3 &&
        configs[0].typeChart === _SPEEDOMETERSTRING &&
        !configs.some((conf) => conf.typeChart.indexOf('pie') > 0)) ||
      dataPeriods
    ) {
      fullRow = true;
    }

    //Case 3 chart/ 1 config and split into 2 column (Công Suất, Công tác xử lý vi phạm hành lang lưới điện)
    if (configs[1].layout === 1) {
      //Case Công tác xử lý vi phạm hành lang lưới điện
      if (configs[1].typeChart === _SPEEDOMETERSTRING) {
        return (
          <div className="page-indicators">
            <div className="statistical">
              {configs.map((el, index) => {
                if (el === undefined) return null;
                if (el.typeChart !== _SPEEDOMETERSTRING) {
                  return RenderMultipleColumnLineBar(
                    configs,
                    el,
                    index,
                    fullRow,
                    el.additionalTitle
                  );
                }

                return null;
              })}
            </div>
            <div className="statistical">
              <div className="page-setOfIndicators--charts ctxlvphlld-layout--speedometer">
                {configs.map((el, index) => {
                  if (el === undefined) return null;

                  if (el.typeChart === 'speedometer') {
                    return (
                      <LazyLoad key={index} placeholder={<Spin />}>
                        <div key={index} className="speedometer-box single-speedometer">
                          <h2 className="content-title">
                            {renderTitle(el.title, el.typeChart, el.unit)}
                          </h2>
                          <Gauge {...el.data} />
                        </div>
                      </LazyLoad>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          </div>
        );
        //Case Công Suất
      } else {
        return (
          <div
            className={`page-indicators-cong-suat  ${
              titleCase(parentTitle) === _CONGSUAT ? 'congsuat-linebar' : ''
            }`}
          >
            <div className="cong-suat-content">
              <div className="cong-suat-content--left">
                {configs.map((el, index) => {
                  if (el === undefined || index % 2 !== 0) return null;
                  if (el.typeChart !== _LINESTRING) {
                    return (
                      <div className="statistical">
                        {RenderMultipleColumnLineBar(
                          configs,
                          el,
                          index,
                          fullRow,
                          el.additionalTitle
                        )}
                      </div>
                    );
                  }

                  if (el.typeChart === _LINESTRING) {
                    return (
                      <div className="statistical cong-suat--statistical">
                        {RenderMultipleColumnLine(configs, el, index, fullRow)}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
              <div className="cong-suat-content--right">
                <div
                  className="box-statistical header-content-right"
                  style={{ backgroundColor: 'transparent' }}
                />
                {configs.map((el, index) => {
                  if (el === undefined || index % 2 === 0) return null;
                  if (el.typeChart !== _LINESTRING) {
                    return (
                      <div className="statistical">
                        {RenderMultipleColumnLineBar(
                          configs,
                          el,
                          index,
                          fullRow,
                          el.additionalTitle
                        )}
                      </div>
                    );
                  }
                  if (el.typeChart === _LINESTRING) {
                    return (
                      <div className="statistical cong-suat--statistical">
                        {RenderMultipleColumnLine(configs, el, index, fullRow)}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        );
      }
      //case công suất 2 chart linebar
    } else if (configs[0].typeChart === _LINEBARSTRING && configs[1].typeChart === _LINEBARSTRING) {
      console.log('222: ');

      return (
        <div
          className={`page-indicators-cong-suat  ${
            titleCase(parentTitle) === _CONGSUAT ? 'congsuat-linebar' : ''
          }`}
        >
          <div className="cong-suat-content">
            <div className="cong-suat-content--left">
              {configs.map((el, index) => {
                if (el === undefined) return null;
                if (el.typeChart === _LINEBARSTRING) {
                  return (
                    <div className="statistical">
                      {RenderMultipleColumnLineBar(configs, el, index, fullRow, el.additionalTitle)}
                    </div>
                  );
                } else if (el.typeChart === _LINESTRING) {
                  return (
                    <div className="statistical">
                      {RenderMultipleColumnLine(configs, el, index, fullRow)}
                    </div>
                  );
                } else return null;
              })}
            </div>
            <div className="cong-suat-content--right">
              {configs.map((el, index) => {
                if (el === undefined) return null;
                if (el.typeChart === _LINEBARSTRING) {
                  return (
                    <div className="statistical">
                      {RenderMultipleColumnLineBar(configs, el, index, fullRow, el.additionalTitle)}
                    </div>
                  );
                } else return <></>;
              })}
            </div>
          </div>
        </div>
      );

      //sản lượng điện thương phẩm
    } else if (
      (configs.length >= _THREELENGTHCHART &&
        configs[0].typeChart === _SPEEDOMETERSTRING &&
        configs[1].typeChart === _PIESTRING) ||
      (idDienThuongPham === _IDSANLUONGDIENTHUONGPHAM &&
        configs.length >= _TWOLENGTHCHART &&
        configs[0].typeChart === _PIESTRING &&
        configs[1].typeChart === _BARSTRING &&
        configs[1].align === _HORIZONTAL)
    ) {
      if (configs.length === _TWOLENGTHCHART) {
        return (
          <div className={`sanluong-dienthuongpham`}>
            <div className="sanluong-dienthuongpham--one">
              {configs.map((el, index) => {
                if (el === undefined) return null;
                if (el.typeChart === _PIESTRING) {
                  let isTitle: boolean = false;
                  return (
                    <div className="statistical">
                      {RenderMultipleColumnPie(configs, el, index, fullRow, isTitle)}
                    </div>
                  );
                } else if (el.typeChart === _BARSTRING && el.align !== _VERTICAL) {
                  return (
                    <div className="statistical">
                      {RenderMultipleBarHorizontal(configs, el, index, fullRow, el.additionalTitle)}
                    </div>
                  );
                } else return null;
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div
            className={`sanluong-dienthuongpham ${
              configs[0].typeChart === _SPEEDOMETERSTRING ? 'have-speedometer' : 'not-speedometer'
            }`}
          >
            <div className="sanluong-dienthuongpham--one">
              {configs.map((el, index) => {
                if (el === undefined) return null;
                if (el.typeChart === _SPEEDOMETERSTRING) {
                  return (
                    <div className="statistical">
                      {renderMultipleColumnGauge(configs, el, index, fullRow, '')}
                    </div>
                  );
                } else if (el.typeChart === _PIESTRING) {
                  let isTitle: boolean = false;
                  return (
                    <div
                      className={`statistical ${
                        configs[0].typeChart === _SPEEDOMETERSTRING ? '' : 'pie-summary-sanluong'
                      }`}
                    >
                      {RenderMultipleColumnPie(configs, el, index, fullRow, isTitle)}
                    </div>
                  );
                } else return null;
              })}
            </div>
            <div className="sanluong-dienthuongpham--two">
              {configs.map((el, index) => {
                if (el === undefined) return null;
                if (el.typeChart === _BARSTRING && el.align === _VERTICAL) {
                  return (
                    <div className="statistical">
                      {RenderMultipleColumnBar(configs, el, index, fullRow, el.additionalTitle)}
                    </div>
                  );
                } else if (el.typeChart === _BARSTRING && el.align !== _VERTICAL) {
                  return (
                    <div className="statistical">
                      {RenderMultipleBarHorizontal(configs, el, index, fullRow, el.additionalTitle)}
                    </div>
                  );
                } else if (
                  el.typeChart === _BARTOPHIGHESTSTRING ||
                  el.typeChart === _BARTOPLUYKEHIGHESTSTRING
                ) {
                  return sortAscending === _TRUE ? (
                    <div key={index} className={`inner-statistical-wrapper`}>
                      {RenderMultipleColumnTopHighest(configs, el, index, fullRow)}
                    </div>
                  ) : null;
                } else if (
                  el.typeChart === _BARTOPLOWESTSTRING ||
                  el.typeChart === _BARTOPLUYKELOWESTSTRING
                ) {
                  return sortAscending === _FALSE ? (
                    <div key={index} className={`inner-statistical-wrapper`}>
                      {RenderMultipleColumnTopLowest(configs, el, index, fullRow)}
                    </div>
                  ) : null;
                } else return null;
              })}
            </div>
          </div>
        );
      }
    } else {
      let pieClass: string = '';
      let hasBarTop: string = '';
      let table: string = '';
      let hasLine: string = '';
      let manyBarTop: string = '';
      let count: number = 0;
      // eslint-disable-next-line
      configs.map((el, index) => {
        if (el.typeChart === _PIESTRING && el.data.length <= 3) {
          pieClass = 'pieRow pie-one-row';
        } else if (
          el.typeChart === _PIESTRING &&
          el.data.length >= 4 &&
          el.typeChart === _PIESTRING &&
          el.data.length <= 6
        ) {
          pieClass = 'pieRow pie-two-row';
        } else if (
          el.typeChart === _PIESTRING &&
          el.data.length >= 7 &&
          el.typeChart === _PIESTRING &&
          el.data.length <= 9
        ) {
          pieClass = 'pieRow pie-three-row';
        } else pieClass = 'pieRow pie-four-row';

        if (el.typeChart === _TABLESTRING) {
          table = 'chart-table';
        }

        if (
          (titleCase(parentTitle) === _SUCOLUOIDIENTRUNGTHE &&
            el.typeChart === _BARTOPHIGHESTSTRING) ||
          (titleCase(parentTitle) === _SUCOLUOIDIENTRUNGTHE &&
            el.typeChart === _BARTOPLOWESTSTRING) ||
          (titleCase(parentTitle) === _SUCOLUOIDIENTRUNGTHE &&
            el.typeChart === _BARTOPLUYKEHIGHESTSTRING) ||
          (titleCase(parentTitle) === _SUCOLUOIDIENTRUNGTHE &&
            el.typeChart === _BARTOPLUYKELOWESTSTRING)
        )
          hasBarTop = 'has-barTop';
        else hasBarTop = '';

        if (titleCase(parentTitle) === _SUCOLUOIDIENTRUNGTHE && el.typeChart === _LINESTRING)
          hasLine = 'has-line';

        if (configs.length >= 4) {
          if (
            el.typeChart === _BARTOPHIGHESTSTRING ||
            el.typeChart === _BARTOPLOWESTSTRING ||
            el.typeChart === _BARTOPLUYKEHIGHESTSTRING ||
            el.typeChart === _BARTOPLUYKELOWESTSTRING
          )
            count++;
          if (titleCase(parentTitle) === _TONTHATDIENNANG || count >= 2) manyBarTop = 'many-barTop';
          else manyBarTop = '';
        }
      });

      let addClass: string = '';
      if (
        (configs[0].typeChart === _PIESTRING &&
          configs[1].typeChart === _BARTOPLUYKELOWESTSTRING) ||
        (configs[0].typeChart === _PIESTRING &&
          configs[1].typeChart === _BARTOPLUYKEHIGHESTSTRING) ||
        (configs[0].typeChart === _PIESTRING && configs[1].typeChart === _BARTOPLOWESTSTRING) ||
        (configs[0].typeChart === _PIESTRING && configs[1].typeChart === _BARTOPHIGHESTSTRING)
      ) {
        addClass = 'pie-bar';
      } else addClass = 'not-pie-bar';

      let removeSpeed: string = '';
      if (configs[0].typeChart === _SPEEDOMETERSTRING && titleCase(parentTitle) === _DTCCCD)
        removeSpeed = 'remove-speed';
      else if (titleCase(parentTitle) === _BOCHITIEUSUACHUALON) removeSpeed = 'big-speed';
      else removeSpeed = '';
      return (
        <div
          className={`statistical ${
            isRow && titleCase(parentTitle) !== _TONTHATDIENNANG ? 'column-row' : ''
          } ${
            isRow
              ? fullRow && titleCase(parentTitle) !== _SANLUONGDIENTHUONGPHAM
                ? 'statistical-row-three-chart'
                : (fullRow && titleCase(parentTitle) === _SANLUONGDIENTHUONGPHAM) ||
                  (configs[0].typeChart === _SPEEDOMETERSTRING &&
                    configs.length === 4 &&
                    titleCase(parentTitle) === _SANLUONGDIENTHUONGPHAM)
                ? 'statistical-row-style statistical-row-wrap'
                : configs.length === 2 &&
                  configs[0].typeChart === _SPEEDOMETERSTRING &&
                  !dataPeriods
                ? 'statistical-row-style statistical-wrapped'
                : 'statistical-row-style'
              : ''
          } ${pieClass} ${table} ${addClass} ${
            titleCase(parentTitle) === _TONTHATDIENNANG ? 'tonthat-diennang' : ''
          }
            ${titleCase(parentTitle) === _GIADIENBINHQUANTHANGN ? 'giaDienBinhQuan' : ''} 
            ${
              titleCase(parentTitle) === _SUCOLUOIDIENTRUNGTHE ? 'suCoLuoiDienTrungThe' : ''
            } ${hasBarTop} ${hasLine} ${manyBarTop}`}
        >
          {configs.map((el, index) => {
            if (el.typeChart === _TABLESTRING) {
              return (
                <div key={index} className="table-charts">
                  <TableChart dataTable={el} typeChart={el.typeChart} />
                </div>
              );
            } else if (el.typeChart === _SPEEDOMETERSTRING) {
              return <>{renderMultipleColumnGauge(configs, el, index, fullRow, removeSpeed)}</>;
            } else if (el.typeChart === _LINESTRING) {
              return isRow ? (
                <div key={index} className="inner-statistical-wrapper">
                  {RenderMultipleColumnLine(configs, el, index, fullRow)}
                </div>
              ) : (
                <>{RenderMultipleColumnLine(configs, el, index, fullRow)}</>
              );
            } else if (el.typeChart === _BARSTRING && el.align === _VERTICAL) {
              return isRow ? (
                <div key={index} className="inner-statistical-wrapper">
                  {RenderMultipleColumnBar(configs, el, index, fullRow, el.additionalTitle)}
                </div>
              ) : (
                <>{RenderMultipleColumnBar(configs, el, index, fullRow, el.additionalTitle)}</>
              );
            } else if (el.typeChart === _BARSTRING && el.align !== _VERTICAL) {
              return isRow ? (
                <div key={index} className="inner-statistical-wrapper">
                  {RenderMultipleBarHorizontal(configs, el, index, fullRow, el.additionalTitle)}
                </div>
              ) : (
                <>{RenderMultipleBarHorizontal(configs, el, index, fullRow, el.additionalTitle)}</>
              );
            } else if (
              el.typeChart === _BARTOPHIGHESTSTRING ||
              el.typeChart === _BARTOPLUYKEHIGHESTSTRING
            ) {
              const configDisplayLength = configs.filter(
                (conf) => conf.typeChart.indexOf('bartop') < 0
              ).length;

              return sortAscending === _TRUE ? (
                isRow ? (
                  <div
                    key={index}
                    className={`${
                      configDisplayLength <= 2 &&
                      !configs.some((conf) => conf.typeChart.indexOf('pie') >= 0)
                        ? 'inner-statistical-wrapper'
                        : 'small-inner-statistical-wrapper row-item-pc'
                    }`}
                  >
                    {RenderMultipleColumnTopHighest(configs, el, index, fullRow)}
                  </div>
                ) : (
                  RenderMultipleColumnTopHighest(configs, el, index, fullRow)
                )
              ) : null;
            } else if (
              el.typeChart === _BARTOPLOWESTSTRING ||
              el.typeChart === _BARTOPLUYKELOWESTSTRING
            ) {
              const configDisplayLength = configs.filter(
                (conf) => conf.typeChart.indexOf('bartop') < 0
              ).length;

              return sortAscending === _FALSE ? (
                isRow ? (
                  <div
                    key={index}
                    className={`${
                      configDisplayLength <= 2 &&
                      !configs.some((conf) => conf.typeChart.indexOf('pie') >= 0)
                        ? 'inner-statistical-wrapper'
                        : 'small-inner-statistical-wrapper row-item-pc'
                    }`}
                  >
                    {RenderMultipleColumnTopLowest(configs, el, index, fullRow)}
                  </div>
                ) : (
                  RenderMultipleColumnTopLowest(configs, el, index, fullRow)
                )
              ) : null;
            } else if (el.typeChart === _PIESTRING) {
              return RenderMultipleColumnPie(configs, el, index, fullRow, true);
            } else {
              const configDisplayLength = configs.filter(
                (conf) => conf.typeChart.indexOf('bartop') < 0
              ).length;

              return isRow ? (
                <div
                  key={index}
                  className={`${
                    configDisplayLength <= 1 || fullRow
                      ? 'inner-statistical-wrapper'
                      : 'small-inner-statistical-wrapper row-item-pc'
                  }`}
                >
                  {RenderMultipleColumnLineBar(configs, el, index, fullRow, el.additionalTitle)}
                </div>
              ) : (
                <div key={index}>
                  {RenderMultipleColumnLineBar(configs, el, index, fullRow, el.additionalTitle)}
                </div>
              );
            }
          })}
        </div>
      );
    }
  }
}

export default memo(PeriodsItem);
