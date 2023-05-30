import { useEffect, useState } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import httpService from 'core/infrastructure/services/httpService';
import { BANG_BAO_CAO_CHI_TIEU } from 'modules/shared/menu/routes';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filter from '../finlter';

interface MenuItem {
  label: string;
  value: string;
}

interface BangChiTietProps {
  chiTieu: MenuItem[];
  value: string;
}

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

interface InputValue {
  ngayBaoCao: string;
  tanSuat: string;
}

const ChiTieuTable = ({ history }) => {
  const location = useLocation();
  const { chiTieu, value } = location.state;

  const [data, setData] = useState<DataType[]>([]);

  const [inputValue, setInputValue] = useState<InputValue>({
    ngayBaoCao: '',
    tanSuat: 'm',
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record) => {
        if (record.chiTieuCha === true) {
          return <strong className="view-chart">{text}</strong>;
        }
        return (
          <span
            className="view-chart"
            onClick={() => handleViewChart(record.id, record.idChiTieuCha)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: 'Tên chỉ tiêu',
      dataIndex: 'tenChiTieu',
      key: 'tenChiTieu',
      render: (text, record) => {
        if (record.chiTieuCha === true) {
          return <strong className="view-chart">{text}</strong>;
        }
        return (
          <span
            className="view-chart"
            onClick={() => handleViewChart(record.id, record.idChiTieuCha)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'donViTinh',
      key: 'donViTinh',
      render: (text, record) => {
        if (record.chiTieuCha === true) {
          return <strong>{text}</strong>;
        }
        return text;
      },
    },
    {
      title: 'Kế hoạch giao',
      dataIndex: 'keHoachGiao',
      key: 'keHoachGiao',
      align: 'right',
      render: (text, record) => {
        if (record.chiTieuCha === true) {
          return <strong>{text}</strong>;
        }
        return text;
      },
    },
    {
      title: 'Giá trị thực hiện',
      dataIndex: 'giaTriThucHien',
      key: 'giaTriThucHien',
      align: 'right',
      render: (text, record) => {
        if (record.chiTieuCha === true) {
          return <strong>{text}</strong>;
        }
        return text;
      },
    },
    {
      title: 'Lũy kế thực hiện',
      dataIndex: 'luyKeThucHien',
      key: 'luyKeThucHien',
      align: 'right',
      render: (text, record) => {
        if (record.chiTieuCha === true) {
          return <strong>{text}</strong>;
        }
        return text;
      },
    },
    {
      title: 'So sánh TH/Kế hoạch (%)',
      dataIndex: 'soSanhTHKeHoach',
      key: 'soSanhTHKeHoach',
      align: 'right',
      render: (text, record) => {
        if (record.chiTieuCha === true) {
          return <strong>{text}</strong>;
        }
        return text;
      },
    },
    {
      title: 'So sánh với cùng kỳ năm trước (%)',
      dataIndex: 'soSanhVoiCungKyNamTruoc',
      key: 'soSanhVoiCungKyNamTruoc',
      align: 'right',
      render: (text, record) => {
        if (record.chiTieuCha === true) {
          return <strong>{text}</strong>;
        }
        return text;
      },
    },
  ];
  useEffect(() => {
    getBangBaoCaoChiTieu();
  }, [chiTieu, value, inputValue]);

  const getBangBaoCaoChiTieu = async () => {
    let ids = value;
    if (value.startsWith('0')) {
      ids = chiTieu.filter((x) => !x.value.startsWith('0')).map((item) => parseInt(item.value));
    }
    const res = await httpService.get(
      BANG_BAO_CAO_CHI_TIEU +
        `?ids=${ids}&ngayBaoCao=${inputValue?.ngayBaoCao}&tanSuat=${inputValue?.tanSuat}`,
      null
    );
    setData(res);
  };

  const getBangBaoCaoChiTieu2 = async (value) => {
    let ids = value;
    if (value.startsWith('0')) {
      ids = chiTieu.filter((x) => !x.value.startsWith('0')).map((item) => parseInt(item.value));
    }
    const res = await httpService.get(
      BANG_BAO_CAO_CHI_TIEU +
        `?ids=${ids}&ngayBaoCao=${inputValue?.ngayBaoCao}&tanSuat=${inputValue?.tanSuat}`,
      null
    );
    setData(res);
  };

  const handleViewChart = (chiTieuId, chiTieuChaId) => {
    history.push('/dashboard', { chiTieuId: chiTieuId, chiTieuChaId: chiTieuChaId });
  };

  console.log('inputValue' + inputValue);

  return (
    <div className="layout-page-content page-layout-content" id="dashboard">
      <Filter setInput={setInputValue} ids={value} />
      <div id="bangChiTiet" style={{ width: '100%' }}>
        <Select
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            width: '100%',
          }}
          defaultValue={value ?? chiTieu[0].value}
          onChange={getBangBaoCaoChiTieu2}
          options={chiTieu?.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
        />
        <div style={{ margin: 10 }}>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChiTieuTable);