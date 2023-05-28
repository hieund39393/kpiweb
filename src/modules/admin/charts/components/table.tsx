import { memo, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Select,
  Row,
  Form,
  Col,
  notification,
  Table,
  Dropdown,
  ConfigProvider,
  Space,
  Tooltip,
  Input,
  Tag,
  TreeSelect,
} from 'antd';
import { SearchOutlined, FormOutlined, InsertRowAboveOutlined } from '@ant-design/icons';
import viVN from 'antd/lib/locale/vi_VN';

import {
  _ARGS,
  _BOCHITIEUREQUIRED,
  _KHONGCODULIEU,
  _KHONGCODULIEUSELECT,
  _LOAICHITIEUREQUIRED,
  _NOIDUNGSUATHANHCONG,
  _NOIDUNGTAOTHANHCONG,
  _NOIDUNGTIMKIEMTHANHCONG,
  _PAGEINDEX,
  _PAGESIZE,
  _STATUSCODE200,
  _TIEUDESUATHANHCONG,
  _TIEUDESUATHATBAI,
  _TIEUDETAOTHANHCONG,
  _TIEUDETAOTHATBAI,
  _TIEUDETIMKIEM,
  _TRUE,
} from 'constant';

import {
  BoChiTieuProps,
  ListChartProps,
  LoaiChiTieuLv3Props,
} from '../dtos/responses/ListChartResponse';

import ListChartService from '../services/ListChartService';
import ModalAction from './modal';
import '../assets/css/style.css';

const listChartService = ListChartService.instance();
const { Option } = Select;
const { TreeNode } = TreeSelect;

function DanhSachBieuDo() {
  const [boChiTieu, setBoChiTieu] = useState<BoChiTieuProps[]>([]);
  const [data, setData] = useState<ListChartProps[]>([]);
  const [loaiChiTieu, setLoaiChiTieu] = useState('0');
  const [groupID, setGroupID] = useState('0');
  const [chiTieuLV3, setChiTieuLV3] = useState<LoaiChiTieuLv3Props[]>([]);
  // Modal
  const [isShowModal, setIsShowModal] = useState(false);
  const [rowKey, setRowKey] = useState({});

  const [form] = Form.useForm();

  //fetch danh sách bộ chỉ tiêu
  async function fetchBoChiTieu() {
    let response = await listChartService.listBoChiTieu({
      pageIndex: _PAGEINDEX,
      pageSize: _PAGESIZE,
    });
    if (response.data) {
      setBoChiTieu(response.data.boChiTieus);
    } else setBoChiTieu([]);
  }

  async function fetchLoaiChiTieuLv3(groupID: string) {
    let response = await listChartService.getIndicatorsLevel({ boChiTieu: groupID, level: 2 });
    if (response.data) {
      setChiTieuLV3(response.data.chiTieus);
    } else setChiTieuLV3([]);
  }

  //tree lv3
  const renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        // eslint-disable-next-line
        item.children.map((chil) => {
          if (chil.children) {
            return (
              <TreeNode title={chil.tenDanhMuc} value={chil.id}>
                {renderTreeNodes(chil.children)}
              </TreeNode>
            );
          }
        });
        return (
          <TreeNode title={item.tenDanhMuc} value={item.id}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode value={item.id} title={item.tenDanhMuc} {...item} />;
    });

  //change bộ chỉ tiêu và lấy list chỉ tiêu con lv2 và lv3
  const boChiTieuHandler = async (value: string) => {
    form.setFieldsValue({
      chiTieuID: null,
    });
    setGroupID(value);
    return await fetchLoaiChiTieuLv3(value);
  };

  const chiTieuHandler = (value) => {
    setLoaiChiTieu(value);
  };

  // //fetch danh sách biểu đồ
  async function fetchBieuDo(groupID: string, chiTieuLV3: string) {
    const data = {
      groupID,
      chiTieuLV3,
    };
    let response = await listChartService.list({
      data: data,
      pageIndex: _PAGEINDEX,
      pageSize: _PAGESIZE,
    });
    if (response.data) {
      const dataConvert: ListChartProps[] = [];

      // eslint-disable-next-line
      response.data.bieuDos.map((item) => {
        const json = JSON.parse(item.cauHinhBieuDo);
        const convertSummary = json.summary;
        const convertTitle = json.title;
        const convertchiTieuIDs = json.chiTieuIDs;
        const convertColumns = json.columns;
        const convertOrder = json.order;
        const convertLayout = json.layout;
        const convertIsRow = json.isRow;
        const convertAlign = json.align;
        const convertShowAdditionalTitle = json.showAdditionalTitle;
        const convertUnit = json.unit;
        const convertShowDetails = json.showDetails;
        const convertParentTitle = json.parentTitle;
        const convertDuLieuBCStr = json.duLieuBCStr;
        const convertFormula = json.formula;
        const convertIndex = json.index;
        dataConvert.push({
          id: item.id,
          tenBieuDo: item.tenBieuDo,
          loaiBieuDo: item.loaiBieuDo,
          chiTieuID: item.chiTieuID,
          giaTriKeHoach: item.giaTriKeHoach,
          giaTriThucTe: item.giaTriThucTe,
          giaTriLuyKe: item.giaTriLuyKe,
          bieuDoThongKeTheoNgay: item.bieuDoThongKeTheoNgay,
          bieuDoThongKeTheoNam: item.bieuDoThongKeTheoNam,
          summary: convertSummary,
          title: convertTitle,
          chiTieuIDs: convertchiTieuIDs,
          columns: convertColumns,
          order: convertOrder,
          layout: convertLayout,
          isRow: convertIsRow,
          align: convertAlign,
          showAdditionalTitle: convertShowAdditionalTitle,
          unit: convertUnit,
          showDetails: convertShowDetails,
          parentTitle: convertParentTitle,
          duLieuBCStr: convertDuLieuBCStr,
          formula: convertFormula,
          index: convertIndex,
        });
      });

      setData(dataConvert);
    } else setData([]);
  }

  //
  const columns = [
    {
      title: 'Tên biểu đồ',
      dataIndex: 'tenBieuDo',
      key: 'tenBieuDo',
      width: '20%',
      sorter:
        data && data.length > 0
          ? (a, b) => {
              return a.tenBieuDo.length - b.tenBieuDo.length;
            }
          : false,
    },
    {
      title: 'Cấu hình biểu đồ',
      dataIndex: 'summary',
      key: 'summary',
      width: '26%',
      render: (text: null) =>
        text === 1 || text === '1'
          ? 'Hiển thị thông tin summary'
          : text === 2 || text === '2'
          ? 'Không hiển thị summary'
          : 'Không cho phép chỉnh sửa biểu đồ',
    },
    {
      title: 'Giá trị kế hoạch',
      dataIndex: 'giaTriKeHoach',
      key: 'giaTriKeHoach',
      width: '10%',
      className: 'text-center width-70',
      render: (text: null) =>
        text ? <Tag color="green">True</Tag> : <Tag color="geekblue">False</Tag>,
    },
    {
      title: 'Giá trị thực tế',
      dataIndex: 'giaTriThucTe',
      key: 'giaTriKeHoach',
      width: '10%',
      className: 'text-center width-70',
      render: (text: null) =>
        text ? <Tag color="green">True</Tag> : <Tag color="geekblue">False</Tag>,
    },
    {
      title: 'Giá trị lũy kế',
      dataIndex: 'giaTriLuyKe',
      key: 'giaTriLuyKe',
      width: '12%',
      className: 'text-center width-70',
      render: (text: null) =>
        text ? <Tag color="green">True</Tag> : <Tag color="geekblue">False</Tag>,
    },
    {
      title: 'Biểu đồ TKTNgày',
      dataIndex: 'bieuDoThongKeTheoNgay',
      key: 'bieuDoThongKeTheoNgay',
      width: '12%',
      className: 'text-center width-70',
      render: (text: null) =>
        text ? <Tag color="green">True</Tag> : <Tag color="geekblue">False</Tag>,
    },
    {
      title: 'Tác vụ',
      key: 'action',
      width: '10%',
      render: (row) => {
        if (row.summary === 3 || row.summary === '3') return null;
        else
          return (
            <Space size="middle">
              <Tooltip title="Sửa dữ liệu">
                <Button
                  type="default"
                  className="action-table"
                  icon={<FormOutlined />}
                  onClick={() => showModal(row)}
                ></Button>
              </Tooltip>
            </Space>
          );
      },
    },
  ];

  //lấy dữ liệu biểu đồ
  async function filterTable(values: any) {
    return await fetchBieuDo(values.groupID, values.chiTieuID);
  }

  //set hiển thị modal
  const showModal = async (row: any) => {
    if (groupID === '0') {
      _ARGS.message = _TIEUDETAOTHATBAI;
      _ARGS.description = 'Vui lòng chọn bộ chỉ tiêu';
      return notification.error(_ARGS);
    } else {
      if (row.id) {
        setRowKey(row);
      } else {
        setRowKey({});
      }
      setIsShowModal(true);
    }
  };

  //đóng modal đơn vị
  const closeModal = () => {
    setIsShowModal(false);
  };

  async function createUpdateHandler(bieuDo: any) {
    if (bieuDo.id) {
      //call api update
      const response = await listChartService.update(bieuDo);
      if (response.statusCode === _STATUSCODE200) {
        _ARGS.message = _TIEUDESUATHANHCONG;
        _ARGS.description = _NOIDUNGSUATHANHCONG;
        notification.success(_ARGS);
        fetchBieuDo(groupID, bieuDo.chiTieuID);
      } else {
        _ARGS.message = _TIEUDESUATHATBAI;
        _ARGS.description = response.message;
        notification.error(_ARGS);
      }
    } else {
      //call api create
      const response = await listChartService.create(bieuDo);
      if (response.statusCode === _STATUSCODE200) {
        _ARGS.message = _TIEUDETAOTHANHCONG;
        _ARGS.description = _NOIDUNGTAOTHANHCONG;
        notification.success(_ARGS);
        fetchBieuDo(groupID, bieuDo.chiTieuID);
      } else {
        _ARGS.message = _TIEUDETAOTHATBAI;
        _ARGS.description = response.message;
        notification.error(_ARGS);
      }
    }
  }

  // async function createAuto() {
  //   const response = await listChartService.createAuto();
  //   if (response.statusCode === _STATUSCODE200) {
  //     _ARGS.message = _TIEUDETAOTHANHCONG
  //     _ARGS.description = _NOIDUNGTAOTHANHCONG
  //     notification.success(_ARGS)
  //   } else {
  //     _ARGS.message = _TIEUDETAOTHATBAI
  //     _ARGS.description = response.message
  //     notification.error(_ARGS)
  //   }
  // }

  //hiển thị modal đơn vị
  const modal = useMemo(
    () =>
      isShowModal && (
        <ModalAction
          groupID={groupID}
          // loaiChiTieu={loaiChiTieu}
          rowKey={rowKey}
          boChiTieu={boChiTieu}
          chiTieuLV3={chiTieuLV3}
          isShowModal={isShowModal}
          closeModal={closeModal}
          createUpdateHandler={createUpdateHandler}
        />
      ),
      // eslint-disable-next-line
    [isShowModal, rowKey, boChiTieu, groupID, chiTieuLV3]
  );

  // async function deleteHandler(bieuDoIDs: string) {
  //   const response = await listChartService.delete(bieuDoIDs);
  //   if (response.statusCode === _STATUSCODE200) {
  //     _ARGS.message = _TIEUDEXOATHANHCONG
  //     _ARGS.description = _NOIDUNGXOATHANHCONG
  //     notification.success(_ARGS)
  //     fetchBieuDo(groupID, loaiChiTieu)
  //   } else {
  //     _ARGS.message = _TIEUDEXOATHATBAI
  //     _ARGS.description = response.message
  //     notification.error(_ARGS)
  //   }

  //   // fetchBieuDo(groupID, chiTieuID)
  // }

  //xóa dữ liệu
  // function confirmDelete(bieuDoIDs: string) {
  //   const textModal = {
  //     title: _TIEUDECONFIRM,
  //     icon: <ExclamationCircleOutlined />,
  //     content: _NOIDUNGCONFRIM,
  //     okText: _NUTDONGY,
  //     cancelText: _NUTHUY,
  //     onOk: () => { deleteHandler(bieuDoIDs) },
  //     onCancel: () => { },
  //     className: 'modal-confirm'
  //   };

  //   Confirm(textModal)
  // }

  //reset filter và table
  const onReset = () => {
    setData([]);
    form.resetFields();
  };

  async function filterHandler(values: any) {
    if (values.timKiem === undefined || values.timKiem === '')
      return fetchBieuDo(groupID, loaiChiTieu);
    const value = values.timKiem;
    const newData = {
      value,
      groupID: groupID,
      chiTieuID: loaiChiTieu,
    };
    let response = await listChartService.search({
      data: newData,
      pageIndex: _PAGEINDEX,
      pageSize: _PAGESIZE,
    });
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDETIMKIEM;
      _ARGS.description = _NOIDUNGTIMKIEMTHANHCONG;
      notification.success(_ARGS);
      setData(response.data.bieuDos);
    } else {
      _ARGS.message = _TIEUDETIMKIEM;
      _ARGS.description = response.message;
      notification.error(_ARGS);
    }
  }

  const renderFilter = () => {
    return (
      <>
        <Form
          name="filter-charts"
          layout="vertical"
          form={form}
          className=""
          key={'filter-charts'}
          onFinish={filterTable}
          initialValues={{}}
        >
          <Row gutter={16} className="box-filter form-filter-chart">
            <Col span={12} md={6} className="form-filter-chart--group">
              <Form.Item
                name="groupID"
                label="Bộ chỉ tiêu"
                rules={[{ required: _TRUE, message: _BOCHITIEUREQUIRED }]}
              >
                <Select
                  placeholder="Chọn bộ chỉ tiêu"
                  onChange={boChiTieuHandler}
                  notFoundContent={_KHONGCODULIEUSELECT}
                >
                  {boChiTieu && boChiTieu.length
                    ? boChiTieu.map((item, index) => (
                        <Option value={item.groupID} key={index}>
                          {item.groupName}
                        </Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} md={10} className="form-filter-chart--type">
              <Form.Item
                name="chiTieuID"
                label="Loại chỉ tiêu"
                rules={[{ required: _TRUE, message: _LOAICHITIEUREQUIRED }]}
              >
                <TreeSelect
                  onChange={chiTieuHandler}
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Chọn loại chỉ tiêu"
                  allowClear
                  treeDefaultExpandAll
                >
                  {renderTreeNodes(chiTieuLV3)}
                </TreeSelect>
              </Form.Item>
            </Col>
            <Col
              span={12}
              md={3}
              className="button-filter-chart form-filter-chart--reset filter-pc"
            >
              <Button className="button-closed " onClick={onReset}>
                Bỏ lọc
              </Button>
            </Col>
            <Col span={12} md={6} className="button-filter-chart form-filter-chart--submit">
              <Button className="button-closed filter-mobile" onClick={onReset}>
                Bỏ lọc
              </Button>
              {/* <Button className="button-primary button-create-auto" onClick={() => createAuto()} type="default" >Tạo tự động</Button> */}
              <Button
                className="button-primary button-submit-chart"
                htmlType="submit"
                type="default"
              >
                Lấy dữ liệu
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  };

  useEffect(() => {
    fetchBoChiTieu();
  }, []);
  return (
    <div className="page-admin page-layout-content" id="page-admin-chart">
      <div className="page-admin--header">
        <div className="page-admin--header--title">
          <h2>Quản lý biểu đồ</h2>
        </div>
        <div className="filter-mobile">
          <Dropdown overlay={renderFilter()}>
            <Link
              to={'/'}
              className="ant-dropdown-link"
              onClick={(e: { preventDefault: () => any }) => e.preventDefault()}
            >
              <InsertRowAboveOutlined />
            </Link>
          </Dropdown>
        </div>
      </div>
      <div className="page-admin--filter">
        <div className="filter-pc">{renderFilter()}</div>
      </div>
      <div className="page-admin--search">
        <Form
          name="search-chart"
          layout="inline"
          key={'search-chart'}
          className="search-chart"
          onFinish={filterHandler}
        >
          <Form.Item name="timKiem" className="filter-input-value">
            <Input placeholder="Tìm kiếm theo tên biểu đồ" suffix={<SearchOutlined />} allowClear />
          </Form.Item>
        </Form>
      </div>
      <div className="page-admin--body">
        <ConfigProvider locale={viVN}>
          <Table
            dataSource={data}
            columns={columns}
            locale={_KHONGCODULIEU}
            className="page--table"
          />
        </ConfigProvider>
      </div>

      {modal}
    </div>
  );
}
export default memo(DanhSachBieuDo);
