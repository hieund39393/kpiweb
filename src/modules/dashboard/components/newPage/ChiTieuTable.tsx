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

function ChiTieuTable(props) {


    useEffect(() => {
    }, []);



    return (
        <div id="nhomKeHoach" style={{ marginLeft: 290 }}>
            <div className="bct-data__title">
                <h1 style={{ color: 'white' }}>Nhóm chỉ tiêu kế hoạch</h1>
            </div>

            <div style={{ marginLeft: 15, marginRight: 10, marginTop: 5 }} className="bct-body">
                <Select
                    defaultValue=""
                    style={{
                        width: '100%'
                    }}
                // onChange={handleChange}
                // options={item.listChucNangChiTieu.map((option: MenuItem) => ({ label: option.label, value: option.value }))}
                />
            </div>

        </div>
    );
}

export default ChiTieuTable;
