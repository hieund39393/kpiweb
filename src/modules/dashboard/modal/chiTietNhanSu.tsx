import { Button, Modal, Form, Table } from 'antd';
import { _DAYFORMAT, _DAYFORMATEN, _FALSE, _PAGEINDEX, _PAGESIZE } from 'constant';
import 'moment/locale/vi';
import { useEffect, useState } from 'react';
import '../assets/css/style.css';
import type { ColumnsType } from 'antd/es/table';
import httpService from 'core/infrastructure/services/httpService';
import { QUAN_TRI_NHAN_SU } from 'modules/shared/menu/routes';
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

function ChiTietCongTo({ ngayBaoCao, tanSuat, isShowModal, closeModal }) {
  const [form] = Form.useForm();

  const [data, setData] = useState<any>([]);

  const getBangBaoCaoChiTieu = async () => {
    const res = await httpService.get(
      QUAN_TRI_NHAN_SU +
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
      title: 'Tổng số nhân sự',
      children: [
        {
          title: 'Lao động hiện tại',
          dataIndex: 'laoDongHienTai',
          key: 'laoDongHienTai',
        },
        {
          title: 'Lao động bình quân',
          dataIndex: 'laoDongBinhQuan',
          key: 'laoDongBinhQuan',
        },
      ],
    },
    {
      title: 'Biến động nhân sự',
      children: [
        {
          title: 'Tuyển dụng mới',
          dataIndex: 'tuyenDungMoi',
          key: 'tuyenDungMoi',
        },
        {
          title: 'Nghỉ hưu',
          dataIndex: 'nghiHuu',
          key: 'nghiHuu',
        },
        {
          title: 'Chấm dứt HĐLĐ',
          dataIndex: 'chamDutHD',
          key: 'chamDutHDLD',
        },
        {
          title: 'Thuyên chuyển công tác',
          dataIndex: 'thuyenChuyen',
          key: 'thuyenChuyenCongTac',
        },
      ],
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

export default ChiTietCongTo;
