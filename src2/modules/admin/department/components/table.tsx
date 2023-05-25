import { memo, useEffect, useMemo, useState } from 'react';
// import {
//   Link
// } from 'react-router-dom'
// import FileSaver from 'file-saver';
//
import { Button, Space, Form, Input, notification, Table, Tooltip, Checkbox, ConfigProvider } from 'antd';
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import viVN from 'antd/lib/locale/vi_VN';

//
import Confirm from "../../../../core/components/modal/confirm";
import ModalDonVi from './modal';

import DonViService from "../services/DonViService"
// import LocalStorageService from '../../../../core/infrastructure/services/localStorageService';
// import { importExcel } from '../route';
import { DonViProps } from '../dtos/requests/DonViRequest';
import {
  _ARGS,
  _KHONGCODULIEU,
  _NOIDUNGCONFRIM,
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
  _TIEUDESUATHANHCONG,
  _TIEUDESUATHATBAI,
  _TIEUDETAOTHANHCONG,
  _TIEUDETAOTHATBAI,
  _TIEUDETIMKIEM,
  _TIEUDEXOATHANHCONG,
  _TIEUDEXOATHATBAI
} from 'constant';

import '../department.css'

const donViService = DonViService.instance();
// const localStorageService = LocalStorageService.instance()


const DonViTable = () => {
  // Dữ liệu bảng
  const [data, setData] = useState<DonViProps[]>([]);

  // Modal
  const [isShowModal, setIsShowModal] = useState(false);
  const [rowKey, setRowKey] = useState({});

  const [form] = Form.useForm();

  async function fetchData() {
    let response = await donViService.list();
    if (response.data) setData(response.data.donVis)
    else setData([])
  }

  // const uploadFileExcel = () => {
  //   const response = donViService.uploadFile();
  //   return response;
  // }

  // const token = localStorageService.getToken();
  // const configUpload = {
  //   name: "FileExcel",
  //   accept: ".xlsx",
  //   multiple: true,
  //   maxCount: 1,
  //   headers: {
  //     "Authorization": "Bearer " + token,
  //   },
  //   action: importExcel,
  //   onChange(info) {
  //     const status = info.file.status;

  //     // if (status !== "uploading") {
  //     //   console.log(info.file, info.fileList);
  //     // }
  //     if (status === "done") {
  //       const args = {
  //         message: 'Nhập dữ liệu thành công',
  //         description: info.file.response.message + ' ' + info.file.name,
  //         duration: 5,
  //       };
  //       notification.success(args);
  //     } else if (status === "error") {
  //       const args = {
  //         message: 'Nhập dữ liệu thất bại',
  //         description: info.file.response.message + ' ' + info.file.name,
  //         duration: 5,
  //       };
  //       notification.error(args);
  //     }
  //   }
  // };

  //cột đơn vị
  const columns = [
    {
      title: "Mã đơn vị",
      dataIndex: "maDonVi",
      key: "maDonVi",
      width: '15%',
      sorter: data && data.length > 0 ? (a, b) => { return a.maDonVi.length - b.maDonVi.length } : false,
    },
    {
      title: "Tên đơn vị",
      dataIndex: "tenDonVi",
      key: "tenDonVi",
      width: '50%',
      sorter: data && data.length > 0 ? (a, b) => { return a.tenDonVi.length - b.tenDonVi.length } : false,
    },
    {
      title: "Tổng công ty",
      dataIndex: "laTongCongTy",
      key: "laTongCongTy",
      className: 'text-center',
      width: '15%',
      render: (text: boolean) => text ? <Checkbox disabled checked={true} ></Checkbox> : ''
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

  //set hiển thị modal đơn vị
  const showModal = (row: any) => {
    if (row.id) {
      setRowKey(row)
    } else {
      setRowKey({})
    }
    setIsShowModal(true);
  };

  //đóng modal đơn vị
  const closeModal = () => {
    setIsShowModal(false);
  };

  //hiển thị modal đơn vị
  const modal = useMemo(() => (
    isShowModal &&
    <ModalDonVi
      rowKey={rowKey}
      isShowModal={isShowModal}
      closeModal={closeModal}
      createUpdateHandler={createUpdateHandler}
    />
    // eslint-disable-next-line
  ), [isShowModal])

  //xử lý tạo/sửa đơn vị
  async function createUpdateHandler(donVi: any) {
    if (donVi.id) {
      //call api update
      const response = await donViService.update(donVi);
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
      //call api create
      const response = await donViService.create(donVi)
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

  async function deleteHandler(donViId: string) {
    const response = await donViService.delete(donViId);
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
  function confirmDelete(donViId: string) {
    const textModal = {
      title: _TIEUDECONFIRM,
      icon: <ExclamationCircleOutlined />,
      content: _NOIDUNGCONFRIM,
      okText: _NUTDONGY,
      cancelText: _NUTHUY,
      onOk: () => { deleteHandler(donViId) },
      onCancel: () => { },
      className: 'modal-confirm'
    };

    Confirm(textModal)
  }

  async function filterHandler(values: any) {
    if (values.timKiem === undefined || values.timKiem === '') return fetchData();
    const value = values.timKiem
    let response = await donViService.search({ data: value, pageIndex: _PAGEINDEX, pageSize: _PAGESIZE })
    if (response.statusCode === _STATUSCODE200) {
      _ARGS.message = _TIEUDETIMKIEM
      _ARGS.description = _NOIDUNGTIMKIEMTHANHCONG
      notification.success(_ARGS)
      setData(response.data.donVis)
    } else {
      _ARGS.message = _TIEUDETIMKIEM
      _ARGS.description = response.message
      notification.error(_ARGS)
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  // const saveFile = () => {
  //   FileSaver.saveAs(
  //     process.env.PUBLIC_URL + "/assets/file/DonVi_Templates.xlsx",
  //     "DonVi_Templates.xlsx"
  //   );
  // }

  return (
    <div className="page-admin page-layout-content">
      <div className="page-admin--header">
        <div className="page-admin--header--title">
          <h2>Danh mục đơn vị</h2>
        </div>
        <div className="page-admin--header--form">
          <Form
            name="filter-department"
            layout="inline"
            form={form}
            className="filter-department"
            onFinish={filterHandler}
          >
            <Form.Item
              name="timKiem"
              className="filter-input-value"
              style={{ margin: '0' }}
            >
              <Input placeholder="Tìm theo mã, tên đơn vị" suffix={<SearchOutlined />} allowClear />
            </Form.Item>
          </Form>
          {/* <div className="button-flex button-template ml-16">
            <Link to={'/admin/don-vi'} onClick={saveFile}>
              <Button icon={<VerticalAlignBottomOutlined />}>Template</Button>
            </Link>
          </div>
          <div className="button-flex button-upload ml-16">
            <Upload {...donViService.configUpload} >
              <Button icon={<VerticalAlignTopOutlined />}>Import</Button>
            </Upload>
          </div> */}
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
            dataSource={data}
            columns={columns}
            pagination={{ defaultPageSize: 20, showSizeChanger: true }}
            locale={_KHONGCODULIEU}
            className="page--table"
          />
        </ConfigProvider>
      </div>

      {modal}
    </div>
  )
}
export default memo(DonViTable);