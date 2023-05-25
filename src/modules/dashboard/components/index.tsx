import { useEffect, useMemo, useState } from 'react';
import {
  Form,
  Select,
  DatePicker,
  Button,
  Col,
  Row,
  Breadcrumb,
  BackTop,
  Collapse,
} from 'antd';
import { UpCircleOutlined, InsertRowAboveOutlined } from '@ant-design/icons';

import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

import BoChiTieuKyThuat from '../components/skills/index';
import BoChiTieuKinhDoanh from '../components/business/index';
import BoChiTieuDauTuXayDung from '../components/construct/index';
import BoChiTieuSuaChua from '../components/repair/index';
import BoChiTieuQuanTri from '../components/quantri/index';
import BoChiTieuTaiChinh from '../components/taichinh/index';
import BoChiTieuAnToan from '../components/antoan/index';
import BoChiTieuChuyenDoiSo from '../components/chuyendoiso/index';
import BoChiTieuThanhTraKiemTra from '../components/thanhtrakiemtra/index';
import BoChiTieuBaoCaoDieuHanh from '../components/baocaodieuhanh/index';
import BoChiTieuTuDongHoa from '../components/tudonghoa/index';

import { DonVi } from 'modules/dashboard/dtos/responses/ChartResponse';

import DonViService from 'modules/admin/department/services/DonViService';
import LocalStorageService from 'core/infrastructure/services/localStorageService';
import { _DAYFORMAT, _FALSE, _KHONGCODULIEUSELECT, _TRUE, _TRUESTRING } from 'constant';

import '../assets/css/style.css';
import { disabledDateCurrent, formatDate, getInYesterday } from 'core/utils/utility';

const donViService = DonViService.instance();
const localStorageService = LocalStorageService.instance();

const { Option } = Select;

