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
import ChiTieuTable from 'modules/dashboard/components/bang/ChiTieuTable';

import Dashboard from 'modules/dashboard/components/index';
import CauHinhBieuDo from '../../admin/configCharts/components';
import BieuDo from '../../admin/charts/components';
import ChinhSach from 'modules/policy';
import HoTro from 'modules/support';
import CauHinhChung from 'modules/admin/setting/components';
import DanhMucChiTieu from 'modules/indicators/components/kpi';
import CauHinhDongBo from 'modules/admin/sync/components/index';
import { BASE_URL } from 'configs/config';

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
    key: 'boChiTieuKyThuat',
    id: 2,
    icon: '',
    title: 'Kỹ thuật',
    path: '/dashboard',
    component: <Dashboard />,
  },
  {
    key: 'boChiTieuKinhDoanh',
    id: 3,
    icon: '',
    title: 'Kinh doanh',
    path: '#',
  },
  // {
  //   key: 'boChiTieuXayDung',
  //   id: 4,
  //   icon: '',
  //   title: 'Đầu tư xây dựng',
  //   path: '#',
  // },
  // {
  //   key: 'boChiTieuSuaChua',
  //   id: 5,
  //   icon: '',
  //   title: 'Sửa chữa lớn',
  //   path: '#',
  // },
  // {
  //   key: 'boChiTieuQuanTri',
  //   id: 29,
  //   icon: '',
  //   title: 'Quản Trị',
  //   path: '#',
  // },
  // {
  //   key: 'boChiTieuTaiChinh',
  //   id: 31,
  //   icon: '',
  //   title: 'Tài chính',
  //   path: '#',
  // },
  // {
  //   key: 'boChiTieuAnToan',
  //   id: 32,
  //   icon: '',
  //   title: 'An Toàn',
  //   path: '#',
  // },
  // {
  //   key: 'boChiTieuChuyenDoiSo',
  //   id: 33,
  //   icon: '',
  //   title: 'Chuyển đổi số',
  //   path: '#',
  // },
  // {
  //   key: 'boChiTieuThanhTraKiemTra',
  //   id: 35,
  //   icon: '',
  //   title: 'Thanh Tra Kiểm Tra',
  //   path: '#',
  // },

  {
    key: 'nhomChiTieuQuanLy',
    id: 44,
    icon: '',
    title: 'Nhóm chỉ tiêu quản lý',
    path: '/nhom-quan-ly',
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
    component: <CauHinhChung />
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
    component: <CauHinhDongBo />
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
  }
];


export const GET_CN_CON = BASE_URL + 'chuc-nang/chuc-nang-con';
export const BANG_BAO_CAO_CHI_TIEU = BASE_URL + 'chuc-nang/list-bao-cao-chi-tieu';