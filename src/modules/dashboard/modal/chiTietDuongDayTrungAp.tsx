import { Button, Modal, Form, Table } from 'antd';
import { _DAYFORMAT, _DAYFORMATEN, _FALSE, _PAGEINDEX, _PAGESIZE } from 'constant';
import 'moment/locale/vi';
import { useEffect, useState } from 'react';
import '../assets/css/style.css';
import type { ColumnsType } from 'antd/es/table';
import httpService from 'core/infrastructure/services/httpService';
import { KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN_TRUNG_AP } from 'modules/shared/menu/routes';
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

function ChiTietDuongDayTrungAp({ ngayBaoCao, tanSuat, isShowModal, closeModal }) {
  const [form] = Form.useForm();

  const [data, setData] = useState<any>([]);

  const getBangBaoCaoChiTieu = async () => {
    const res = await httpService.get(
      KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN_TRUNG_AP +
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
      title: 'Đường dây không (km)',
      dataIndex: 'duongDayKhong',
      key: 'dienap',
      render: (text, record) => {
        if (record.stt !== "") {
          return <strong>{text}</strong>
        } else {
          return text;
        }
      }
    },
    {
      title: 'Cáp ngầm (km)',
      dataIndex: 'capNgam',
      key: 'capNgam',
      align: 'center',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    },
    {
      title: 'Tổng cổng ĐZ (km)',
      dataIndex: 'tongCongDZ',
      key: 'tongCongDZ',
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

export default ChiTietDuongDayTrungAp;
