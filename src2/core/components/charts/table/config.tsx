import { _XVALUES } from "constant/chart";

const configColumnsTableChart = (data) => {
    const childTitle = data.columnTitle.childTitleAxis.map((el, index) => {
        return {
            title: el,
            dataIndex: `index${index}`,
            key: `index${index}`,
        };
    });

    const columns = [
        {
            title: data.columnTitle.parentTitle,
            dataIndex: _XVALUES,
            key: _XVALUES,
        },
        {
            title: data.columnTitle.headTitle,
            children: childTitle,
        },
    ];
    return columns;
};

const configDataSrc = (data) => {
    const res: any = [];
    data.xValues.forEach((el, idx) => {
        const temp = {
            key: idx,
            xValues: el,
        };

        for (let index = 0; index < data.tableData.length; index++) {
            Object.assign(temp, { [`index${index}`]: data.tableData[index].columnData[idx] });
        }
        res.push(temp);
    });

    return res;
};

export const configTable = (typeChart, data) => {
    const config = {
        col: configColumnsTableChart(data),
        data: configDataSrc(data),
        typeChart: typeChart,
        id: data.id
    };
    return config
};