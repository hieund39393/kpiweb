import { Button, Modal, Row, Col, Form, Pagination, Input, Select, Table } from 'antd';
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
import type { ColumnsType } from 'antd/es/table';
import { BASE_URL } from 'configs/config';

const { Option } = Select;
const chartService = ChartService.instance();
const donViService = DonViService.instance();
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
function DanhSachCongTrinh({ chiTieuID, chiTieuEVNID, donViID, tenSuCo, isShowModal, closeModal }) {
  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [idDonVi, setIdDonVi] = useState(donViID);
  const [thang, setThang] = useState(currentMonth);
  const [nam, setNam] = useState(currentYear);

  const changeDonVi = async (donVi: any) => {
    setIdDonVi(donVi.value);
    // return await fetchNgaySuCo(chiTieuID, donVi.value, _PAGEINDEX, _PAGESIZE);
  };
  const handleChangeThang = (value) => {
    setThang(value);
  };
  const handleChangeNam = (value) => {
    setNam(value);
  };

  const fetchUserData = async () => {
    const response = await chartService.danhSachCongTrinhAsync({
      chiTieuID: chiTieuID,
      donViID: idDonVi,
      thang: thang,
      nam: nam,
    });
    if (response) {
      setData(response);
    }
  };

  const [dataDonVi, setDataDonVi] = useState<DonVi[]>([]);
  // Fetch đơn vị
  async function fetchDonVi() {
    let response = await donViService.list();
    if (response.data) setDataDonVi(response.data.donVis);
    else setDataDonVi([]);
  }

  useEffect(() => {
    fetchDonVi();
    fetchUserData();
  }, [idDonVi, thang, nam]);

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      width: '5%',
      dataIndex: 'stt',
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Công trình',
      width: '30%',
      dataIndex: 'congTrinh',
      key: 'congTrinh',
      fixed: 'left',
      render: (text, record) => (
        <span style={{ color: record.chamTienDo === 1 ? 'red' : 'inherit' }}>
          {text}
        </span>
      )
    },
    {
      title: 'Đơn vị quản lý dự án',
      width: '20%',
      dataIndex: 'donViQLDA',
      render: (text, record) => (
        <span style={{ color: record.chamTienDo === 1 ? 'red' : 'inherit' }}>
          {text}
        </span>
      )
    },
    {
      title: 'Tiến độ kế hoạch',
      width: '15%',
      dataIndex: 'tienDoKeHoach',
      render: (text, record) => (
        <span style={{ color: record.chamTienDo === 1 ? 'red' : 'inherit' }}>
          {text}
        </span>
      )
    },
    {
      title: 'Tiến độ thực tế',
      width: '15%',
      dataIndex: 'tienDoThucTe',
      render: (text, record) => (
        <span style={{ color: record.chamTienDo === 1 ? 'red' : 'inherit' }}>
          {text}
        </span>
      )
    },
    {
      title: 'Tình trạng dự án',
      width: '20%',
      dataIndex: 'tinhTrangDuAn',
      render: (text, record) => (
        <span style={{ color: record.chamTienDo === 1 ? 'red' : 'inherit' }}>
          {text}
        </span>
      )
    },
  ];

  return (
    <Modal
      title={tenSuCo}
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
            thang: currentMonth,
            name: currentYear,
          }}
        >
          <Row className="filter">
            <Col span={12} sm={24} xl={3} className="row-padding dateReport">
              <Form.Item name="thang" label="Tháng">
                <Select
                  defaultValue={currentMonth}
                  style={{ width: 80 }}
                  onChange={handleChangeThang}
                >
                  <Option value="1"> 1</Option>
                  <Option value="2"> 2</Option>
                  <Option value="3"> 3</Option>
                  <Option value="4"> 4</Option>
                  <Option value="5"> 5</Option>
                  <Option value="6"> 6</Option>
                  <Option value="7"> 7</Option>
                  <Option value="8"> 8</Option>
                  <Option value="9"> 9</Option>
                  <Option value="10"> 10</Option>
                  <Option value="11"> 11</Option>
                  <Option value="12"> 12</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} sm={24} xl={5} className="row-padding dateReport">
              <Form.Item name="nam" label="Năm">
                <Select
                  defaultValue={currentYear}
                  style={{ width: 120 }}
                  onChange={handleChangeNam}
                >
                  <Option value={currentYear - 1}>{currentYear - 1}</Option>
                  <Option value={currentYear}>{currentYear}</Option>
                  <Option value={currentYear + 1}>{currentYear + 1}</Option>
                </Select>
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
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          // onChange={onChangePagination}
          // pagination={{
          //   total: total ? total : 0,
          //   defaultpageSize: DEFAULT_PAGESIZE,
          //   defaultCurrent: 1,
          //   current: parseInt(filterConditions.pageIndex),
          //   pageSize: parseInt(filterConditions.pageSize),
          //   showSizeChanger: true,
          //   showLessItems: true,
          //   pageSizeOptions: ['5', '10', '20', '50', '100'],
          //   showTotal: (total) => `Tổng ${total} bản ghi`,
          // }}
          bordered
        />
      </div>
    </Modal>
  );
}

export default DanhSachCongTrinh;
