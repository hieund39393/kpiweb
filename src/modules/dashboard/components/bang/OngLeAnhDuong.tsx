import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import httpService from 'core/infrastructure/services/httpService';
import { CONG_TAC_DIEU_HANH } from 'modules/shared/menu/routes';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filter from '../finlter';
import SanLuongDien from 'modules/dashboard/modal/sanLuongDien';

interface InputValue {
  ngayBaoCao: string;
  tanSuat: string;
  donViId: number;
}

const OngLeAnhDuong = () => {
  const location = useLocation();

  const { chiTieu, value } = location.state;

  localStorage.setItem('chiTieuST', JSON.stringify(chiTieu));

  const [data, setData] = useState<any>([]);
  const [modalSanLuongDonVi, setModalSanLuongDonVi] = useState(false);

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

  const modalSL = useMemo(
    () =>
      modalSanLuongDonVi && (
        <SanLuongDien
          chiTieuId={idChiTieu}
          isShowModal={modalSanLuongDonVi}
          ngayBaoCao={inputValue.ngayBaoCao}
          tanSuat={inputValue.tanSuat}
          closeModal={handleCloseSanLuongDonVi}
        />
      ),
    [modalSanLuongDonVi]
  );

  const columns1: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, record, index) => index + 1,
    },
    {
      title: 'Số',
      dataIndex: 'so',
      key: 'so',
    },
    {
      title: 'Ngày',
      dataIndex: 'ngay',
      key: 'ngay',
      align: 'center',
    },
    {
      title: 'Trích yếu VB',
      dataIndex: 'trichYeu',
      key: 'trichYeu',
    },
  ];

  const columns2: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, record, index) => index + 1,
    },
    {
      title: 'Ngày',
      dataIndex: 'ngay',
      key: 'ngay',
      align: 'center',
    },
    {
      title: 'Nội dung cuộc họp',
      dataIndex: 'noiDungCuocHop',
      key: 'noiDungCuocHop',
    },
  ];

  useEffect(() => {
    getBangBaoCaoChiTieu();
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
      CONG_TAC_DIEU_HANH +
        `?donViId=${inputValue?.donViId}&ngayBaoCao=${inputValue?.ngayBaoCao}&giamDoc=6`,
      null
    );
    setData(res);
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
            <h3>1. Số văn bản ký duyệt ban hành theo từng lãnh đạo</h3>
          </div>
          <Table
            pagination={{
              defaultPageSize: 20,
              defaultCurrent: 1,
            }}
            columns={columns1}
            dataSource={data?.vanBan?.map((item) => ({ ...item, key: item.id }))}
          />
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <h3>2. Số cuộc họp chủ trì theo từng lãnh đạo</h3>
          </div>
          <Table
            pagination={{
              defaultPageSize: 20,
              defaultCurrent: 1,
            }}
            columns={columns2}
            dataSource={data?.chuTriHop?.map((item) => ({ ...item, key: item.id }))}
          />
        </div>
      </div>
      <>{modalSL}</>
    </div>
  );
};

export default OngLeAnhDuong;
