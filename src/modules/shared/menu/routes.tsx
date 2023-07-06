import {
  HomeFilled,
  SettingFilled,
  ReconciliationFilled,
  DatabaseFilled,
  ControlFilled,
  PlaySquareFilled,
  QuestionCircleFilled,
  FileTextFilled,
} from '@ant-design/icons';

import DonVi from '../../admin/department/components';
import QuyenHeThong from '../../admin/role/components';
import QuanLyNguoiDung from '../../admin/user/components';
import QuanLyKeHoach from '../../indicators/components/plans';
import QuanLyThucHien from '../../indicators/components/perform';
import TiviShow from '../../tivishow/components';
import BaoCaoTheoChiTieu from '../../report/components/indicators';
import BaoCaoTheoDonVi from '../../report/components/deparment';
import NhomKeHoach from 'modules/dashboard/components/nhomKeHoach';
import NhomQuanLy from 'modules/dashboard/components/nhomQuanLy';
import ChiTieuTable from 'modules/dashboard/components/bang/ChiTieuTable';
import BieuDoChart from 'modules/dashboard/components/bieudo';
import BieuDoTron from 'modules/dashboard/components/bieudotron';

import Dashboard from 'modules/dashboard/components/index';
import CauHinhBieuDo from '../../admin/configCharts/components';
import BieuDo from '../../admin/charts/components';
import ChinhSach from 'modules/policy';
import HoTro from 'modules/support';
import CauHinhChung from 'modules/admin/setting/components';
import DanhMucChiTieu from 'modules/indicators/components/kpi';
import CauHinhDongBo from 'modules/admin/sync/components/index';
import { BASE_URL } from 'configs/config';

import ThongSoAMaxPMax from 'modules/dashboard/components/bang/ThongSoAMaxPMax';
import KhoiLuongQuanLyVanHanhLuoiDien from 'modules/dashboard/components/bang/KhoiLuongQuanLyVanHanhLuoiDien';
import KhoiLuongQuanLyVanHanhTrungAp from 'modules/dashboard/components/bang/KhoiLuongQuanLyVanHanhTrungAp';
import KhoiLuongQuanLyVanHanhDZHaAp from 'modules/dashboard/components/bang/KhoiLuongQuanLyVanHanhDZHaAp';
import SoLuongKhachHang from 'modules/dashboard/components/bang/SoLuongKhachHang';
import SoLuongCongTo from 'modules/dashboard/components/bang/SoLuongCongTo';
import TongSoNhanSuVaBienDongNhanSu from 'modules/dashboard/components/bang/TongSoNhanSuVaBienDongNhanSu';
import PhanMem from 'modules/dashboard/components/bang/PhanMem';
import OngNguyenDanhDuyen from 'modules/dashboard/components/bang/OngNguyenDanhDuyen';
import OngNguyenAnhDung from 'modules/dashboard/components/bang/OngNguyenAnhDung';
import OngNguyenAnhTuan from 'modules/dashboard/components/bang/OngNguyenAnhTuan';
import OngNguyenQuangTrung from 'modules/dashboard/components/bang/OngNguyenQuangTrung';
import OngHoangMinhGiang from 'modules/dashboard/components/bang/OngHoangMinhGiang';
import OngLeAnhDuong from 'modules/dashboard/components/bang/OngLeAnhDuong';
import KetQuaThucHienNhiemVu from 'modules/dashboard/components/bang/KetQuaThucHienNhiemVu';

