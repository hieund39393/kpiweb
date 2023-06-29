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
    navigate('/thong-so-amax-pmax', {
      state: { chiTieu: selectedArray.listChucNangChiTieu, value: value },
    });
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
