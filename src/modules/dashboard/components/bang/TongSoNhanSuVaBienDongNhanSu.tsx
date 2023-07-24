import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import httpService from 'core/infrastructure/services/httpService';
import { QUAN_TRI_NHAN_SU } from 'modules/shared/menu/routes';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filter from '../finlter';
import ChiTietNhanSu from 'modules/dashboard/modal/chiTietNhanSu';

interface InputValue {
  ngayBaoCao: string;
  tanSuat: string;
  donViId: number;
}

const TongSoNhanSuVaBienDongNhanSu = () => {
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
        <ChiTietNhanSu
          isShowModal={modalSanLuongDonVi}
          ngayBaoCao={inputValue.ngayBaoCao}
          tanSuat={inputValue.tanSuat}
          closeModal={handleCloseSanLuongDonVi}
        />
      ),
    [modalSanLuongDonVi]
  );

  const columns: ColumnsType<any> = [
    {
      title: 'Phân loại',
      dataIndex: 'phanLoai',
      key: 'phanLoai',
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
    let ids = idChiTieu;
    if (idChiTieu.toString().startsWith('0')) {
      ids = chiTieu
        .filter((x) => !x.toString().startsWith('0'))
        .map((item) => parseInt(item.value));
    }
    const res = await httpService.get(
      QUAN_TRI_NHAN_SU +
        `?donViId=${inputValue?.donViId}&ngayBaoCao=${inputValue?.ngayBaoCao}`,
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
           <a> <h3 onClick={handleShowSanLuongDonVi}>Chi tiết đơn vị</h3></a>
          </div>
          <Table
            pagination={{
              defaultPageSize: 20,
              defaultCurrent: 1,
            }}
            columns={columns}
            dataSource={data?.map((item) => ({ ...item, key: item.id }))}
          />
        </div>
      </div>
      <>{modalSL}</>
    </div>
  );
};

export default TongSoNhanSuVaBienDongNhanSu;
