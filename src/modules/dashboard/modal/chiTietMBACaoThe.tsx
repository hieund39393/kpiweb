import { Button, Modal, Form, Table } from 'antd';
import { _DAYFORMAT, _DAYFORMATEN, _FALSE, _PAGEINDEX, _PAGESIZE } from 'constant';
import 'moment/locale/vi';
import { useEffect, useState } from 'react';
import '../assets/css/style.css';
import type { ColumnsType } from 'antd/es/table';
import httpService from 'core/infrastructure/services/httpService';
import { CHI_TIET_MBA } from 'modules/shared/menu/routes';
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

function ChiTietMBACaoThe({ ngayBaoCao, tanSuat, isShowModal, closeModal }) {
  const [form] = Form.useForm();

  const [data, setData] = useState<any>([]);

  const getBangBaoCaoChiTieu = async () => {
    const res = await httpService.get(
      CHI_TIET_MBA +
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
      title: 'STT',
      dataIndex: 'stt',
      width: '5%',
      key: 'stt',
      align: 'center',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    },
    {
      title: 'Máy biến áp',
      dataIndex: 'mayBienAp',
      key: 'mayBienAp',
      render: (text, record) => {
        if (record.stt !== "") {
          return <strong>{text}</strong>
        } else {
          return text;
        }
      }
    },
    {
      title: 'Công suất',
      dataIndex: 'congSuat',
      key: 'congSuat',
      align: 'center',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    },    
    {
      title: 'Điện áp cuộn dây',
      dataIndex: 'dienApCuonDay',
      key: 'dienApCuonDay',
      align: 'center',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    },  
    {
      title: 'Tỷ lệ công suất',
      dataIndex: 'tyLeCongSuat',
      key: 'tyLeCongSuat',
      align: 'center',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    }, 
    {
      title: 'Xuất xứ',
      dataIndex: 'xuatXu',
      key: 'xuatXu',
      align: 'center',
    }, 
    {
      title: 'Sở hữu',
      dataIndex: 'soHuu',
      key: 'soHuu',
      align: 'center',
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

export default ChiTietMBACaoThe;
