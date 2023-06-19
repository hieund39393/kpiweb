import { Button, Modal, Row, Col, Form, Pagination, DatePicker, Select } from 'antd';
import { _DAYFORMAT, _DAYFORMATEN, _FALSE, _PAGEINDEX, _PAGESIZE } from 'constant';
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { useEffect, useState } from 'react';
import '../assets/css/style.css';
import ChartService from '../services/ChartService';
import { NgaySuCoProps } from '../dtos/requests/Dashboard';
import { formatDate } from 'core/utils/utility';
import { DonVi } from 'modules/dashboard/dtos/responses/ChartResponse';
import DonViService from 'modules/admin/department/services/DonViService';
const { Option } = Select;
const chartService = ChartService.instance();
const donViService = DonViService.instance();
function ChiTietSuCo({
  ngayGanNhat,
  ngaySuCo,
  totalSuCo,
  detail,
  chiTieuID,
  chiTieuEVNID,
  donViID,
  loaiSuCo,
  tenSuCo,
  ngayBaoCao,
  isShowModal,
  closeModal,
}) {
  const [form] = Form.useForm();
  const [suCo, setSuCo] = useState(detail);
  const [arrNgaySuCo, setArrNgaySuCo] = useState<NgaySuCoProps[]>([]);
  const [total, setTotal] = useState(totalSuCo);
  const [date, setDate] = useState(ngayBaoCao);

  const [idDonVi, setIdDonVi] = useState(donViID);

  //chọn ngày sự cố
  const changeDate = async (date: any) => {
    const ngay = moment(date);
    const convert =
      ngay.year() + '-' + formatDate(ngay.month() + 1) + '-' + formatDate(ngay.date());
    setDate(convert);
    return await fetchNgaySuCo(chiTieuID, idDonVi, convert, _PAGEINDEX, _PAGESIZE);
  };

  const changeDonVi = async (donVi: any) => {
    setIdDonVi(donVi.value);
    return await fetchNgaySuCo(chiTieuID, donVi.value, date, _PAGEINDEX, _PAGESIZE);
  };

  //lấy các sự cố theo ngày
  async function fetchNgaySuCo(chiTieuID, donViID, convert, pageIndex, pageSize) {
    const response = await chartService.listDetail({
      chiTieuID: chiTieuID,
      chiTieuEVNID: chiTieuEVNID,
      donViID: donViID,
      ngay: convert,
      layNgayGanNhat: _FALSE,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
    if (response.data.suCo.chiTietSuCos) {
      setTotal(response.data.total);
      setSuCo(response.data.suCo.chiTietSuCos);
    } else setSuCo([]);
  }

  //change số record hiển thị
  async function onShowSizeChange(current, pageSize) {
    return await fetchNgaySuCo(chiTieuID, donViID, date, current, pageSize);
  }

  //change page current
  async function onChange(pageNumber, pageSize) {
    return await fetchNgaySuCo(chiTieuID, donViID, date, pageNumber, pageSize);
  }

  //convert những ngày có sự cố để đưa vào select option
  function convertNgay(ngay) {
    if (ngay && ngay.length) {
      let arr: NgaySuCoProps[] = [];
      // eslint-disable-next-line
      ngay.map((item) => {
        const ngay = moment(item);
        const value =
          ngay.year() + '-' + formatDate(ngay.month() + 1) + '-' + formatDate(ngay.date());
        const convert =
          formatDate(ngay.date()) + '/' + formatDate(ngay.month() + 1) + '/' + ngay.year();
        arr.push({
          value: value,
          ngay: convert,
        });
      });
      setArrNgaySuCo(arr);
    } else setArrNgaySuCo([]);
  }

  function disabledDate(date) {
    return date && date > moment(ngayBaoCao);
  }
  const [dataDonVi, setDataDonVi] = useState<DonVi[]>([]);
  // Fetch đơn vị
  async function fetchDonVi() {
    let response = await donViService.list();
    if (response.data) setDataDonVi(response.data.donVis);
    else setDataDonVi([]);
  }

  useEffect(() => {
    convertNgay(ngaySuCo);
    fetchDonVi();
  }, [ngaySuCo]);

  return (
    <Modal
      title={loaiSuCo + ' > ' + tenSuCo}
      visible={isShowModal}
      onCancel={closeModal}
      className="modal-suCo"
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          Đóng lại
        </Button>,
      ]}
    >
      <div className="modal-choice-date">
        <Form
          form={form}
          layout="horizontal"
          name="form-ctsc"
          initialValues={{
            ngay: moment(ngayGanNhat, _DAYFORMATEN),
          }}
        >
          <Row className="filter">
            <Col span={12} sm={24} xl={5} className="row-padding dateReport">
              <Form.Item name="ngay" label="Ngày">
                <DatePicker
                  onChange={changeDate}
                  placeholder="Chọn ngày"
                  format={_DAYFORMAT}
                  disabledDate={disabledDate}
                  locale={locale}
                  dateRender={(current) => {
                    const style = {
                      color: '',
                    };
                    // eslint-disable-next-line
                    arrNgaySuCo.map((item) => {
                      if (item.value === moment(current).format('YYYY-MM-DD')) {
                        style.color = '#F5222D';
                      }
                    });
                    return (
                      <div className="ant-picker-cell-inner" style={style}>
                        {current.date()}
                      </div>
                    );
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={24} sm={24} xl={12} className="row-padding donViRow">
              <Form.Item name="donViID" label="Đơn vị">
                <Select
                  className="dashboard-selector-pc"
                  labelInValue
                  showSearch
                  placeholder="Tất cả"
                  optionFilterProp="children"
                  style={{ width: 300 }}
                  onChange={changeDonVi}
                >
                  {dataDonVi && dataDonVi.length
                    ? dataDonVi.map((item, index) => (
                        <Option key={index} value={item.id} title={item.tenDonVi}>
                          {item.tenDonVi}
                        </Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="modal-detail">
        {suCo && suCo.length
          ? suCo.map((item) => (
              <>
                <div className="modal-detail--content">
                  <div className="modal-detail--content--title">
                    <h3>{item.tenDuongDay}</h3>
                  </div>
                  <div className="modal-detail--content-body">
                    <Row gutter={16}>
                      <Col span={5} md={6}>
                        Thời gian xảy ra
                      </Col>
                      <Col span={19} md={18}>
                        {item.ngayXayRaSuCoStr}
                      </Col>
                      <Col span={5} md={6}>
                        Thời gian khôi phục sự cố
                      </Col>
                      <Col span={19} md={18}>
                        {item.ngayKhoiPhucSuCoStr}
                      </Col>
                      <Col span={5} md={6}>
                        Công ty điện lực phụ trách
                      </Col>
                      <Col span={19} md={18}>
                        {item.tenDonVi}
                      </Col>
                      <Col span={5} md={6}>
                        Diễn biến
                      </Col>
                      <Col span={19} md={18}>
                        {item.dienBien}
                      </Col>
                      <Col span={5} md={6}>
                        Nguyên nhân
                      </Col>
                      <Col span={19} md={18} className="ctsc-reason">
                        {item.nguyenNhan}
                      </Col>
                      <Col span={5} md={6}>
                        Biện pháp khắc phục
                      </Col>
                      <Col span={19} md={18} className="ctsc-measure">
                        {item.bienPhapKhacPhuc}
                      </Col>
                    </Row>
                  </div>
                </div>
              </>
            ))
          : null}
        {total > 20 ? (
          <Pagination
            defaultCurrent={1}
            total={total}
            defaultPageSize={20}
            showSizeChanger
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        ) : (
          ''
        )}
      </div>
    </Modal>
  );
}

export default ChiTietSuCo;
