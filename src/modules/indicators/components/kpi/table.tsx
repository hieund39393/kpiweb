
import { memo, useEffect, useMemo, useState } from "react";
import { notification, Tooltip, Button, Table, ConfigProvider, Space, Tag } from "antd";
import {
  _ARGS,
  _KHONGCODULIEU,
  // _NOIDUNGCONFRIM,
  _NOIDUNGSUATHANHCONG,
  _NOIDUNGTAOTHANHCONG,
  // _NOIDUNGXOATHANHCONG,
  // _NUTDONGY,
  // _NUTHUY,
  _STATUSCODE200,
  // _TIEUDECONFIRM,
  _TIEUDESUATHANHCONG,
  _TIEUDESUATHATBAI,
  _TIEUDETAOTHANHCONG,
  _TIEUDETAOTHATBAI,
  // _TIEUDEXOATHANHCONG,
  // _TIEUDEXOATHATBAI,
  _PAGEINDEX, _PAGESIZE
} from "../../../../constant";

import {
  // ExclamationCircleOutlined,
  PlusOutlined,
  FormOutlined,
  // DeleteOutlined,
} from "@ant-design/icons";
import viVN from 'antd/lib/locale/vi_VN';

import { DanhMucChiTieuProps } from "../../dtos/requests/KpiRequest";
import KpiService from "../../services/KpiService";
import ModalDanhMucChiTieu from './modal';
// import Confirm from "../../../../core/components/modal/confirm";

const kpiService = KpiService.instance()

function DanhMucChiTieu() {
  const [data, setData] = useState<DanhMucChiTieuProps[]>([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [rowKey, setRowKey] = useState({})
  const [root, setRoot] = useState<Array<number>>([])
  const [group, setGroup] = useState<Array<number>>([])
  //fetch danh mục chỉ tiêu
  async function fetchDanhMuc() {
    const response = await kpiService.listDanhMuc({ pageIndex: _PAGEINDEX, pageSize: _PAGESIZE })
    if (response.data) {
      let arrRoot: number[] = [];
      let arrGroup: number[] = []
      // eslint-disable-next-line
      response.data.chiTieus.map(item => {
        arrRoot.push(item.rootID);
        arrGroup.push(item.parentID);
      })
      setRoot(arrRoot);
      setGroup(arrGroup);
      setData(response.data.chiTieus)
    }
    else setData([])
  }

  const columns = [
    {
      title: 'Tên chỉ tiêu',
      dataIndex: 'tenChiTieu',
      key: 'tenChiTieu',
      width: '20%',
      sorter: (a, b) => { return a.tenChiTieu.length - b.tenChiTieu.length },
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'donViDo',
      key: 'donViDo',
      width: '8%',
    },
    // {
    //   title: 'Reported ID',
    //   dataIndex: 'reportedID',
    //   key: 'reportedID',
    //   width: '12%',
    //   className: 'text-right',
    //   sorter: (a, b) => { return a.reportedID - b.reportedID },
    // },
    // {
    //   title: 'Root ID',
    //   dataIndex: 'rootID',
    //   key: 'rootID',
    //   width: '8%',
    //   className: 'text-right',
    //   sorter: (a, b) => { return a.rootID - b.rootID },
    // },
    // {
    //   title: 'Group ID',
    //   dataIndex: 'groupID',
    //   key: 'groupID',
    //   width: '8%',
    //   className: 'text-right',
    //   sorter: (a, b) => { return a.groupID - b.groupID },
    // },
    {
      title: 'Áp dụng tháng',
      dataIndex: 'applyYearToMonth',
      key: 'applyYearToMonth',
      width: '10%',
      className: 'text-center',
      render: (text: null) => text ? <Tag color="green">True</Tag> : <Tag color="geekblue">False</Tag>
    },
    {
      title: 'Có giá trị kế hoạch',
      dataIndex: 'coGiaTriKeHoach',
      key: 'coGiaTriKeHoach',
      width: '10%',
      className: 'text-center',
      render: (text: null) => text ? <Tag color="green">True</Tag> : <Tag color="geekblue">False</Tag>
    },
    {
      title: 'Có dữ liệu mức đơn vị',
      dataIndex: 'coDuLieuMucDonVi',
      key: 'coDuLieuMucDonVi',
      width: '13%',
      className: 'text-center',
      render: (text: null) => text ? <Tag color="green">True</Tag> : <Tag color="geekblue">False</Tag>
    },
    {
      title: 'Có dữ liệu theo ngày',
      dataIndex: 'coDuLieuNgay',
      key: 'coDuLieuNgay',
      width: '12%',
      className: 'text-center',
      render: (text: null) => text ? <Tag color="green">True</Tag> : <Tag color="geekblue">False</Tag>,
    },
    {
      title: "Tác vụ",
      key: "action",
      width: '10%',
      render: (text, row) => (
        <Space size="middle">
          <Tooltip title="Sửa dữ liệu">
            <Button type="default" className="action-table" icon={<FormOutlined />} onClick={() => showModal(row)} ></Button>
          </Tooltip>
          {/* <Tooltip title="Xóa dữ liệu">
            <Button type="default" className="action-table" icon={<DeleteOutlined />} onClick={() => confirmDelete(row.id)}></Button>
          </Tooltip> */}
        </Space>
      )
    }
  ]

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

  //xử lý tạo/sửa đơn vị
  async function createUpdateHandler(chiTieu: any) {
    if (chiTieu.id) {
      //call api update
      const response = await kpiService.updateDanhMuc(chiTieu);
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
      const response = await kpiService.createDanhMuc(chiTieu)
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

    fetchDanhMuc()
  };

  // async function deleteHandler(chiTieuID: string) {
  //   const response = await kpiService.deleteDanhMuc(chiTieuID);
  //   if (response.statusCode === _STATUSCODE200) {
  //     _ARGS.message = _TIEUDEXOATHANHCONG
  //     _ARGS.description = _NOIDUNGXOATHANHCONG
  //     notification.success(_ARGS)
  //   } else {
  //     _ARGS.message = _TIEUDEXOATHATBAI
  //     _ARGS.description = response.message
  //     notification.error(_ARGS)
  //   }

  //   fetchDanhMuc()
  // }

  //xóa dữ liệu
  // function confirmDelete(chiTieuID: string) {
  //   const textModal = {
  //     title: _TIEUDECONFIRM,
  //     icon: <ExclamationCircleOutlined />,
  //     content: _NOIDUNGCONFRIM,
  //     okText: _NUTDONGY,
  //     cancelText: _NUTHUY,
  //     onOk: () => { deleteHandler(chiTieuID) },
  //     onCancel: () => { },
  //     className: 'modal-confirm'
  //   };

  //   Confirm(textModal)
  // }

  //hiển thị modal đơn vị
  const modal = useMemo(() => (
    isShowModal &&
    <ModalDanhMucChiTieu
      rowKey={rowKey}
      isShowModal={isShowModal}
      closeModal={closeModal}
      createUpdateHandler={createUpdateHandler}
      root={root}
      group={group}
    />
    // eslint-disable-next-line
  ), [isShowModal])


  useEffect(() => {
    fetchDanhMuc()
  }, [])

  return (
    <div className="page-admin page-layout-content">
      <div className="page-admin--header">
        <div className="page-admin--header--title">
          <h2 >Quản lý chỉ tiêu</h2>
        </div>
        <div className="page-admin--header--form">
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

export default memo(DanhMucChiTieu);