import { memo, useEffect, useMemo, useState } from 'react';

//
import { Button, Space, Form, Input, Image, notification, message, Tooltip, Table } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";

//
import Confirm from "../../../../core/components/modal/confirm";
import ModalDonVi from './modal';
import icEdit from '../../../../assets/images/ic-edit.svg';
import icDelete from '../../../../assets/images/ic-delete.svg';

import * as route from '../route';
import QuestionService from '../services/QuestionService';

const questionService = QuestionService.instance();

//props type
interface QuestionProp {
  id: number
  cauHoi: string
  thuTuHienThi: number
}


const CauHoiBiMatTable = () => {
  // Dữ liệu bảng
  const [data, setData] = useState<QuestionProp[]>([]);

  // Modal
  const [isShowModal, setIsShowModal] = useState(false);
  const [rowKey, setRowKey] = useState({});

  const [form] = Form.useForm();

  async function fetchData() {
    let response = await questionService.list(route.list, null);
    setData(response.data)
  }

  //cột đơn vị
  const columns = [
    {
      title: "Câu hỏi",
      dataIndex: "cauHoi",
      key: "cauHoi"
    },

    {
      title: "Tác vụ",
      key: "action",
      render: row => (
        <Space size="middle">
          <Tooltip title="Sửa dữ liệu">
            <Button type="primary" className="action-table" icon={<Image preview={false} src={icEdit} alt="Sửa" />} onClick={() => showModal(row)}></Button>
          </Tooltip>
          <Tooltip title="Xóa dữ liệu">
            <Button type="default" className="action-table" icon={<Image preview={false} src={icDelete} alt="Xóa" />} onClick={() => confirmDelete(row.id)}></Button>
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

  //xử lý tạo/sửa đơn vị
  async function createUpdateHandler(cauHoi: any) {
    if (cauHoi.id) {
      //call api update
      await questionService.update(cauHoi)
      notification.success(message['Sửa thành công'])
    } else {
      //call api create
      await questionService.create(cauHoi)
      notification.success(message['Tạo thành công'])
    }

    fetchData()
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

  async function deleteHandler(cauHoiId: string) {
    await questionService.delete(cauHoiId);
    notification.success(message['Xóa thành công'])
    fetchData()
  }

  //xóa dữ liệu
  function confirmDelete(cauHoiId: string) {
    const textModal = {
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn chắc chắn muốn xóa trường này?',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: () => { deleteHandler(cauHoiId) },
      onCancel: () => { },
      className: 'modal-confirm'
    };

    Confirm(textModal)
  }

  const filterTable = (values: any) => {
  };

  useEffect(() => {
    fetchData();
  }, []);

  let localeText = {
    emptyText: "Không tìm thấy dữ liệu nào",
  };

  return (
    <div className="page-question layout-page-content">

      {/* header */}
      <div className="page-question--title content-header">
        <h2>Quản lý đơn vị</h2>
      </div>
      {/*end header */}

      {/* content */}
      <div className="page-question--content content-body">
        <div className="page-question--content--action content-body--filter">
          <Form
            name="filter"
            layout="inline"
            form={form}
            className="filter"
            onFinish={filterTable}
          >
            <Form.Item
              name="timKiem"
              className="filter-input-value"
            >
              <Input placeholder="Nhập thông tin" />
            </Form.Item>
            <Form.Item>
              <Button type="default" htmlType="submit" className="button-primary">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>

          {/*thao tác với bảng */}
          <div className="action">
            <div className="action--add">

              <Button className="button-primary" icon={<PlusOutlined />} onClick={() => showModal({})}>
                Tạo mới
              </Button>
            </div>
          </div>
          {/*kết thúc */}
        </div>


        {/*bảng dữ liệu */}
        <Table
          dataSource={data}
          columns={columns}
          locale={localeText}
        />
        {/*kết thúc */}
      </div>
      {/* end content */}

      {/*hiển thị modal  */}
      {modal}
      {/*kết thúc */}
    </div>
  )
}
export default memo(CauHoiBiMatTable);