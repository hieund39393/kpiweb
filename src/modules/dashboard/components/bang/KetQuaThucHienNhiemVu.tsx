import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import httpService from 'core/infrastructure/services/httpService';
import { KET_QUA_THUC_HIEN } from 'modules/shared/menu/routes';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filter from '../finlter';
import SanLuongDien from 'modules/dashboard/modal/sanLuongDien';

interface InputValue {
  ngayBaoCao: string;
  tanSuat: string;
  donViId: number;
}

const KetQuaThucHienNhiemVu = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const columns: ColumnsType<any> = [
    {
      title: 'Đơn vị',
      dataIndex: 'donVi',
      key: 'donVi',
    },
    {
      title: 'Tổng số công việc',
      dataIndex: 'tongSoCongViec',
      key: 'tongSoCongViec',
    },
    {
      title: 'Loại 1',
      dataIndex: 'loaimot',
      key: 'loaimot',
    },
    {
      title: 'Loại 2',
      dataIndex: 'loaihai',
      key: 'loaihai',
    },
    {
      title: 'Hoàn thành',
      dataIndex: 'hoanThanh',
      key: 'hoanThanh',
    },
    {
      title: 'Đang làm',
      dataIndex: 'dangLam',
      key: 'dangLam',
    },
    {
      title: 'Chủ trì',
      dataIndex: 'chuTri',
      key: 'chuTri',
    },
    {
      title: 'Phối hợp',
      dataIndex: 'phoiHop',
      key: 'phoiHop',
    },
    {
      title: 'Theo dõi',
      dataIndex: 'theoDoi',
      key: 'theoDoi',
    },
    {
      title: 'Quá hạn',
      dataIndex: 'quaHan',
      key: 'quaHan',
    },
    {
      title: 'Đến hạn',
      dataIndex: 'denHan',
      key: 'denHan',
    },
    {
      title: 'Chờ duyệt',
      dataIndex: 'choDuyet',
      key: 'choDuyet',
    },
    {
      title: 'Chờ duyệt gia hạn',
      dataIndex: 'choDuyetGiaHan',
      key: 'choDuyetGiaHan',
    },
    {
      title: 'Gia hạn quá 2 lần',
      dataIndex: 'giaHanQuaHaiLan',
      key: 'giaHanQuaHaiLan',
    },
    {
      title: 'Tỷ lệ hoàn thành',
      dataIndex: 'tyLeHoanThanh',
      key: 'tyLeHoanThanh',
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
      KET_QUA_THUC_HIEN + `?donViId=${inputValue?.donViId}&ngayBaoCao=${inputValue?.ngayBaoCao}`,
      null
    );
    setData(res);
  };
  const handleChangeNhom = (value) => {
    if (value === '60') {
      navigate('/thong-so-amax-pmax', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '61') {
      navigate('/khoi-luong-quan-ly-van-hanh-luoi-dien', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '62') {
      navigate('/khoi-luong-quan-ly-van-hanh-luoi-dien-trung-ap', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '63') {
      navigate('/khoi-luong-quan-ly-van-hanh-duong-day-ha-ap', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '64') {
      navigate('/so-luong-khach-hang', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '65') {
      navigate('/so-luong-cong-to', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '66') {
      navigate('/tong-so-nhan-su-va-bien-dong-nhan-su', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '67') {
      navigate('/ket-qua-thanh-tra-kiem-tra', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '68') {
      navigate('/phan-mem', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '69') {
      navigate('/ong-nguyen-danh-duyen', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '70') {
      navigate('/ong-nguyen-anh-dung', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '71') {
      navigate('/ong-nguyen-anh-tuan', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '72') {
      navigate('/ong-nguyen-quang-trung', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '73') {
      navigate('/ong-hoang-minh-giang', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '74') {
      navigate('/ong-le-anh-duong', {
        state: { chiTieu: chiTieu, value: value },
      });
    } else if (value === '75') {
      navigate('/ket-qua-thuc-hien-nhiem-vu', {
        state: { chiTieu: chiTieu, value: value },
      });
    }
  }
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
            onChange={handleChangeNhom}
            options={chiTieu?.map((option, index) => ({
              label: option.label,
              value: option.value,
              style: index === 0 ? { fontWeight: 'bold' } : {},
            }))}
          />
        </>
        <div style={{ margin: 10 }}>
          <Table
            pagination={false}
            columns={columns}
            dataSource={data?.map((item) => ({ ...item, key: item.id }))}
          />
        </div>
      </div>
      <>{modalSL}</>
    </div>
  );
};

export default KetQuaThucHienNhiemVu;
