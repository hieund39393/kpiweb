import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import httpService from 'core/infrastructure/services/httpService';
import {
  KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN,
  KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN1,
} from 'modules/shared/menu/routes';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filter from '../finlter';

import ChiTietTBA from 'modules/dashboard/modal/chiTietTBACaoThe';
import ChiTietMBA from 'modules/dashboard/modal/chiTietMBACaoThe';

interface InputValue {
  ngayBaoCao: string;
  tanSuat: string;
  donViId: number;
}

const KhoiLuongQuanLyVanHanhLuoiDien = () => {
  const location = useLocation();

  const { chiTieu, value } = location.state;

  localStorage.setItem('chiTieuST', JSON.stringify(chiTieu));

  const [data, setData] = useState<any>([]);
  const [data1, setData1] = useState<any>([]);
  const [modalSanLuongDonVi, setModalSanLuongDonVi] = useState(false);
  const [modalSanLuongDonVi1, setModalSanLuongDonVi1] = useState(false);

  const [inputValue, setInputValue] = useState<InputValue>({
    ngayBaoCao: '',
    tanSuat: 'm',
    donViId: 1,
  });

  const [idChiTieu, setIDChiTieu] = useState<number>(value);

  const handleShowSanLuongDonVi = () => {
    setModalSanLuongDonVi(true);
  };
  const handleCloseSanLuongDonVi = () => {
    setModalSanLuongDonVi(false);
  };


  const handleShowSanLuongDonVi1 = () => {
    setModalSanLuongDonVi1(true);
  };
  const handleCloseSanLuongDonVi1 = () => {
    setModalSanLuongDonVi1(false);
  };

  const modalSL = useMemo(
    () =>
      modalSanLuongDonVi && (
        <ChiTietTBA
          isShowModal={modalSanLuongDonVi}
          ngayBaoCao={inputValue.ngayBaoCao}
          tanSuat={inputValue.tanSuat}
          closeModal={handleCloseSanLuongDonVi}
        />
      ),
    [modalSanLuongDonVi]
  );

  const modalSL1 = useMemo(
    () =>
      modalSanLuongDonVi1 && (
        <ChiTietMBA
          isShowModal={modalSanLuongDonVi1}
          ngayBaoCao={inputValue.ngayBaoCao}
          tanSuat={inputValue.tanSuat}
          closeModal={handleCloseSanLuongDonVi1}
        />
      ),
    [modalSanLuongDonVi1]
  );

  const columns1: ColumnsType<any> = [
    {
      title: 'Điện áp',
      dataIndex: 'dienAp',
      key: 'dienAp',
    },
    {
      title: 'Đường dây không (km)',
      dataIndex: 'duongDayKhong',
      key: 'duongDayKhong',
      align: 'center',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
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

  const columns2: ColumnsType<any> = [
    {
      title: 'Điện áp',
      dataIndex: 'dienAp',
      key: 'dienAp',
    },
    {
      title: 'Tổng số trạm biến áp',
      dataIndex: 'tongSoTramBienAp',
      key: 'tongSoTramBienAp',
      align: 'center',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    },
    {
      title: 'Tổng số máy biến áp',
      dataIndex: 'tongSoMayBienAp',
      key: 'tongSoMayBienAp',
      align: 'center',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    },
    {
      title: 'Tổng công suất (MVA)',
      dataIndex: 'tongCongSuatMVA',
      key: 'tongCongSuatMVA',
      render: (text, record) => {
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
    },
  ];

  useEffect(() => {
    getBangBaoCaoChiTieu();
    getBangBaoCaoChiTieu1();
    const spanElement = document.querySelector('#bangChiTiet .ant-select-selection-item');
    if (spanElement) {
      if (chiTieu[0]?.value.toString() === idChiTieu.toString()) {
        spanElement.textContent = chiTieu[0]?.label;
      } else if (chiTieu[0]?.label) {
        const titleName = chiTieu.filter((x) => x.value.toString() === idChiTieu.toString());
        spanElement.textContent = `${chiTieu[0].label.split('(')[0]} ${'>'} ${titleName[0].label}`;
      }
    }
  }, [chiTieu, value, inputValue]);

  const getBangBaoCaoChiTieu = async () => {
    const res = await httpService.get(
      KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN +
        `?donViId=${inputValue?.donViId}&ngayBaoCao=${inputValue?.ngayBaoCao}`,
      null
    );
    setData(res);
  };
  const getBangBaoCaoChiTieu1 = async () => {
    const res = await httpService.get(
      KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN1 +
        `?donViId=${inputValue?.donViId}&ngayBaoCao=${inputValue?.ngayBaoCao}`,
      null
    );
    setData1(res);
  };

  return (
    <div className="layout-page-content page-layout-content" id="dashboard">
      <Filter setInput={setInputValue} ids={value} />
      <div id="bangChiTiet" style={{ width: '100%' }}>
        <>
          <Select
            style={{
              paddingLeft: 10,
              paddingTop: 10,
              width: '100%',
            }}
            defaultValue={idChiTieu}
            // onChange={getBangBaoCaoChiTieu2}
            options={chiTieu?.map((option, index) => ({
              label: option.label,
              value: option.value,
              style: index === 0 ? { fontWeight: 'bold' } : {},
            }))}
          />
        </>
        <div style={{ margin: 10 }}>
          <div style={{ marginBottom: 10 }}>
            <h3>1.1. Đường dây (km)</h3>
          </div>
          <Table
            pagination={false}
            columns={columns1}
            dataSource={data?.map((item) => ({ ...item, key: item.id }))}
          />
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <div style={{ marginBottom: 10, color:'blue' }}>
              <h3 style={{ color:'blue' }}>1.2. <a style={{ color:'blue' }} onClick={handleShowSanLuongDonVi}>Trạm biến áp</a> và <a style={{ color:'blue' }} onClick={handleShowSanLuongDonVi1}>máy biến áp</a></h3>
            </div>
          </div>
          <Table
            pagination={false}
            columns={columns2}
            dataSource={data1.map((item) => ({ ...item, key: item.id }))}
          />
        </div>
      </div>
      <>{modalSL}</>
      <>{modalSL1}</>
    </div>
  );
};

export default KhoiLuongQuanLyVanHanhLuoiDien;