export const routes = [
  {
    key: 'boChiTieu',
    id: 1,
    title: 'Bộ chỉ tiêu',
    path: '/dashboard',
    icon: <HomeFilled />,
    component: <Dashboard />,
  },
  {
    key: 'nhomChiTieuQuanLy',
    id: 44,
    icon: '',
    title: 'Nhóm chỉ tiêu quản lý',
    path: '/nhom-quan-ly',
    component: <NhomQuanLy />,
  },
  {
    key: 'quanlyBoChiTieu',
    id: 6,
    title: 'Quản lý bộ chỉ tiêu',
    path: '/quan-ly-bo-chi-tieu',
    icon: <DatabaseFilled />,
  },
  {
    key: 'giaTriKeHoach',
    id: 7,
    icon: '',
    path: '/gia-tri-ke-hoach',
    title: 'Cập nhật giá trị kế hoạch',
    component: <QuanLyKeHoach />,
  },
  {
    key: 'giaTriThucHien',
    id: 8,
    icon: '',
    path: '/admin/gia-tri-thuc-hien',
    title: 'Cập nhật giá trị thực hiện',
    component: <QuanLyThucHien />,
  },
  {
    key: 'quanTriHeThong',
    id: 9,
    title: 'Quản trị hệ thống',
    path: '/admin/quan-tri-he-thong',
    icon: <ControlFilled />,
  },
  {
    key: 'quanTriDonVi',
    id: 10,
    icon: '',
    path: '/admin/don-vi',
    title: 'Đơn vị',
    component: <DonVi />,
  },
  {
    key: 'quanTriNguoiDung',
    id: 11,
    icon: '',
    path: '/admin/nguoi-dung',
    title: 'Tài khoản',
    component: <QuanLyNguoiDung />,
  },
  {
    key: 'quanTriQuyenHeThong',
    id: 12,
    icon: '',
    path: '/admin/quyen-he-thong',
    title: 'Quyền',
    component: <QuyenHeThong />,
  },
  {
    key: 'baoCao',
    id: 13,
    title: 'Báo cáo',
    path: '/admin/bao-cao',
    icon: <ReconciliationFilled />,
  },
  {
    key: 'theoDonVi',
    id: 14,
    icon: '',
    path: '/bao-cao-theo-don-vi',
    title: 'Theo đơn vị',
    component: <BaoCaoTheoDonVi />,
  },
  {
    key: 'theoChiTieu',
    id: 15,
    icon: '',
    path: '/bao-cao-theo-chi-tieu',
    title: 'Theo từng chỉ tiêu',
    component: <BaoCaoTheoChiTieu />,
  },
  {
    key: 'tiviShow',
    id: 16,
    title: 'Tivi show',
    path: '/tivi-show',
    component: <TiviShow />,
    icon: <PlaySquareFilled />,
  },
  {
    key: 'cauHinhBieuDo',
    id: 17,
    title: 'Cấu hình biểu đồ',
    path: '/admin/cau-hinh-bieu-do',
    component: <CauHinhBieuDo />,
  },
  {
    key: 'danhSachBieuDo',
    id: 18,
    title: 'Danh sách biểu đồ',
    path: '/admin/bieu-do',
    component: <BieuDo />,
  },
  {
    key: 'cauHinh',
    id: 19,
    title: 'Cấu hình',
    path: '/admin/cai-dat-chung',
    icon: <SettingFilled />,
    component: <CauHinhChung />,
  },
  {
    key: 'danhMucChiTieu',
    id: 20,
    title: 'Danh mục chỉ tiêu',
    path: '/danh-muc-chi-tieu',
    icon: '',
    component: <DanhMucChiTieu />,
  },
  {
    key: 'cauHinhChung',
    id: 21,
    title: 'Cấu hình chung',
    path: '/cai-dat-chung',
    icon: '',
    component: <CauHinhChung />,
  },
  {
    key: 'cauHinhDongBo',
    id: 22,
    title: 'Cấu hình đồng bộ',
    path: '/cau-hinh-dong-bo',
    icon: '',
    component: <CauHinhDongBo />,
  },
  {
    key: 'chinhSach',
    id: 98,
    title: 'Chính sách',
    path: '/chinh-sach',
    icon: <FileTextFilled />,
    component: <ChinhSach />,
  },
  {
    key: 'hoTro',
    id: 99,
    title: 'Hỗ trợ',
    path: '/ho-tro',
    icon: <QuestionCircleFilled />,
    component: <HoTro />,
  },
  {
    key: 'nhomKeHoach',
    id: 43,
    icon: '',
    path: '/nhom-ke-hoach',
    title: 'Nhóm kế hoạch',
    component: <NhomKeHoach />,
  },

  {
    key: 'chiTieuTable',
    id: 35,
    icon: '',
    path: '/bang-chi-tiet',
    title: '',
    component: <ChiTieuTable />,
  },
  {
    key: 'bieuDo',
    id: 36,
    icon: '',
    path: '/bieu-do',
    title: '',
    component: <BieuDoChart />,
  },
  {
    key: 'bieuDoTron',
    id: 37,
    icon: '',
    path: '/bieu-do-tron',
    title: '',
    component: <BieuDoTron />,
  },
  {
    key: 'ThongSoAMaxPMax',
    id: 38,
    icon: '',
    path: '/thong-so-amax-pmax',
    title: '',
    component: <ThongSoAMaxPMax />,
  },

  {
    key: 'klqlvhld',
    id: 39,
    icon: '',
    path: '/khoi-luong-quan-ly-van-hanh-luoi-dien',
    title: '',
    component: <KhoiLuongQuanLyVanHanhLuoiDien />,
  },
  {
    key: 'klqlvhldta',
    id: 40,
    icon: '',
    path: '/khoi-luong-quan-ly-van-hanh-luoi-dien-trung-ap',
    title: '',
    component: <KhoiLuongQuanLyVanHanhTrungAp />,
  },
  {
    key: 'klqlvhdzha',
    id: 41,
    icon: '',
    path: '/khoi-luong-quan-ly-van-hanh-duong-day-ha-ap',
    title: '',
    component: <KhoiLuongQuanLyVanHanhDZHaAp />,
  },
  {
    key: 'soluongkhachhang',
    id: 42,
    icon: '',
    path: '/so-luong-khach-hang',
    title: '',
    component: <SoLuongKhachHang />,
  },
  {
    key: 'soluongcongto',
    id: 43,
    icon: '',
    path: '/so-luong-cong-to',
    title: '',
    component: <SoLuongCongTo />,
  },
  {
    key: 'tongSoNhanSuVaBienDongNhanSu',
    id: 44,
    icon: '',
    path: '/tong-so-nhan-su-va-bien-dong-nhan-su',
    title: '',
    component: <TongSoNhanSuVaBienDongNhanSu />,
  },
  {
    key: 'phanMem',
    id: 45,
    icon: '',
    path: '/phan-mem',
    title: '',
    component: <PhanMem />,
  },
  {
    key: 'OngNguyenDanhDuyen',
    id: 46,
    icon: '',
    path: '/ong-nguyen-danh-duyen',
    title: '',
    component: <OngNguyenDanhDuyen />,
  },

  {
    key: 'OngNguyenAnhDung',
    id: 47,
    icon: '',
    path: '/ong-nguyen-anh-dung',
    title: '',
    component: <OngNguyenAnhDung />,
  },
  {
    key: 'ongNguyenAnhTuan',
    id: 48,
    icon: '',
    path: '/ong-nguyen-anh-tuan',
    title: '',
    component: <OngNguyenAnhTuan />,
  },
  {
    key: 'OngNguyenQuangTrung',
    id: 49,
    icon: '',
    path: '/ong-nguyen-quang-trung',
    title: '',
    component: <OngNguyenQuangTrung />,
  },
  {
    key: 'OngHoangMinhGiang',
    id: 50,
    icon: '',
    path: '/ong-hoang-minh-giang',
    title: '',
    component: <OngHoangMinhGiang />,
  },
  {
    key: 'ongLeAnhDuong',
    id: 51,
    icon: '',
    path: '/ong-le-anh-duong',
    title: '',
    component: <OngLeAnhDuong />,
  },
  {
    key: 'ketquathuchiennhiemvu',
    id: 52,
    icon: '',
    path: '/ket-qua-thuc-hien-nhiem-vu',
    title: '',
    component: <KetQuaThucHienNhiemVu />,
  },
];

