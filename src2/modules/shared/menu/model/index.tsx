export interface ChucNangItem {
    chucNangID: number
    tenChucNang: string
    danhSachQuyen: string
    chucNangChaID: number
    thuTuHienThi: number
    chiTieuID: number
    rootID: number
}

export interface MenuItem {
    key: string
    title: string
    path: string
    icon: any
    component: any
    children: Array<MenuItem>    
    enableShow: boolean
    chucNangID: number    
    chiTieuID: number
    rootID: number
  }