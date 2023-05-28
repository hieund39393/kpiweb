import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Select } from 'antd';
import httpService from 'core/infrastructure/services/httpService';
import { GET_CN_CON } from 'modules/shared/menu/routes';
interface MenuItem {
  label: string;
  value: string;
}

interface MenuCon {
  listChucNangChiTieu: MenuItem[];
}

const NhomKeHoach = ({ history }) => {
  const [menuCon, setMenuCon] = useState<MenuCon[]>([]);
  const [chiTieu, setChiTieu] = useState<MenuItem[]>([]);

  const getChucNangCon = async () => {
    const data = await httpService.get(GET_CN_CON + '?id=43', { id: 43 });
    setMenuCon(data);
  };

  useEffect(() => {
    getChucNangCon();
  }, []);

  const handleChange = (value: string, index) => {
    console.log('!');
    const selectedArray = menuCon[index];

    history.push('/bang-chi-tiet', { chiTieu: selectedArray.listChucNangChiTieu, value: value });
  };

  return (
    <div id="nhomKeHoach" style={{ marginLeft: 290, width: '100%' }}>
      <div className="bct-data__title">
        <h1 style={{ color: 'white' }}>Nhóm chỉ tiêu kế hoạch</h1>
      </div>

      <div>
        <br />
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

export default withRouter(NhomKeHoach);
