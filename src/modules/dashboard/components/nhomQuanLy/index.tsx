import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Select } from 'antd';
import httpService from 'core/infrastructure/services/httpService';
import { GET_CN_NQL } from 'modules/shared/menu/routes';
interface MenuItem {
  label: string;
  value: string;
}

interface MenuCon {
  listChucNangChiTieu: MenuItem[];
}

const NhomQuanLy = () => {
  const navigate = useNavigate();
  const [menuCon, setMenuCon] = useState<MenuCon[]>([]);
  const [chiTieu, setChiTieu] = useState<MenuItem[]>([]);

  const getChucNangCon = async () => {
    const data = await httpService.get(GET_CN_NQL + '?id=44', { id: 44 });
    setMenuCon(data);
  };

  useEffect(() => {
    getChucNangCon();
  }, []);

  const handleChange = (value: string, index) => {
    const selectedArray = menuCon[index];
    if (value === '60') {
      navigate('/thong-so-amax-pmax', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '61') {
      navigate('/khoi-luong-quan-ly-van-hanh-luoi-dien', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '62') {
      navigate('/khoi-luong-quan-ly-van-hanh-luoi-dien-trung-ap', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '63') {
      navigate('/khoi-luong-quan-ly-van-hanh-duong-day-ha-ap', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '64') {
      navigate('/so-luong-khach-hang', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '65') {
      navigate('/so-luong-cong-to', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '66') {
      navigate('/tong-so-nhan-su-va-bien-dong-nhan-su', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '67') {
      navigate('/ket-qua-thanh-tra-kiem-tra', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '68') {
      navigate('/phan-mem', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '69') {
      navigate('/ong-nguyen-danh-duyen', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '70') {
      navigate('/ong-nguyen-anh-dung', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '71') {
      navigate('/ong-nguyen-anh-tuan', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '72') {
      navigate('/ong-nguyen-quang-trung', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '73') {
      navigate('/ong-hoang-minh-giang', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '74') {
      navigate('/ong-le-anh-duong', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    } else if (value === '75') {
      navigate('/ket-qua-thuc-hien-nhiem-vu', {
        state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
      });
    }
  };

  return (
    <div id="nhomKeHoach" style={{ marginLeft: 290, width: '100%' }}>
      <div className="bct-data__title1">
        <h1 style={{ color: 'white', fontSize: 20, alignItems: 'center' }}>
          NHÓM CHỈ TIÊU QUẢN LÝ
        </h1>
      </div>

      <div>
        {menuCon.map((item: MenuCon, index: number) => {
          return (
            <div key={index}>
              <Select
                style={{
                  paddingLeft: 10,
                  paddingTop: 10,
                  width: '100%',
                }}
                defaultValue={item.listChucNangChiTieu[0].value}
                // onChange={handleChange}
                onSelect={(value: string) => handleChange(value, index)}
                options={item.listChucNangChiTieu.map((option: MenuItem) => ({
                  label: option.label,
                  value: option.value,
                }))}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NhomQuanLy;
