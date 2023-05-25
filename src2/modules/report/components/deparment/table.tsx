import { useEffect, useState } from 'react';
import {
  Link
} from "react-router-dom";
import { Button, Select, Row, Form, Col, notification, Table, Dropdown, DatePicker, ConfigProvider, Tooltip, Space } from 'antd';
import { InsertRowAboveOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import viVN from 'antd/lib/locale/vi_VN';

import {
  sort,
  _ARGS,
  _BAOCAOTHEODONVI,
  _DAYFORMAT,
  _FALSE,
  _KHONGCODULIEU,
  _KHONGCODULIEUSELECT,
  _KIEUBAOCAODONVI,
  _LAYTHEONAM,
  _LAYTHEONGAY,
  _LAYTHEOTHANG,
  _MONTHFORMAT,
  _NGAYREQUIRED,
  _NOIDUNGBAOCAODONVITHANHCONG,
  _STATUSCODE200,
  _TIEUDELAYDULIEUTHANHCONG,
  _TIEUDELAYDULIEUTHATBAI,
  _TRUE,
  _TRUESTRING,
  _TYPEMONTH,
  _TYPEYEAR,
  _YEARFORMAT
} from 'constant';
import ReportSeveice from '../../services/ReportSevice';
import { ChiTieuProps, DataReportProps, DonViProps, ReportProps } from 'modules/report/dtos/responses/ReportResponse';
import LocalStorageService from 'core/infrastructure/services/localStorageService';
// import { sortTableString } from 'core/utils/utility';
const reportService = ReportSeveice.instance();
const localStorageService = LocalStorageService.instance()
const { Option } = Select

function BaoCaoTheoDonVi() {
  const localStorage = localStorageService.getUser()
  const [dataDonVi, setDataDonVi] = useState<DonViProps[]>([]);
  const [dvID, setDvID] = useState(localStorage.donViID)
  const [dataTable, setDataTable] = useState<DataReportProps[]>([]);
  const [exportExcel, setExportExcel] = useState<ReportProps[]>([]);
  const [param, setParam] = useState({})
  const [type, setType] = useState(_TYPEMONTH)
  const [typeReport, setTypeReport] = useState('');
  const [isDisabled, setIsDisabled] = useState(_TRUE);
  const [format, setFormat] = useState(_MONTHFORMAT);
  const [listLoaiChiTieu, setListLoaiChiTieu] = useState<ChiTieuProps[]>([]);
  const currentDate = moment()
  const convertDate = currentDate.date() + '/' + (currentDate.month() + 1) + '/' + currentDate.year()
  const [date, setDate] = useState(convertDate)

  const [form] = Form.useForm();

  //change format ngày
  const onChange = (values: string) => {
    if (values === _LAYTHEONGAY) {
      setType('');
      setFormat(_DAYFORMAT)
    } else if (values === _LAYTHEOTHANG) {
      setType(_TYPEMONTH)
      setFormat(_MONTHFORMAT)
    } else {
      setFormat(_YEARFORMAT);
      setType(_TYPEYEAR);
    }

  };

  //fetch đơn vị
  async function fetchDonVi() {
    let response = await reportService.listDonVi();
    if (response.data) setDataDonVi(response.data.donVis);
    else setDataDonVi([]);
  };

  //fetch loại chỉ tiêu
  const fetchLoaiChiTieu = async (donViID) => {
    const response = await reportService.listLoaiChiTieuBaoCao({ donViID: donViID, keHoach: _FALSE })
    if (response.data) setListLoaiChiTieu(response.data.chiTieus)
    else setListLoaiChiTieu([])
  };

  //change đơn vị
  async function donViHandler(value) {
    setDvID(value)
    return await fetchLoaiChiTieu(value)
  }

  //fetch báo cáo
  async function fetchReportByDepartment(params: { data: any; }) {
    let response = await reportService.reportByDepartment(params);
    setDataTable(response.data.baoCaoDonVis);
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDELAYDULIEUTHANHCONG
      _ARGS.description = _NOIDUNGBAOCAODONVITHANHCONG
      notification.success(_ARGS)
    } else {
      _ARGS.message = _TIEUDELAYDULIEUTHATBAI
      _ARGS.description = response.message
      notification.error(_ARGS)
    }
  };

  //lấy dữ liệu báo cáo theo đơn vị
  const filterTable = (values: any) => {
    const newData = {
      ...values,
      loaiBaoCao: values.loaiBaoCao === undefined ? _LAYTHEOTHANG : values.loaiBaoCao,
      donViID: values.donViID === undefined ? dvID : values.donViID,
      loaiChiTieuID: values.loaiChiTieuID === undefined || values.loaiChiTieuID === 'null' ? null : values.loaiChiTieuID,
    }

    const ngayBaoCao = moment(values.ngayBaoCao)
    const day = ngayBaoCao.date();
    const month = ngayBaoCao.month() + 1;
    const year = ngayBaoCao.year()

    newData.ngay = day;
    newData.thang = month;
    newData.nam = year

    delete newData.ngayBaoCao
    setTypeReport(newData.loaiBaoCao)
    setExportExcel(newData);
    setParam({
      donViID: newData.donViID,
      loaiBaoCao: newData.loaiBaoCao,
      loaiChiTieuID: newData.loaiChiTieuID,
      nam: newData.nam,
      ngay: newData.ngay,
      thang: newData.thang
    })

    fetchReportByDepartment({ data: newData })
    setIsDisabled(_FALSE)
  };

  //bỏ lọc
  const onReset = () => {
    form.resetFields();
    setType(_TYPEMONTH);
    setFormat(_MONTHFORMAT)
    setDate(convertDate)
    setIsDisabled(_TRUE)
    setDataTable([])
    setDvID(localStorage.donViID)
  };

  //sort dữ liệu
  const sortDuLieu = async (sortType, asc: boolean) => {
    let params = {
      ...param,
      sortType: sortType,
      asc: asc
    }

    let response = await reportService.sortDuLieuBaoCaoDonVi(params)
    if (response.data) setDataTable(response.data.baoCaoDonVis);
    else setDataTable([])
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text: null) => text !== null ? text : '',
      width: "5%",
    },
    {
      title: "Tên chỉ tiêu",
      dataIndex: "tenChiTieu",
      key: "tenChiTieu",
      width: "30%",
      // sorter: dataTable && dataTable.length > 0 ? (a, b) => { return a.tenChiTieu.length - b.tenChiTieu.length } : false
    },
    {
      title: "Đơn vị",
      dataIndex: "donViDo",
      key: "donViDo",
      width: "5%",
    },
    {
      title: <div className="header-title-sort">Kế hoạch giao
        {dataTable && dataTable.length > 0 ?
          <Space direction="vertical" className="header-title-sort-button"><Tooltip title="Tăng dần"><Button onClick={() => sortDuLieu(sort.sortKeHoach, true)} icon={<CaretUpOutlined />}></Button></Tooltip>
            <Tooltip title="Giảm dần"><Button onClick={() => sortDuLieu(sort.sortKeHoach, false)} icon={<CaretDownOutlined />}></Button></Tooltip>
          </Space>
          : null
        }
      </div>,
      dataIndex: "giaTriKeHoach",
      key: "giaTriKeHoach",
      width: "8%",
      className: 'text-right',
    },
    {
      title: <div className="header-title-sort">Giá trị thực hiện
        {dataTable && dataTable.length > 0 ?
          <Space direction="vertical" className="header-title-sort-button"><Tooltip title="Tăng dần"><Button onClick={() => sortDuLieu(sort.sortThucHien, true)} icon={<CaretUpOutlined />}></Button></Tooltip>
            <Tooltip title="Giảm dần"><Button onClick={() => sortDuLieu(sort.sortThucHien, false)} icon={<CaretDownOutlined />}></Button></Tooltip>
          </Space>
          : null
        }
      </div>,
      dataIndex: "giaTriThucHien",
      key: "giaTriThucHien",
      width: "8%",
      className: 'text-right',
    },
    {
      title: <div className="header-title-sort">Lũy kế thực hiện
        {dataTable && dataTable.length > 0 ?
          <Space direction="vertical" className="header-title-sort-button"><Tooltip title="Tăng dần"><Button onClick={() => sortDuLieu(sort.sortLuyKe, true)} icon={<CaretUpOutlined />}></Button></Tooltip>
            <Tooltip title="Giảm dần"><Button onClick={() => sortDuLieu(sort.sortLuyKe, false)} icon={<CaretDownOutlined />}></Button></Tooltip>
          </Space>
          : null
        }
      </div>,
      dataIndex: "luyKeThucHien",
      key: "luyKeThucHien",
      width: "9%",
      className: 'text-right',
    },
    {
      title: <div className="header-title-sort">So sánh TH/Kế hoạch (%)
        {dataTable && dataTable.length > 0 ?
          <Space direction="vertical" className="header-title-sort-button"><Tooltip title="Tăng dần"><Button onClick={() => sortDuLieu(sort.sortSoSanhTHKH, true)} icon={<CaretUpOutlined />}></Button></Tooltip>
            <Tooltip title="Giảm dần"><Button onClick={() => sortDuLieu(sort.sortSoSanhTHKH, false)} icon={<CaretDownOutlined />}></Button></Tooltip>
          </Space>
          : null
        }
      </div>,
      dataIndex: "soSanhKHTH",
      key: "soSanhKHTH",
      width: "15%",
      className: 'text-right',
    },
    {
      title: <div className="header-title-sort">So sánh TH với cùng kỳ năm trước (%)
        {dataTable && dataTable.length > 0 ?
          <Space direction="vertical" className="header-title-sort-button"><Tooltip title="Tăng dần"><Button onClick={() => sortDuLieu(sort.sortSoSanhTH, true)} icon={<CaretUpOutlined />}></Button></Tooltip>
            <Tooltip title="Giảm dần"><Button onClick={() => sortDuLieu(sort.sortSoSanhTH, false)} icon={<CaretDownOutlined />}></Button></Tooltip>
          </Space>
          : null
        }
      </div>,
      dataIndex: "soSanhTH",
      key: "soSanhTH",
      width: "15%",
      className: 'text-right',
    }
  ];


  //export
  async function exportDonVi() {
    return await reportService.apiDownloadRequest(exportExcel, _BAOCAOTHEODONVI, _KIEUBAOCAODONVI)
  }

  const renderFilter = (
    <>
      <Form
        name="filter-report"
        form={form}
        className="filter-report"
        layout="vertical"
        onFinish={filterTable}
        initialValues={{
          ngayBaoCao: moment(date, _DAYFORMAT),
        }}
      >
        <Row gutter={24} className="box-filter form-filter-report">
          <Col span={20} sm={10} md={10} className=" field-report-deparment">
            <Form.Item
              name="donViID"
              label="Đơn vị"
            >
              <Select
                placeholder="Chọn đơn vị"
                showSearch
                optionFilterProp="children"
                disabled={(localStorage.isTongCongTy === _TRUESTRING || localStorage.isAdmin === _TRUESTRING) ? _FALSE : _TRUE}
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                defaultValue={localStorage.isTongCongTy || localStorage.isAdmin ? localStorage.tenDonVi : localStorage.donViID}
                notFoundContent={_KHONGCODULIEUSELECT}
                onChange={donViHandler}
              >
                {
                  (localStorage.isTongCongTy === _TRUESTRING || localStorage.isAdmin === _TRUESTRING)
                    ?
                    dataDonVi && dataDonVi.length
                      ? dataDonVi.map((item, index) => (
                        <Option key={index} value={item.id}>
                          {item.tenDonVi}
                        </Option>
                      ))
                      : null
                    :
                    localStorage.donViID && localStorage.donViID !== '' ?
                      <Option key={localStorage.donViID} value={localStorage.donViID} >
                        {localStorage.tenDonVi}
                      </Option>
                      : null
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} sm={8} md={8} className="field-report-indicators">
            <Form.Item
              name="loaiChiTieuID"
              label="Loại chỉ tiêu"
              className="type-report-indicators"
            >
              <Select
                placeholder="Chọn loại chỉ tiêu"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                defaultValue={'null'}
                notFoundContent={_KHONGCODULIEUSELECT}
              >
                <Option value="null">Tất cả</Option>
                {listLoaiChiTieu && listLoaiChiTieu.length
                  ? listLoaiChiTieu.map((chiTieu, index) => (
                    <Option key={index} value={chiTieu.id}>
                      {chiTieu.tenChiTieu}
                    </Option>
                  ))
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} md={3} className="field-button-report-reset  min-476">
            <Button htmlType="button" className="button-closed" onClick={onReset} >
              Bỏ lọc
            </Button>
          </Col>
          <Col span={12} md={3} className="field-button-report-submit min-1025">
            <Button type="primary" htmlType="submit" className="button-primary ">
              Lấy dữ liệu
            </Button>
          </Col>
          <Col span={8} sm={8} md={8} className="field-report-type">
            <Form.Item
              name="loaiBaoCao"
              label="Loại báo cáo"
              className="type-report"
            >
              <Select placeholder="Chọn" onChange={onChange} value={type} defaultValue={_LAYTHEOTHANG} notFoundContent={_KHONGCODULIEUSELECT}>
                <Option value={_LAYTHEONGAY}>Ngày</Option>
                <Option value={_LAYTHEOTHANG}>Tháng</Option>
                <Option value={_LAYTHEONAM}>Năm</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={9} sm={10} md={8} lg={8} className="field-report-date">
            <Form.Item
              label="Ngày báo cáo"
              name="ngayBaoCao"
              rules={[{ required: _TRUE, message: _NGAYREQUIRED }]}
            >
              {
                type === _TYPEMONTH ? <DatePicker picker='month' placeholder="Chọn tháng và năm" locale={locale} format={format} />
                  : type === _TYPEYEAR ? <DatePicker picker="year" placeholder="Chọn năm" locale={locale} format={format} />
                    : <DatePicker placeholder="Chọn ngày, tháng và năm" locale={locale} format={format} defaultValue={moment(date, format)} />
              }
            </Form.Item>
          </Col>
          <Col span={12} md={3} className="field-report-submit">
            <Button htmlType="button" className="button-closed max-475" onClick={onReset} >
              Bỏ lọc
            </Button>
            <Button type="primary" htmlType="submit" className="button-primary  max-1024">
              Lấy dữ liệu
            </Button>
            <Button disabled={isDisabled} className="" onClick={exportDonVi}>
              Xuất Excel
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )

  useEffect(() => {
    fetchDonVi();
    fetchLoaiChiTieu(dvID)
    // eslint-disable-next-line
  }, [typeReport, dvID]);

  return (
    <div className="page-report page-layout-content">
      <div className="page-report--header">
        <div className="page-report--header--title">
          <h2>Báo cáo chỉ tiêu theo từng đơn vị</h2>
        </div>
        <div className="filter-mobile">
          <Dropdown overlay={renderFilter} >
            <Link to={'/'} className="ant-dropdown-link" onClick={(e: { preventDefault: () => any; }) => e.preventDefault()}>
              <InsertRowAboveOutlined />
            </Link>
          </Dropdown>
        </div>
      </div>
      <div className="page-report--filter">
        <div className="filter-pc">
          {renderFilter}
        </div>
      </div>
      <div className="page-report--body">
        <div className="page-report--body--table">
          <ConfigProvider locale={viVN}>
            <Table
              className={dataTable.length === 0 ? "page--table height-500" : 'page--table'}
              dataSource={dataTable}
              id='table-report'
              columns={columns}
              locale={_KHONGCODULIEU}
              pagination={{ defaultPageSize: 20, showSizeChanger: true }}
              scroll={{ x: 1400 }}
              rowClassName={(record) => (record.stt === null ? 'row-bold' : parseInt(record.stt) > 0 ? 'text-right' : `row-parent  row-bold`)}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default BaoCaoTheoDonVi