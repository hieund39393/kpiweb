export type ButtonProps = {
    value: "Lưu" | "Tiếp tục" | "Cập nhật";
    processing: boolean;
};

/*BasicAxes*/
export interface BasicAxesDataProps {
    data: Array<BasicAxesModelProps>
}

interface BasicAxesModelProps {
    xAxes: string
    yAxes: number
    secondYAxes: number
}
/*end BasicAxes*/

/*many line one bar*/
export interface LineBarDataProps {
    columnsAxes: Array<ModelColumnsProps>
    lineAxes: Array<ModelLineProps>
}

interface ModelColumnsProps {
    xAxes: string
    yAxes: number
}

interface ModelLineProps {
    xAxes: string
    secondYAxes: number
    name: string
}
/*end many line one bar*/

/*basic line*/
export interface BasicLineProps {
    data: Array<ModelBasicLineProps>
}

interface ModelBasicLineProps {
    yAxes: string
    xAxes: number
}
/*end basic line */

/*LineUpDown*/
export interface LineUpDownProps {
    data: Array<ModelLineUpDownProps>
}

interface ModelLineUpDownProps {
    xAxes: string
    yAxes: number
}
/*end LineUpDown */

/* GaugeProgress*/
export interface GaugeProgressProps {
    data: Array<ModelGaugeProgressProps>
}

interface ModelGaugeProgressProps {
    percent: number
    range: {
        ticks: number[]
        color: string[]
    }
    indicator: {
        pointer: {
            stroke: string
        }
        pin: {
            stroke: string
        }
    }
    statistic: {
        fontSize: string
        lineHeight: string
    }
}
/*end GaugeProgress */

/*input*/
export type InputProps = {
    onChange: (str: string) => void;
    placeholder: string;
    name: string;
    value?: string;
};
/*end input */

/*sự cố*/
export interface SuCoProps {
    loaiSuCo: string
    donViID: number
    tenDonVi: string
    chiTieuID: number
    tenChiTieu: string
    tenDuongDay: string
    ngayXayRaSuCo: string
    ngayXayRaSuCoStr: string
    trangThaiID: number
    tenTrangThai: string
    ngayKhoiPhucSuCo: string
    ngayKhoiPhucSuCoStr: string
    dienBien: string
    nguyenNhan: string
    bienPhapKhacPhuc: string
}
/*end sự cố*/