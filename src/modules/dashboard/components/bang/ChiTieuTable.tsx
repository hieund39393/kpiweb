import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import httpService from 'core/infrastructure/services/httpService';
import { BANG_BAO_CAO_CHI_TIEU } from 'modules/shared/menu/routes';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filter from '../finlter';
import SanLuongDien from 'modules/dashboard/modal/sanLuongDien';

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
  donViId: number;
}

const ChiTieuTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { chiTieu, value } = location.state;

  localStorage.setItem('chiTieuST', JSON.stringify(chiTieu));

  // const [valueChiTieu, setValueChiTieu] = useState(value);

  const [data, setData] = useState<DataType[]>([]);
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
          if (text === 'Sản lượng điện thương phẩm') {
            setIDChiTieu(49);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Sản lượng điện nhận đầu nguồn và mặt trời') {
            setIDChiTieu(57);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Độ tin cậy cung cấp điện') {
            setIDChiTieu(38);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Sự cố lưới điện trung thế') {
            setIDChiTieu(323);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Tổn thất điện năng') {
            setIDChiTieu(122);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Giá bán điện bình quân tháng N') {
            setIDChiTieu(123);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Dịch vụ cấp điện mới') {
            setIDChiTieu(413);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Chỉ số tiếp cận điện năng') {
            setIDChiTieu(415);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Đánh giá sự hài lòng của khách hàng') {
            setIDChiTieu(417);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Tỷ lệ đầu nguồn theo giờ cao thấp điểm') {
            setIDChiTieu(74);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          } else if (text === 'Suất sự cố lưới điện trung thế') {
            setIDChiTieu(323);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          }
          else if (text === 'Điện thương phẩm') {
            setIDChiTieu(49);
            return (
              <a onClick={handleShowSanLuongDonVi}>
                <strong className="view-chart">{text}</strong>
              </a>
            );
          }
          
          else {
            return <strong className="view-chart">{text}</strong>;
          }
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
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
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
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
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
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
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
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
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
        if (text !== null && text !== '') {
          return parseFloat(text).toLocaleString();
        }
      },
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
      BANG_BAO_CAO_CHI_TIEU +
        `?ids=${ids}&ngayBaoCao=${inputValue?.ngayBaoCao}&tanSuat=${inputValue?.tanSuat}&donViId=${inputValue?.donViId}`,
      null
    );
    setData(res);
  };

  const getBangBaoCaoChiTieu2 = async (value) => {
    let ids = value;
    if (value.toString().startsWith('0')) {
      ids = chiTieu
        .filter((x) => !x.value.toString().startsWith('0'))
        .map((item) => parseInt(item.value));
    }
    const res = await httpService.get(
      BANG_BAO_CAO_CHI_TIEU +
        `?ids=${ids}&ngayBaoCao=${inputValue?.ngayBaoCao}&tanSuat=${inputValue?.tanSuat}&donViId=${inputValue?.donViId}`,
      null
    );
    setData(res);

    const spanElement = document.querySelector('#bangChiTiet .ant-select-selection-item');
    if (spanElement) {
      if (chiTieu[0].value === value) {
        spanElement.textContent = chiTieu[0].label;
      } else {
        spanElement.textContent = `${chiTieu[0].label.split('(')[0]} ${`>`} ${
          chiTieu.filter((x) => x.value === value)[0].label
        }`;
      }
    }

    // setSelectedValue(value);
    setIDChiTieu(value);
    localStorage.setItem('selectedValue', value);
  };

  const handleViewChart = (chiTieuId, chiTieuChaId) => {
    localStorage.setItem('selectedValue', chiTieuChaId);
    if (
      chiTieuChaId === 74 ||
      (chiTieuId >= 338 && chiTieuId <= 342) ||
      chiTieuId === 58 ||
      chiTieuId === 124
    ) {
      navigate('/bieu-do-tron', {
        state: {
          chiTieuId,
          chiTieuChaId,
          ngayBaoCao: inputValue.ngayBaoCao,
          tansuat: inputValue.tanSuat,
        },
      });
    } else {
      navigate('/bieu-do', { state: { chiTieuId, chiTieuChaId } });
    }
  };

  // const [selectedValue, setSelectedValue] = useState(idChiTieu ?? chiTieu[0].value);

  // const storedValue: string | null = localStorage.getItem('selectedValue');
  // if (storedValue !== null) {
  //   const parsedValue: number = parseInt(storedValue, 10);
  //   setSelectedValue(parsedValue);
  // }
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
            onChange={getBangBaoCaoChiTieu2}
            options={chiTieu?.map((option, index) => ({
              label: option.label,
              value: option.value,
              style: index === 0 ? { fontWeight: 'bold' } : {},
            }))}
          />
        </>
        <div style={{ margin: 10 }}>
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

export default ChiTieuTable;