export const GET_CN_CON = BASE_URL + 'chuc-nang/chuc-nang-con';
export const GET_CN_NQL = BASE_URL + 'chuc-nang/chuc-nang-nhom-quan-ly';
export const BANG_BAO_CAO_CHI_TIEU = BASE_URL + 'chuc-nang/list-bao-cao-chi-tieu';
export const BANG_BAO_CAO_CHI_TIEU_CAC_DON_VI =
  BASE_URL + 'chuc-nang/list-bao-cao-chi-tieu-cac-don-vi';

export const THONG_KE_AMAX_PMAX = BASE_URL + 'nhomquanly/thong-so-amax-pmax';

export const KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN =
  BASE_URL + 'nhomquanly/khoi-luong-quan-ly-van-hanh-luoi-dien';
export const KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN1 =
  BASE_URL + 'nhomquanly/khoi-luong-quan-ly-van-hanh-luoi-dien1';

export const KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN_TRUNG_AP =
  BASE_URL + 'nhomquanly/khoi-luong-quan-ly-van-hanh-luoi-dien-trung-ap';

export const KHOI_LUONG_QUAN_LY_VAN_HANH_LUOI_DIEN_HA_AP =
  BASE_URL + 'nhomquanly/khoi-luong-quan-ly-van-hanh-luoi-dien-ha-ap';

export const SO_LUONG_KHACH_HANG = BASE_URL + 'nhomquanly/so-luong-khach-hang';

export const SO_LUONG_CONG_TO = BASE_URL + 'nhomquanly/so-luong-cong-to';

export const PHAN_MEM = BASE_URL + 'nhomquanly/phan-mem';
export const KET_QUA_THUC_HIEN = BASE_URL + 'nhomquanly/ket-qua-thuc-hien';
export const CONG_TAC_DIEU_HANH = BASE_URL + 'nhomquanly/cong-tac-dieu-hanh';
