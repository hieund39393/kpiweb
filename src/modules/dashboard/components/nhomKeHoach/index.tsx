import { useEffect, useState } from 'react';
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

function NhomKeHoach() {
    const [menuCon, setMenuCon] = useState<MenuCon[]>([]);
    const [chiTieu, setChiTieu] = useState<MenuItem[]>([]);

    const getChucNangCon = async () => {
        const data = await httpService.get(GET_CN_CON + '?id=43', { id: 43 });
        setMenuCon(data)
    }

    useEffect(() => {
        getChucNangCon();
    }, []);

    const handleChange = (value: string) => {
        const selectedOptions = menuCon
            .filter((item: MenuCon) => item.listChucNangChiTieu.some((option: MenuItem) => option.value === value))
            .flatMap((item: MenuCon) =>
                item.listChucNangChiTieu.map((option: MenuItem) => ({
                    label: option.label,
                    value: option.value
                }))
            );

        setChiTieu(selectedOptions)
    };


    return (
        <div id="nhomKeHoach" style={{ marginLeft: 290 }}>
            <div className="bct-data__title">
                <h1 style={{ color: 'white' }}>Nhóm chỉ tiêu kế hoạch</h1>
            </div>

            {menuCon.map((item: MenuCon, index: number) => (
                <div key={index} style={{ marginLeft: 15, marginRight: 10, marginTop: 5 }} className="bct-body">
                    <Select
                        defaultValue={item.listChucNangChiTieu[0].value}
                        style={{
                            width: '100%'
                        }}
                        onChange={handleChange}
                        options={item.listChucNangChiTieu.map((option: MenuItem) => ({ label: option.label, value: option.value }))}
                    />
                </div>
            ))}

        </div>
    );
}

export default NhomKeHoach;
