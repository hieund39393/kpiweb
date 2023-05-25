//props type
export interface ChiTieuProps {
    id: number
    tenChiTieu: string
}

export interface ThucHienProps {
    tuan: any
    id: number
    loaiChiTieu: string
    tenChiTieu: string
    chiTieuID: number
    khEVN: string
    giaTriThucHien: string
    luyKeThucHien: string
    donViDo: string
}

export interface DonViProps {
    id: number
    maDonVi: string
    tenDonVi: string
    laTongCongTy: boolean
}

export interface LoaiChiTieuProps {
    id: number
    loaiChiTieu: string
    tenChiTieu: string
    giaTriKeHoach: string
    apDungThang: boolean
    donViDo: string
}

export interface ChiTieuProps {
    id: number
    loaiChiTieu: string
    tenChiTieu: string
    chiTieuID: number
    giaTriKeHoach: string
    apDungThang: boolean
    donViDo: string
}

/*danh mục chỉ tiêu */
export interface DanhMucChiTieuProps {
    id: number
    reportedID: number
    tenChiTieu: string
    moTa: string
    donViDo: string
    rootID: number
    parentID: number
    groupID: number
    luyKeManual: number
    applyYearToMonth: boolean
    coGiaTriKeHoach: boolean
    phanLoaiCanhBao: number
    tyLeCanhBaoTang: number
    tyLeCanhBaoGiam: number
    coDuLieuMucDonVi: boolean
    coDuLieuNgay: boolean
    soLuongBieuDoMoiHang: number
    chiTieuEVNID: number
    duLieuBieuDoDangBang: boolean
    dongBoTucThoi: boolean
    dongBoHangNgay: boolean
    dongBoHangThang: boolean
}