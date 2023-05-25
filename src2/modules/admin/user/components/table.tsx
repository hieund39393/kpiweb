import { memo, useEffect, useMemo, useState } from 'react';

//
import {
  Button,
  Space,
  Form,
  Input,
  notification,
  Table,
  Tooltip,
  Tag,
  ConfigProvider,
} from 'antd';
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  PlusOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import viVN from 'antd/lib/locale/vi_VN';
//
import Confirm from '../../../../core/components/modal/confirm';
import ModalTaiKhoan from './modalNguoiDung';
import ModalChucNang from './modalChucNang';
import ModalChiTieu from './modalChiTieu';

//
import TaiKhoanService from '../services/TaiKhoanService';

import {
  ChiTieuNguoiDungProps,
  ChucNangNguoiDungProps,
  DonViProps,
  RoleProps,
  TaiKhoanProps,
} from '../dtos/requests/UsersRequest';
import {
  _ARGS,
  _DANGHOATDONG,
  _GANQUYENCHITIEU,
  _GANQUYENCHUCNANG,
  _KHONGCODULIEU,
  _KHONGHOATDONG,
  _NOIDUNGCONFRIM,
  _NOIDUNGCONFRIMRESET,
  _NOIDUNGRESETTHANHCONG,
  _NOIDUNGSUATHANHCONG,
  _NOIDUNGTAOTHANHCONG,
  _NOIDUNGTIMKIEMTHANHCONG,
  _NOIDUNGXOATHANHCONG,
  _NUTDONGY,
  _NUTHUY,
  _PAGEINDEX,
  _PAGESIZE,
  _STATUSCODE200,
  _TIEUDECONFIRM,
  _TIEUDEGANQUYENTHANHCONG,
  _TIEUDEGANQUYENTHATBAI,
  _TIEUDERESETTHANHCONG,
  _TIEUDERESETTHATBAI,
  _TIEUDESUATHANHCONG,
  _TIEUDESUATHATBAI,
  _TIEUDETAOTHANHCONG,
  _TIEUDETAOTHATBAI,
  _TIEUDETIMKIEM,
  _TIEUDEXOATHANHCONG,
  _TIEUDEXOATHATBAI,
} from 'constant';
import '../user.css';

const taiKhoanService = TaiKhoanService.instance();

