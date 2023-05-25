import { memo, useEffect, useMemo, useState } from "react";

//
import { Button, Space, Form, Input, notification, Table, Tooltip, ConfigProvider } from 'antd';
import { ExclamationCircleOutlined, SearchOutlined, PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import viVN from 'antd/lib/locale/vi_VN';
//
import Confirm from "../../../../core/components/modal/confirm";
import ModalQuyenTaiKhoan from "./modal";
import QuyenHeThongService from "../services/QuyenHeThongService";
import { ChucNangProps, RoleProps } from "../dtos/requests/QuyenHeThongRequest";
import { _ARGS, _KHONGCODULIEU, _NOIDUNGCONFRIM, _NOIDUNGSUATHANHCONG, _NOIDUNGTAOTHANHCONG, _NOIDUNGTIMKIEMTHANHCONG, _NOIDUNGXOATHANHCONG, _NUTDONGY, _NUTHUY, _PAGEINDEX, _PAGESIZE, _STATUSCODE200, _TIEUDECONFIRM, _TIEUDESUATHANHCONG, _TIEUDESUATHATBAI, _TIEUDETAOTHANHCONG, _TIEUDETAOTHATBAI, _TIEUDETIMKIEM, _TIEUDEXOATHANHCONG, _TIEUDEXOATHATBAI } from "constant";

const quyenTaiKhoanService = QuyenHeThongService.instance();

function QuyenHeThongTable() {
  // Dữ liệu bảng
  const [data, setData] = useState<RoleProps[]>([]);
  const [dataChucNang, setDataChucNang] = useState<ChucNangProps[]>([]);
  //modal
  const [isShowModal, setIsShowModal] = useState(false);
  const [rowKey, setRowKey] = useState({});

  const [form] = Form.useForm();

  //fetch quyền hệ thống
  async function fetchData() {
    const response = await quyenTaiKhoanService.list({ pageIndex: _PAGEINDEX, pageSize: _PAGESIZE })
    if (response.data) setData(response.data.quyenHeThongs)
    else setData([])
  }

  //fetch chức năng
  async function fetchChucNang() {
    const response = await quyenTaiKhoanService.treeChucNang({ pageIndex: _PAGEINDEX, pageSize: _PAGESIZE })
    setDataChucNang(response.data)
  }

  //cột quyền
  const columns = [
    {
      title: "Tên quyền",
      dataIndex: "tenQuyen",
      key: "tenQuyen",
      width: '30%',
      sorter: data && data.length > 0 ? (a, b) => { return a.tenQuyen.length - b.tenQuyen.length } : false,
    },
    {
      title: "Mô tả",
      dataIndex: "ghiChu",
      key: "ghiChu",
      width: '50%',
      sorter: data && data.length > 0 ? (a, b) => { return a.ghiChu.length - b.ghiChu.length } : false,
    },

    {
      title: "Tác vụ",
      key: "action",
      width: '20%',
      render: row => (
        <Space size="middle">
          <Tooltip title="Sửa dữ liệu">
            <Button type="default" className="action-table" icon={<FormOutlined />} onClick={() => showModal(row)} ></Button>
          </Tooltip>
          <Tooltip title="Xóa dữ liệu">
            <Button type="default" className="action-table" icon={<DeleteOutlined />} onClick={() => confirmDelete(row.id)}></Button>
          </Tooltip>
        </Space>
      )
    }
  ];

  //xử lý tạo/sửa quyền tài khoản
  async function createUpdateHandler(data) {
    if (data.id) {
      //sửa
      const response = await quyenTaiKhoanService.update(data);
      if (response.statusCode === _STATUSCODE200) {
        _ARGS.message = _TIEUDESUATHANHCONG
        _ARGS.description = _NOIDUNGSUATHANHCONG
        notification.success(_ARGS)
      } else {
        _ARGS.message = _TIEUDESUATHATBAI
        _ARGS.description = response.message
        notification.error(_ARGS)
      }
    } else {
      //tạo
      const response = await quyenTaiKhoanService.create(data);
      if (response.statusCode === _STATUSCODE200) {
        _ARGS.message = _TIEUDETAOTHANHCONG
        _ARGS.description = _NOIDUNGTAOTHANHCONG
        notification.success(_ARGS)
      } else {
        _ARGS.message = _TIEUDETAOTHATBAI
        _ARGS.description = response.message
        notification.error(_ARGS)
      }
    }

    fetchData()
  };

  //set hiển thị modal
  const showModal = (data: any) => {
    if (data.id) {
      setRowKey(data)
    } else {
      setRowKey({})
    }
    setIsShowModal(true);
  };

  //đóng modal
  const closeModal = () => {
    setIsShowModal(false);
  };


  //hiển thị modal quyền tài khoản
  const modal = useMemo(() => (
    isShowModal &&
    <ModalQuyenTaiKhoan
      rowKey={rowKey}
      dataChucNang={dataChucNang}
      isShowModal={isShowModal}
      closeModal={closeModal}
      createUpdateHandler={createUpdateHandler}
    />
    // eslint-disable-next-line
  ), [isShowModal])
  async function deleteData(roleId: string) {
    const response = await quyenTaiKhoanService.delete(roleId);
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDEXOATHANHCONG
      _ARGS.description = _NOIDUNGXOATHANHCONG
      notification.success(_ARGS)
    } else {
      _ARGS.message = _TIEUDEXOATHATBAI
      _ARGS.description = response.message
      notification.error(_ARGS)
    }
    fetchData()
  }

  //xóa dữ liệu
  function confirmDelete(roleId: string) {
    const textModal = {
      title: _TIEUDECONFIRM,
      icon: <ExclamationCircleOutlined />,
      content: _NOIDUNGCONFRIM,
      okText: _NUTDONGY,
      cancelText: _NUTHUY,
      onOk: () => { deleteData(roleId) },
      onCancel: () => { },
      className: 'modal-confirm'
    };

    Confirm(textModal)
  }

  //tìm kiếm
  async function filterHandler(value: any) {
    if (value.timKiem === undefined || value.timKiem === '') return fetchData();
    let response = await quyenTaiKhoanService.search({ data: value.timKiem, pageIndex: _PAGEINDEX, pageSize: _PAGESIZE })
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDETIMKIEM
      _ARGS.description = _NOIDUNGTIMKIEMTHANHCONG
      notification.success(_ARGS)
      setData(response.data)
    } else {
      _ARGS.message = _TIEUDETIMKIEM
      _ARGS.description = response.message
      notification.error(_ARGS)
    }
  };

  useEffect(() => {
    fetchData();
    fetchChucNang()
  }, []);

  return (
    <div className="page-admin page-layout-content" id='page-admin'>
      <div className="page-admin--header">
        <div className="page-admin--header--title">
          <h2>Quản trị quyền</h2>
        </div>
        <div className="page-admin--header--form">
          <Form
            name="filter"
            layout="inline"
            form={form}
            className="filter"
            onFinish={filterHandler}
          >
            <Form.Item
              name="timKiem"
              className="filter-input-value"
              style={{ margin: '0' }}
            >
              <Input placeholder="Tìm theo tên quyền, mô tả" suffix={<SearchOutlined />} allowClear />
            </Form.Item>
          </Form>
          <div className="button-flex button-add ml-16">
            <Button className="button-primary" icon={<PlusOutlined />} onClick={() => showModal({})}>
              Tạo mới
            </Button>
          </div>
        </div>
      </div>
      <div className="page-admin--body">
        <ConfigProvider locale={viVN}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ defaultPageSize: 20, showSizeChanger: true }}
            locale={_KHONGCODULIEU}
            className="page--table"
          />
        </ConfigProvider>
      </div>
      {modal}
    </div>
  );
};

export default memo(QuyenHeThongTable);
