import './App.css';
import './modules/shared/assets/css/style.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import MainLayout from './modules/shared/layout/components/index';
import DangNhap from './modules/account/components/index';
import ChinhSach from './modules/policy/index';
import HoTro from './modules/support/index';
import TiviShow from './modules/tivishow/components/index';
import { routes } from 'modules/shared/menu/routes';
import LocalStorageService from './core/infrastructure/services/localStorageService';
import Dashboard from 'modules/dashboard/components';
import NhomKeHoach from 'modules/dashboard/components/nhomKeHoach';
import ChiTieuTable from 'modules/dashboard/components/bang/ChiTieuTable';
import BieuDo from 'modules/dashboard/components/bieudo';

function App() {
  const localStorageService = LocalStorageService.instance();
  const isAuthed = localStorageService.getToken();

  return (
    <Router>
      <Routes>
        <Route path="/dang-nhap" element={<DangNhap />} />
        {routes.map((item) => (
          <Route path={item.path} element={<MainLayout>{item.component}</MainLayout>}></Route>
        ))}
        <Route path="/chinh-sach" element={<ChinhSach />} />
        <Route path="/ho-tro" element={<HoTro />} />
        <Route path="/tivi-show" element={<TiviShow />} />
        <Route
          path="/"
          element={<Navigate replace to={isAuthed ? '/nhom-ke-hoach' : '/dang-nhap'} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