function NguoiDungTable() {
  // Dữ liệu bảng
  const [dataUsers, setDataUsers] = useState<TaiKhoanProps[]>([]);
  const [dataDonVi, setDataDonVi] = useState<DonViProps[]>([]);
  const [dataQuyen, setDataQuyen] = useState<RoleProps[]>([]);
  const [chucNangNguoiDung, setChucNangNguoiDung] = useState<ChucNangNguoiDungProps[]>([]);
  const [isShowCategory, setIsShowCategory] = useState(false);
  const [rowCategory, setRowCategory] = useState({});
  const [chiTieuNguoiDung, setChiTieuNguoiDung] = useState<ChiTieuNguoiDungProps[]>([]);
  //modal
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [rowKeyUser, setRowKeyUser] = useState({});
  const [isShowModalRole, setIsShowModalRole] = useState(false);
  const [rowKeyRole, setRowKeyRole] = useState({});
  const [form] = Form.useForm();

  // fetch người dùng
  async function fetchUser() {
    const response = await taiKhoanService.list({ pageIndex: _PAGEINDEX, pageSize: _PAGESIZE });
    if (response.data) setDataUsers(response.data.nguoiDungs);
    else setDataUsers([]);
  }

  // fetch đơn vị
  async function fetchDonVi() {
    let response = await taiKhoanService.listDonVi();
    if (response.data) setDataDonVi(response.data.donVis);
    else setDataDonVi([]);
  }

  // fetch quyền hệ thống
  async function fetchQuyen() {
    let response = await taiKhoanService.listQuyen();
    if (response.data) setDataQuyen(response.data.quyenHeThongs);
    else setDataQuyen([]);
  }

  useEffect(() => {
    fetchUser();
    fetchDonVi();
    fetchQuyen();
  }, []);

  // colums
  const columnsUser = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'tenDangNhap',
      key: 'tenDangNhap',
      width: '15%',
      sorter:
        dataUsers && dataUsers.length > 0
          ? (a, b) => {
              return a.tenDangNhap.length - b.tenDangNhap.length;
            }
          : false,
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: '25%',
      sorter:
        dataUsers && dataUsers.length > 0
          ? (a, b) => {
              return a.hoTen.length - b.hoTen.length;
            }
          : false,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'hoatDong',
      key: 'hoatDong',
      width: '15%',
      className: 'text-center',
      render: (text: any) =>
        text ? (
          <Tag color="green">{_DANGHOATDONG}</Tag>
        ) : (
          <Tag color="geekblue">{_KHONGHOATDONG}</Tag>
        ),
    },
    {
      title: 'Đơn vị',
      dataIndex: 'tenDonVi',
      key: 'tenDonVi',
      width: '25%',
      sorter:
        dataUsers && dataUsers.length > 0
          ? (a, b) => {
              return a.tenDonVi.length - b.tenDonVi.length;
            }
          : false,
    },
    {
      title: 'Tác vụ',
      key: 'action',
      width: '20%',
      render: (row) => (
        <Space size="middle">
          <Tooltip title="Reset mật khẩu">
            <Button
              type="primary"
              className="action-table"
              icon={<KeyOutlined />}
              onClick={() => showModalResetPassword(row)}
            ></Button>
          </Tooltip>
          <Tooltip title="Gán quyền chỉ tiêu">
            <Button
              type="primary"
              className="action-table"
              icon={<UserSwitchOutlined />}
              onClick={() => showModalCategory(row)}
            ></Button>
          </Tooltip>

          <Tooltip title="Gán quyền chức năng">
            <Button
              type="primary"
              className="action-table"
              icon={<SettingOutlined />}
              onClick={() => showModalRole(row)}
            ></Button>
          </Tooltip>
          <Tooltip title="Sửa dữ liệu">
            <Button
              type="primary"
              className="action-table"
              icon={<FormOutlined />}
              onClick={() => showModalUser(row)}
            ></Button>
          </Tooltip>
          <Tooltip title="Xóa dữ liệu">
            <Button
              type="default"
              className="action-table"
              icon={<DeleteOutlined />}
              onClick={() => confirmDelete(row.id)}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  //confirm reset password
  const showModalResetPassword = (data: any) => {
    const textModal = {
      title: _TIEUDECONFIRM,
      icon: <ExclamationCircleOutlined />,
      content: _NOIDUNGCONFRIMRESET,
      okText: _NUTDONGY,
      cancelText: _NUTHUY,
      onOk: () => {
        resetHandler(data.id);
      },
      onCancel: () => {},
      className: 'modal-confirm',
    };

    Confirm(textModal);
  };

  //reset pasword
  async function resetHandler(userId: string) {
    const response = await taiKhoanService.resettAsync({ userId });
    if (response.statusCode === 200) {
      _ARGS.message = _TIEUDERESETTHANHCONG;
      _ARGS.description = _NOIDUNGRESETTHANHCONG + '. Mật khẩu hiện tại là ' + response.data;
      notification.success(_ARGS);
    } else {
      _ARGS.message = _TIEUDERESETTHATBAI;
      _ARGS.description = response.message;
      notification.error(_ARGS);
    }
    fetchUser();
  }

  //set hiển thị modal đơn vị
  const showModalUser = async (data: any) => {
    if (data.id) {
      setRowKeyUser(data);
    } else {
      setRowKeyUser({});
    }
    setIsShowModalUser(true);
  };

  //xử lý tạo/sửa tài khoản
  async function createUpdateHandlerUser(data: any) {
    if (data && data.id) {
      //call api update
      const response = await taiKhoanService.update(data);
      if (response.statusCode === _STATUSCODE200) {
        _ARGS.message = _TIEUDESUATHANHCONG;
        _ARGS.description = _NOIDUNGSUATHANHCONG;
        notification.success(_ARGS);
      } else {
        _ARGS.message = _TIEUDESUATHATBAI;
        _ARGS.description = response.message;
        notification.error(_ARGS);
      }
    } else {
      //call api create
      const response = await taiKhoanService.create(data);
      if (response.statusCode === _STATUSCODE200) {
        _ARGS.message = _TIEUDETAOTHANHCONG;
        _ARGS.description = _NOIDUNGTAOTHANHCONG;
        notification.success(_ARGS);
      } else {
        _ARGS.message = _TIEUDETAOTHATBAI;
        _ARGS.description = response.message;
        notification.error(_ARGS);
      }
    }
    fetchUser();
  }

  //đóng modal tài khoản
  const closeModalUser = () => {
    setIsShowModalUser(false);
  };

  //hiển thị modal tài khoản
  const modalUser = useMemo(
    () =>
      isShowModalUser && (
        <ModalTaiKhoan
          dataDonVi={dataDonVi}
          dataQuyen={dataQuyen}
          rowKeyUser={rowKeyUser}
          isShowModalUser={isShowModalUser}
          closeModal={closeModalUser}
          createUpdateHandler={createUpdateHandlerUser}
        />
      ),
    // eslint-disable-next-line
    [isShowModalUser]
  );

  //set hiển thị modal gán quyền
  const showModalRole = async (data: any) => {
    if (data.id) {
      setRowKeyRole(data);
      const response = await taiKhoanService.listChucNangNguoiDung(data.id);
      setChucNangNguoiDung(response.data);
    }
    setIsShowModalRole(true);
  };

  //sửa gán quyền
  async function updateRoleHandler(data: any) {
    const response = await taiKhoanService.saveChucNangNguoiDung(data);
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDEGANQUYENTHANHCONG;
      _ARGS.description = _GANQUYENCHUCNANG;
      notification.success(_ARGS);
    } else {
      _ARGS.message = _TIEUDEGANQUYENTHATBAI;
      _ARGS.description = response.message;
      notification.error(_ARGS);
    }
  }

  //đóng modal gán quyền
  const closeRoleModal = () => {
    setIsShowModalRole(false);
  };

  //hiển thị modal gán quyền
  const modalRole = useMemo(
    () =>
      isShowModalRole && (
        <ModalChucNang
          rowKeyRole={rowKeyRole}
          chucNangNguoiDung={chucNangNguoiDung}
          // quyenHeThong={quyenHeThong}
          isShowModalRole={isShowModalRole}
          closeModal={closeRoleModal}
          updateHandler={updateRoleHandler}
        />
      ),
    // eslint-disable-next-line
    [isShowModalRole]
  );

  //set hiển thị category
  const showModalCategory = async (data: any) => {
    if (data.id) {
      setRowCategory(data);
      const response = await taiKhoanService.listChiTieuNguoiDung(data.id);
      setChiTieuNguoiDung(response.data);
    } else {
      setRowCategory({});
    }
    setIsShowCategory(true);
  };

  //đóng modal category
  const closeCategoryModal = () => {
    setIsShowCategory(false);
  };

  //sửa gán category
  async function updateCategoryHandler(data: any) {
    const response = await taiKhoanService.saveChiTieuNguoiDung(data);
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDEGANQUYENTHANHCONG;
      _ARGS.description = _GANQUYENCHITIEU;
      notification.success(_ARGS);
    } else {
      _ARGS.message = _TIEUDEGANQUYENTHATBAI;
      _ARGS.description = response.message;
      notification.error(_ARGS);
    }
  }

  //hiển thị modal category
  const modalCategory = useMemo(
    () =>
      isShowCategory && (
        <ModalChiTieu
          rowCategory={rowCategory}
          chiTieuNguoiDung={chiTieuNguoiDung}
          isShow={isShowCategory}
          closeModal={closeCategoryModal}
          updateHandler={updateCategoryHandler}
        />
      ),
    // eslint-disable-next-line
    [isShowCategory]
  );

  //xóa người dùng
  async function deleteHandler(userId: string) {
    const response = await taiKhoanService.delete(userId);
    if (response.statusCode === 200) {
      _ARGS.message = _TIEUDEXOATHANHCONG;
      _ARGS.description = _NOIDUNGXOATHANHCONG;
      notification.success(_ARGS);
    } else {
      _ARGS.message = _TIEUDEXOATHATBAI;
      _ARGS.description = response.message;
      notification.error(_ARGS);
    }
    fetchUser();
  }

  function confirmDelete(userId: string) {
    const textModal = {
      title: _TIEUDECONFIRM,
      icon: <ExclamationCircleOutlined />,
      content: _NOIDUNGCONFRIM,
      okText: _NUTDONGY,
      cancelText: _NUTHUY,
      onOk: () => {
        deleteHandler(userId);
      },
      onCancel: () => {},
      className: 'modal-confirm',
    };

    Confirm(textModal);
  }

  //tìm kiếm
  async function filterHandler(values: any) {
    if (values.timKiem === undefined || values.timKiem === '') return fetchUser();
    let response = await taiKhoanService.searchUser({
      data: values,
      pageIndex: _PAGEINDEX,
      pageSize: _PAGESIZE,
    });
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDETIMKIEM;
      _ARGS.description = _NOIDUNGTIMKIEMTHANHCONG;
      notification.success(_ARGS);
      setDataUsers(response.data.nguoiDungs);
    } else {
      _ARGS.message = _TIEUDETIMKIEM;
      _ARGS.description = response.message;
      notification.error(_ARGS);
    }
  }

  return (
    <div className="page-admin page-layout-content" id="page-admin">
      <div className="page-admin--header">
        <div className="page-admin--header--title">
          <h2>Tài khoản</h2>
        </div>
        <div className="page-admin--header--form">
          <Form
            name="filter-user"
            layout="inline"
            form={form}
            className="filter-user"
            onFinish={filterHandler}
          >
            <Form.Item name="timKiem" className="filter-input-value" style={{ margin: '0' }}>
              <Input
                placeholder="Tìm theo tên đăng nhập, tên đầy đủ"
                suffix={<SearchOutlined />}
                allowClear
              />
            </Form.Item>
          </Form>
          <div className="button-flex button-add ml-16">
            <Button
              className="button-primary"
              icon={<PlusOutlined />}
              onClick={() => showModalUser({})}
            >
              Tạo mới
            </Button>
          </div>
        </div>
      </div>
      <div className="page-admin--body">
        <ConfigProvider locale={viVN}>
          <Table
            columns={columnsUser}
            dataSource={dataUsers}
            pagination={{ defaultPageSize: 20, showSizeChanger: true }}
            locale={_KHONGCODULIEU}
            className="page--table"
          />
        </ConfigProvider>
      </div>
      {modalUser}
      {modalCategory}
      {modalRole}
    </div>
  );
}

export default memo(NguoiDungTable);
