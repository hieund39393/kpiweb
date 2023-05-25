export interface ListChartProps {
  id: number,
  tenBieuDo: string,
  loaiBieuDo: string,
  chiTieuID: number,
  giaTriKeHoach: boolean,
  giaTriThucTe: boolean,
  giaTriLuyKe: boolean,
  bieuDoThongKeTheoNgay: boolean,
  bieuDoThongKeTheoNam: boolean,
  summary: string,
  title: string,
  chiTieuIDs: number[]
  columns: string[]
  order: number
  layout: number
  isRow: number
  align: string
  showAdditionalTitle: number
  unit: string,
  showDetails: number
  parentTitle: string
  duLieuBCStr: string
  formula: number
  index: string
}

export interface BoChiTieuLevelProps {
  id: number;
  rootID: number;
  tenDanhMuc: string;
  isChecked: boolean;
  children: [];
}

export interface BoChiTieuProps {
  groupID: number
  groupName: string
}

export interface LoaiChiTieuLv3Props {
  id: number
  chiTieuID: number
  tenChiTieu: string
}