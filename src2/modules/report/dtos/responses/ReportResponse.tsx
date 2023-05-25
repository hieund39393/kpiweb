export interface DonViProps {
  id: number
  maDonVi: string
  tenDonVi: string
}

export interface DataReportProps {
  donViDo: string;
  giaTriKeHoach: number;
  giaTriThucHien: number;
  luyKeThucHien: number;
  soSanhKHTH: number;
  soSanhTH: number;
  stt: string;
  tenChiTieu: string;
};

export interface ReportProps {
  DonViID: number
  loaiBaoCao: string
  ngay: number
  thang: number
  nam: number
}

export interface DataIndicatorProps {
  id: number
  tenChiTieu: string
};

export interface DataReportByIndicatorProps {
  donViDo: string
  giaTriKeHoach: number
  giaTriThucHien: number
  loaiChiTieu: string
  luyKeThucHien: number
  stt: number
  tenChiTieu: string
  tenDonVi: string
  soSanhKHTH: number
  soSanhTH: number
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