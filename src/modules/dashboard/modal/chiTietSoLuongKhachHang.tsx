import { Button, Modal, Form, Table } from 'antd';
import { _DAYFORMAT, _DAYFORMATEN, _FALSE, _PAGEINDEX, _PAGESIZE } from 'constant';
import 'moment/locale/vi';
import { useEffect, useState } from 'react';
import '../assets/css/style.css';
import type { ColumnsType } from 'antd/es/table';
import httpService from 'core/infrastructure/services/httpService';
import { SO_LUONG_KHACH_HANG } from 'modules/shared/menu/routes';
import './sanluongdien.css';

interface DataType {
  id: number;
  stt: string;
  tenChiTieu: string;
  donViTinh: string;
  keHoachGiao: string;
  giaTriThucHien: string;
  luyKeThucHien: string;
  soSanhTHKeHoach: string;
  soSanhVoiCungKyNamTruoc: string;
  chiTieuCha: boolean;
  idChiTieuCha: number;
}

function ChiTietTBAHaAp({ ngayBaoCao, tanSuat, isShowModal, closeModal }) {
  const [form] = Form.useForm();

  const [data, setData] = useState<any>([]);

  const getBangBaoCaoChiTieu = async () => {
    const res = await httpService.get(
      SO_LUONG_KHACH_HANG +
      `?donViId=&ngayBaoCao=${ngayBaoCao}`,
      null
    );
    setData(res);
  };

  useEffect(() => {
    getBangBaoCaoChiTieu();
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: 'Phân loại',
      dataIndex: 'phanLoai',
      key: 'phanLoai',
      render: (text, record) => {
        if (record.stt !== "") {
          return <strong>{text}</strong>
        } else {
          return text;
        }
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      key: 'soLuong',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    },
  ];
  return (
    <Modal
      visible={isShowModal}
      onCancel={closeModal}
      className="modal-sanluong"
      width={'80%'}
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          Đóng lại
        </Button>,
      ]}
    >
      <div className="modal-detail" id="bangChiTiet">
        <Table
          columns={columns}
          dataSource={data?.map((item) => ({ ...item, key: item.id }))}
          rowKey={(record) => record.id}
          bordered
          scroll={{ y: 530 }}
        />
      </div>
    </Modal>
  );
}

export default ChiTietTBAHaAp;