const Dashboard = () => {
  const user = localStorageService.getUser();

  const [form] = Form.useForm();
  const [dataDonVi, setDataDonVi] = useState<DonVi[]>([]);
  const [ngayBaoCao, setNgayBaoCao] = useState<string>(getInYesterday);
  const [donViId, setDonViId] = useState(user.donViID);
  const [fetchAt, setFetchAt] = useState(Date.now());

  // Fetch đơn vị
  async function fetchDonVi() {
    let response = await donViService.list();
    if (response.data) setDataDonVi(response.data.donVis);
    else setDataDonVi([]);
  }

  const date = getInYesterday();
  const convertDate = date.split('-').reverse().join('/');

  useEffect(() => {
    fetchDonVi();
    // eslint-disable-next-line
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  const [fixedForm, setFixedForm] = useState('notFixedForm')

  const renderFilter = useMemo(() => {
    const changedForm = () => {
      if (window.scrollY >= 80) setFixedForm('fixedForm')
      else setFixedForm('notFixedForm')

    };
    window.addEventListener('scroll', changedForm);
    return (
      <>
        <Form
          name="form-get-data"
          form={form}
          className={fixedForm}
          initialValues={{
            ngayBaoCao: moment(convertDate, _DAYFORMAT),
            donViID: { label: user.tenDonVi, value: user.donViID }
          }}
          onFinish={filterChart}
        >
          <Row className="filter">
            <Col span={24} sm={24} md={24} xl={3} xxl={3} className="row-padding">
              <span className="filter__title">
                <strong>Dashboard</strong>
              </span>
            </Col>
            <Col span={24} sm={12} md={10} xl={10} className="row-padding donViRow">
              <Form.Item name="donViID" label="Đơn vị">
                <Select
                  className="dashboard-selector-pc"
                  labelInValue
                  placeholder={user.isTongCongTy || user.isAdmin ? user.tenDonVi : "Chọn đơn vị"}
                  showSearch
                  optionFilterProp="children"
                  disabled={(user.isTongCongTy === _TRUESTRING || user.isAdmin === _TRUESTRING) ? _FALSE : _TRUE}
                  //filterOption={(input, option) =>
                    //option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  //}
                  notFoundContent={_KHONGCODULIEUSELECT}
                >
                  {user.isTongCongTy || user.isAdmin ? (
                    dataDonVi && dataDonVi.length ? (
                      dataDonVi.map((item, index) => (
                        <Option key={index} value={item.id} title={item.tenDonVi}>
                          {item.tenDonVi}
                        </Option>
                      ))
                    ) : null
                  ) : user.donViID && user.donViID !== '' ? (
                    <Option key={user.donViID} value={user.donViID} title={user.tenDonVi}>
                      {user.tenDonVi}
                    </Option>
                  ) : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} sm={12} md={8} xl={8} className="row-padding dateReport">
              <div className="filter__ngay-bao-cao">
                <Form.Item
                  name="ngayBaoCao"
                  label="Ngày báo cáo"
                  rules={[{ required: true, message: 'Ngày không được bỏ trống!' }]}
                  className="date-filter"
                >
                  <DatePicker placeholder="Chọn ngày" locale={locale} format={_DAYFORMAT} disabledDate={disabledDateCurrent} />
                </Form.Item>
              </div>
            </Col>
            <Col span={12} sm={12} md={4} xl={3} className="row-padding button-data buttonFilter button-pc">
              <div className="filter__btn">
                <Form.Item label="">
                  <Button
                    type="default"
                    htmlType="submit"
                    className="button-primary pc-get-data-button"
                  >
                    Lấy dữ liệu
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </>
    )
  }, [convertDate, dataDonVi, form, user.donViID, user.isAdmin, user.isTongCongTy, user.tenDonVi, fixedForm])

  const { Panel } = Collapse;

  const renderMobileFilterHeader = (
    <>
      <Row className="box-dashboard">
        <Col span={12} sm={19} xl={5} className="row-padding dashboard-title">
          <span className="filter__title">
            <strong>Dashboard</strong>
          </span>
        </Col>
        <Col span={12} sm={19} xl={5} className="row-padding mobile-toggle-filter-button">
          <InsertRowAboveOutlined />
        </Col>
      </Row>
    </>
  );

  const renderMobileFilter = (
    <>
      <div className="filter-mobile">
        <div className="title">
          <Breadcrumb className="breadcrumb-setOfIndicators">
            <Breadcrumb.Item>Bộ chỉ tiêu</Breadcrumb.Item>
            <Breadcrumb.Item>Bộ chỉ tiêu kỹ thuật</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Collapse bordered={false}>
        <Panel header={renderMobileFilterHeader} key="1" showArrow={false}>
          <Form
            name="form-get-data"
            form={form}
            initialValues={{
              ngayBaoCao: moment(convertDate, _DAYFORMAT),
              donViID: { label: user.tenDonVi, value: user.donViID }
            }}
            onFinish={filterChart}
          >
            <Row className="filter" style={{ paddingTop: 0 }}>
              <Col span={24} sm={12} md={10} xl={9} className="row-padding donViMobile">
                <Form.Item name="donViID" label="Đơn vị">
                  <Select
                    className="dashboard-selector-mobile"
                    labelInValue
                    placeholder={user.isTongCongTy || user.isAdmin ? user.tenDonVi : "Chọn đơn vị"}
                    showSearch
                    optionFilterProp="children"
                    disabled={user.isTongCongTy || user.isAdmin ? _FALSE : _TRUE}
                    //filterOption={(input, option) =>
                      //option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    //}
                    notFoundContent={_KHONGCODULIEUSELECT}
                  >
                    {user.isTongCongTy || user.isAdmin ? (
                      dataDonVi && dataDonVi.length ? (
                        dataDonVi.map((item, index) => (
                          <Option key={index} value={item.id} title={item.tenDonVi}>
                            {item.tenDonVi}
                          </Option>
                        ))
                      ) : null
                    ) : user.donViID && user.donViID !== '' ? (
                      <Option key={user.donViID} value={user.donViID} title={user.tenDonVi}>
                        {user.tenDonVi}
                      </Option>
                    ) : null}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} sm={12} md={8} xl={7} className="row-padding dateReportMobile">
                <div className="filter__ngay-bao-cao">
                  <Form.Item
                    name="ngayBaoCao"
                    label="Ngày báo cáo"
                    rules={[{ required: true, message: 'Ngày không được bỏ trống!' }]}
                    className="date-filter"
                  >
                    <DatePicker placeholder="Chọn ngày" locale={locale} format={_DAYFORMAT} disabledDate={disabledDateCurrent} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12} sm={12} md={4} xl={3} className="row-padding button-data button-pc buttonFilterMobile">
                <div className="filter__btn">
                  <Form.Item label="">
                    <Button
                      type="default"
                      htmlType="submit"
                      className="button-primary pc-get-data-button"
                    >
                      Lấy dữ liệu
                    </Button>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </>
  );
  const [isChange, setIsChange] = useState(false)
  // Filter data
  function filterChart(values) {
    const convert = new Date(values.ngayBaoCao);
    const convertDate = convert.getDate();
    const convertMonth = convert.getMonth() + 1;
    const convertYear = convert.getFullYear();

    const donViID = Number(values.donViID)
      ? values.donViID
      : values.donViID.value;

    values.ngayBaoCao =
      convertYear + '-' + formatDate(convertMonth) + '-' + formatDate(convertDate);
    setNgayBaoCao(values.ngayBaoCao);
    setDonViId(donViID);
    setFetchAt(Date.now());
    setIsChange(true)
  }

  return (
    <div className="layout-page-content page-layout-content" id="dashboard">
      {/* filter */}
      {width > 576 ? renderFilter : renderMobileFilter}
      {/*end filter */}

      <BoChiTieuKyThuat
        donViID={donViId}
        boChiTieuID={1}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />
      <BoChiTieuKinhDoanh
        donViID={donViId}
        boChiTieuID={2}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />
      <BoChiTieuDauTuXayDung
        donViID={donViId}
        boChiTieuID={3}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />
      <BoChiTieuSuaChua
        donViID={donViId}
        boChiTieuID={4}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />

      <BoChiTieuQuanTri
        donViID={donViId}
        boChiTieuID={28}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />

      <BoChiTieuTaiChinh
        donViID={donViId}
        boChiTieuID={30}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />

      <BoChiTieuAnToan
        donViID={donViId}
        boChiTieuID={31}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />

      <BoChiTieuChuyenDoiSo
        donViID={donViId}
        boChiTieuID={32}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />

      <BoChiTieuThanhTraKiemTra
        donViID={donViId}
        boChiTieuID={34}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />
      <BoChiTieuBaoCaoDieuHanh
        donViID={donViId}
        boChiTieuID={35}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />
  <BoChiTieuTuDongHoa
        donViID={donViId}
        boChiTieuID={37}
        ngayBaoCao={ngayBaoCao}
        fetchAt={fetchAt}
        setIsChange={setIsChange}
        isChange={isChange}
      />
      <BackTop>
        <UpCircleOutlined />
      </BackTop>
    </div>
  );
};

export default Dashboard;
