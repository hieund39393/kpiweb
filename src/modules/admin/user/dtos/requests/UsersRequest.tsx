//modal props
export interface TaiKhoanProps {
    id: number
    tenDangNhap: string
    hoTen: string
    hoatDong: boolean
    donVi: string

}

//modal func props
export interface RoleProps {
    id: string
    tenQuyen: string
    moTa: string
}

export interface DonViProps {
    id: string
    tenDonVi: string
    moTa: string
    laTongCongTy: boolean
}

export interface ChucNangNguoiDungProps {
    chucNangID: number
    tenChucNang: string
    danhSachQuyen: string
}

export interface ChiTieuNguoiDungProps {
    id: number
    nguoiDungID: number
    tenDangNhap: string
    chiTieuID: string
    tenChiTieu: string
}