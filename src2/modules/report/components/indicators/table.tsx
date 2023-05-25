import { useEffect, useState } from 'react';
import {
  Link
} from "react-router-dom";

import { Button, Select, Row, Form, Col, Table, Dropdown, DatePicker, ConfigProvider, Tooltip, Space, TreeSelect } from 'antd';
import { InsertRowAboveOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import viVN from 'antd/lib/locale/vi_VN';

import ReportService from '../../services/ReportSevice';
import {
  sort,
  // _ARGS,
  _BAOCAOTHEOCHITIEU,
  _BOCHITIEUREQUIRED,
  _DAYFORMAT,
  _FALSE,
  _GET,
  _KHONGCODULIEU,
  _KHONGCODULIEUSELECT,
  _KIEUBAOCAOCHITIEU,
  _LAYTHEONAM,
  _LAYTHEONGAY,
  _LAYTHEOTHANG,
  _LOAICHITIEUREQUIRED,
  _MONTHFORMAT,
  _NGAYREQUIRED,
  _PAGEINDEX,
  _PAGESIZE,
  // _NOIDUNGBAOCAOCHITIEUTHANHCONG,
  _SORT,
  // _STATUSCODE200,
  // _TIEUDELAYDULIEUTHANHCONG,
  // _TIEUDELAYDULIEUTHATBAI,
  _TRUE,
  _TYPEMONTH,
  _TYPEYEAR,
  _YEARFORMAT
} from 'constant';
import { DataReportByIndicatorProps, ReportProps } from 'modules/report/dtos/responses/ReportResponse';
import { BoChiTieuProps, LoaiChiTieuLv3Props } from 'modules/admin/charts/dtos/responses/ListChartResponse';
import listChartService from 'modules/admin/charts/services/ListChartService';
// import { sortTableString } from 'core/utils/utility';

const reportService = ReportService.instance();

const { Option } = Select

function BaoCaoTheoChiTieu() {
  const { TreeNode } = TreeSelect
  const [loaiChiTieu, setLoaiChiTieu] = useState('0');
  const [chiTieuLV3, setChiTieuLV3] = useState<LoaiChiTieuLv3Props[]>([])
  const [dataTable, setDataTable] = useState<DataReportByIndicatorProps[]>([]);
  const [exportExcel, setExportExcel] = useState<ReportProps[]>([]);
  const [format, setFormat] = useState(_MONTHFORMAT);
  const [type, setType] = useState(_TYPEMONTH)
  const [isDisabled, setIsDisabled] = useState(_TRUE)
  const currentDate = moment()
  const convertDate = currentDate.date() + '/' + (currentDate.month() + 1) + '/' + currentDate.year()
  const [date, setDate] = useState(convertDate)
  // const [defaultPageSize, setDefaultPageSize] = useState(30)
  const [param, setParam] = useState({})
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  // const [indexPage, setIndexPage] = useState(0)
  const [form] = Form.useForm();
  const [chiTieuLv2, setChiTieuLv2] = useState<number[]>([]);
  // const [groupID, setGroupID] = useState('0');
  const [boChiTieu, setBoChiTieu] = useState<BoChiTieuProps[]>([])

  //fetch báo cáo
  const fetchReportByIndicator = async (params, type) => {
    let response: any
    if (type === _GET) {
      response = await reportService.reportByIndicator(params);
    } else response = await reportService.sortDuLieuBaoCaoChiTieu(params)

    // let dataArr: DataReportByIndicatorProps[] = []
    // let index = 0;
    // const bccts = response.data.giaTriChiTieus;
    // setIndexPage(response.data.pageIndex)
    // // setDefaultPageSize(bccts[0]?.giaTriChiTieus.length)
    // for (let i = 0; i < bccts.length; i++) {
    //   const gtChiTieus = bccts[i].giaTriChiTieus;
    //   if (gtChiTieus.length > 0) {
    //     for (let j = 0; j < gtChiTieus.length; j++) {
    //       index++
    //       dataArr.push({
    //         stt: index,
    //         tenDonVi: gtChiTieus[j].tenDonVi,
    //         loaiChiTieu: gtChiTieus[j].loaiChiTieu,
    //         tenChiTieu: gtChiTieus[j].tenChiTieu,
    //         donViDo: gtChiTieus[j].donViDo,
    //         giaTriKeHoach: gtChiTieus[j].giaTriKeHoach,
    //         giaTriThucHien: gtChiTieus[j].giaTriThucHien,
    //         luyKeThucHien: gtChiTieus[j].luyKeThucHien,
    //         soSanhKHTH: gtChiTieus[j].soSanhKHTH,
    //         soSanhTH: gtChiTieus[j].soSanhTH,
    //       })
    //     }

    //   } else dataArr = []
    // }
    // setDefaultPageSize(response.data.baoCaoChiTieus[0].giaTriChiTieus.length)
    setDataTable(response.data.giaTriChiTieus);
    setTotalPage(response.data.totalPage)
    // if (response.statusCode === _STATUSCODE200) {
    //   _ARGS.message = _TIEUDELAYDULIEUTHANHCONG
    //   _ARGS.description = _NOIDUNGBAOCAOCHITIEUTHANHCONG
    //   notification.success(_ARGS)
    // } else {
    //   _ARGS.message = _TIEUDELAYDULIEUTHATBAI
    //   _ARGS.description = response.message
    //   notification.error(_ARGS)
    // }
  };
  //fetch danh sách bộ chỉ tiêu
  async function fetchBoChiTieu() {
    let response = await listChartService.listBoChiTieu({ pageIndex: _PAGEINDEX, pageSize: _PAGESIZE })
    if (response.data) {
      setBoChiTieu(response.data.boChiTieus)
    } else setBoChiTieu([])
  }

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
  const filterTable = (values: any) => {
    if (chiTieuLv2.includes(values.chiTieuID) === true) return;
    else {
      const newData = {
        ...values,
        loaiBaoCao: values.loaiBaoCao === undefined ? _LAYTHEOTHANG : values.loaiBaoCao,
        chiTieuID: loaiChiTieu === undefined ? 'null' : loaiChiTieu,
      }
      const ngayBaoCao = moment(values.ngayBaoCao)
      let day = ngayBaoCao.date();
      let month = ngayBaoCao.month() + 1;
      let year = ngayBaoCao.year()

      newData.ngay = day;
      newData.thang = month;
      newData.nam = year
      newData.pageIndex = 1
      delete newData.ngayBaoCao
      setExportExcel(newData);
      setParam({
        chiTieuID: loaiChiTieu,
        loaiBaoCao: newData.loaiBaoCao,
        nam: newData.nam,
        ngay: newData.ngay,
        thang: newData.thang
      })
      fetchReportByIndicator(newData, _GET)
      setCurrentPage(1)
      setIsDisabled(_FALSE)
    };
  }
  const onReset = () => {
    form.resetFields();
    setType(_TYPEMONTH);
    setFormat(_MONTHFORMAT)
    setDate(convertDate)
    setIsDisabled(_TRUE)
    setDataTable([])
  };

  //sort dữ liệu
  const sortDuLieu = async (sortType, asc: boolean) => {
    let params = {
      ...param,
      sortType: sortType,
      asc: asc,
      pageIndex: 1
    }
    fetchReportByIndicator(params, _SORT)
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
    },
    {
      title: "Đơn vị",
      dataIndex: "tenDonVi",
      key: "tenDonVi",
      width: "15%",
    },
    // {
    //   title: "Loại chỉ tiêu",
    //   dataIndex: "loaiChiTieu",
    //   key: "loaiChiTieu",
    //   width: "20%",
    //   sorter: (a, b) => { return sortTableString(a, b, 'loaiChiTieu') },
    // },
    {
      title: "Chỉ tiêu",
      dataIndex: "tenChiTieu",
      key: "tenChiTieu",
      width: "30%",
      render: (text, record) => {
        return <span>{record.loaiChiTieu + ' - ' + record.tenChiTieu}</span>
      },
    },
    {
      title: "Đơn vị tính",
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
      width: "7%",
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
      width: "7%",
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
      width: "7%",
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
      width: "12%",
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
      width: "12%",
      className: 'text-right',
    }
  ];
  // get chỉ tiêu lv3
  async function fetchLoaiChiTieuLv3(groupID: string) {
    let response = await reportService.getIndicatorsLevel({ boChiTieu: groupID, level: 2, laMucDonVi: true })
    if (response.data) {
      setChiTieuLV3(response.data.chiTieus)
      let arrLv2: number[] = [];
      // eslint-disable-next-line
      response.data.chiTieus.map(item => {
        arrLv2.push(item.id)
      })
      setChiTieuLv2(arrLv2)
    } else setChiTieuLV3([])
  }

  //tree lv3
  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        item.children.map(chil => {
          if (chil.children) {
            return (
              <TreeNode title={chil.tenDanhMuc} value={chil.id} >
                {renderTreeNodes(chil.children)}
              </TreeNode>
            )
          }
          return item.children
        })
        return (
          <TreeNode title={item.tenDanhMuc} value={item.id} >
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode value={item.id} title={item.tenDanhMuc} {...item} />
    })

  const chiTieuHandler = (value) => {
    setLoaiChiTieu(value);
  }
  //change bộ chỉ tiêu và lấy list chỉ tiêu con lv2 và lv3
  const boChiTieuHandler = async (value: string) => {
    form.setFieldsValue({
      chiTieuID: null
    })
    // setGroupID(value)
    return await fetchLoaiChiTieuLv3(value)
  }



  useEffect(() => {
    // fetchLoaiChiTieuLv3();
    fetchBoChiTieu()
  }, [])

  async function exportChiTieu() {
    return await reportService.apiDownloadRequest(exportExcel, _BAOCAOTHEOCHITIEU, _KIEUBAOCAOCHITIEU)
  }

  const renderFilter = (
    <>
      <Form
        name="filter-report"
        form={form}
        className="filter-report filter-report-indicator"
        layout="vertical"
        onFinish={filterTable}
        initialValues={{
          ngayBaoCao: moment(date, _DAYFORMAT),
        }}
      >
        <Row gutter={24} className="box-filter form-filter-report">
          <Col span={20} sm={10} md={10} className=" field-report-deparment">
            <Form.Item
              name="groupID"
              label="Bộ chỉ tiêu"
              rules={[{ required: _TRUE, message: _BOCHITIEUREQUIRED }]}
            >
              <Select placeholder="Chọn bộ chỉ tiêu" onChange={boChiTieuHandler} notFoundContent={_KHONGCODULIEUSELECT}>
                {
                  boChiTieu && boChiTieu.length ?
                    boChiTieu.map((item, index) => (
                      <Option value={item.groupID} key={index} >{item.groupName}</Option>
                    ))
                    : null
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} sm={8} md={8} className="field-report-indicators">
            <Form.Item
              name="chiTieuID"
              label="Loại chỉ tiêu"
              rules={[{ required: _TRUE, message: _LOAICHITIEUREQUIRED }]}
            >
              <TreeSelect
                placeholder="Chọn loại chỉ tiêu"
                showSearch
                onChange={chiTieuHandler}
                treeDefaultExpandAll
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                allowClear
              >
                {renderTreeNodes(chiTieuLV3)}
              </TreeSelect>
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
            <Button disabled={isDisabled} className="" onClick={exportChiTieu}>
              Xuất Excel
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );

  //click phân trang dữ liệu
  async function paginationDuLieu(pageIndex) {
    let params = {
      ...param,
      pageIndex: pageIndex
    }
    setCurrentPage(pageIndex)
    fetchReportByIndicator(params, _GET)
  }

  // //next page
  function nextPagination() {
    let current = currentPage
    setCurrentPage(current + 1)
    let params = {
      ...param,
      pageIndex: current + 1
    }
    fetchReportByIndicator(params, _GET)
  }

  // //prev page
  function prevPagination() {
    let current = currentPage
    setCurrentPage(current - 1)
    let params = {
      ...param,
      pageIndex: current - 1
    }
    fetchReportByIndicator(params, _GET)
  }

  // //active class
  // function activeClass(pageIndex) {
  //   if (currentPage === pageIndex) return 'ant-pagination-item-active'
  //   else return ''
  // }

  //render pagination/select option
  function renderButton(total) {
    let number: number[] = [];
    for (let i = 0; i < total; i++) {
      number.push(i)
    }
    if (total > 0) {
      return (
        <div className="option-report-indicators">
          <ul className="ant-pagination ant-table-pagination ant-table-pagination-right option-report-indicators-pagination">
            <li title="Trang Trước" className={`ant-pagination-prev ${currentPage === 1 ? 'ant-pagination-disabled' : ''}`}>
              {
                currentPage === 1 ?
                  <div className="ant-pagination-item-link" >
                    <span role="img" aria-label="left" className="anticon anticon-left">
                      <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z">
                        </path>
                      </svg>
                    </span>
                  </div> :
                  <Button className="ant-pagination-item-link" type="default" onClick={() => prevPagination()}>
                    <span role="img" aria-label="left" className="anticon anticon-left">
                      <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z">
                        </path>
                      </svg>
                    </span>
                  </Button>
              }
            </li>

            <Select placeholder="Chọn trang" defaultValue={1} value={currentPage} onChange={paginationDuLieu}>
              {
                number.map((i, index) => {
                  return (
                    <Option key={index} value={i + 1}>Trang {i + 1}</Option>
                  )
                })
              }
            </Select>
            <span className="option-report-indicators--total">/ {total}</span>

            <li title="Trang Kế" className={`ant-pagination-next ${currentPage === number.length ? 'ant-pagination-disabled' : ''}`}>
              {
                currentPage === number.length ? <div className="ant-pagination-item-link">
                  <span role="img" aria-label="right" className="anticon anticon-right">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                    </svg>
                  </span>
                </div> : <Button className="ant-pagination-item-link" type="default" onClick={() => nextPagination()}>
                  <span role="img" aria-label="right" className="anticon anticon-right">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                    </svg>
                  </span>
                </Button>
              }

            </li>
          </ul>
        </div>
        // <ul className="ant-pagination ant-table-pagination ant-table-pagination-right">
        //   <li title="Trang Trước" className={`ant-pagination-prev ${currentPage === 1 ? 'ant-pagination-disabled' : ''}`}>
        //     <Button className="ant-pagination-item-link" type="default" onClick={() => prevPagination()}>
        //       <span role="img" aria-label="left" className="anticon anticon-left">
        //         <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        //           <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z">
        //           </path>
        //         </svg>
        //       </span>
        //     </Button>
        //   </li>
        //   {
        //     number.map((i, index) => {
        //       return (
        //         <li key={index} title={(i + 1).toString()} className={`ant-pagination-item ant-pagination-item-${i + 1} ${activeClass(i + 1)}`} onClick={() => paginationDuLieu(i + 1)}>
        //           {i + 1}
        //         </li>
        //       )
        //     })
        //   }
        //   <li title="Trang Kế" className={`ant-pagination-next ${currentPage === number.length ? 'ant-pagination-disabled' : ''}`}>
        //     <Button className="ant-pagination-item-link" type="default" onClick={() => nextPagination()}>
        //       <span role="img" aria-label="right" className="anticon anticon-right">
        //         <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
        //         </svg>
        //       </span>
        //     </Button>
        //   </li>
        // </ul>
      )
    } else return null

  }

  useEffect(() => {
    // fetchChiTieu(localStorage.donViID)
    // eslint-disable-next-line
  }, [])


  return (
    <div className="page-report page-layout-content">
      <div className="page-report--header">
        <div className="page-report--header--title">
          <h2>Báo cáo theo từng chỉ tiêu</h2>
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
        <div className="page-indicators--body--title  block-1199">
          <div className="button-update-indicators">
            <Button disabled={isDisabled} className="button-closed report-closed" onClick={exportChiTieu}>
              Xuất Excel
            </Button>
          </div>
        </div>
        <div className="page-report--body--table">
          <ConfigProvider locale={viVN}>
            <Table
              className={'page--table'}
              id='table-report'
              dataSource={dataTable}
              columns={columns}
              locale={_KHONGCODULIEU}
              scroll={{ x: 1300 }}
              pagination={false}
            />
            {
              renderButton(totalPage)
            }

          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default BaoCaoTheoChiTieu
