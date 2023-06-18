import { BrowserRouter as Router, Link } from 'react-router-dom';

import { Layout, Menu, Image, Dropdown } from 'antd';
import { DownOutlined, SafetyOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo-text-evn.png';
import avatar from '../../assets/images/avatar.svg';
import '../../header/header.css';
import HeaderLogout from './logout';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ModalChangePassword from '../../../account/components/modalChangePassword';
import { useMemo, useState } from 'react';

const { Header } = Layout;

type Account = {
  name: string | null;
  avatar: string;
};

type Props =
  | {
      token: string;
      profile: {
        name: string | null;
        avatar: string;
      };
    }
  | {
      token: null;
      profile: Account;
    };

function HeaderSection(props: Props) {
  const { token, profile } = props;
  const [showModalChangePass, setShowModalChangePass] = useState(false);
  const navigate = useNavigate();
  function showModal() {
    setShowModalChangePass(true);
  }

  function closeModal() {
    setShowModalChangePass(false);
  }

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/dang-nhap');
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="0" className="menu-link" onClick={showModal}>
        <Link rel="noopener noreferrer" className="link-text-images change-password" to={'/'}>
          <SafetyOutlined />
          Thay đổi mật khẩu
        </Link>
      </Menu.Item>
      <Menu.Item key="1" className="menu-link-logout" onClick={() => logoutHandler()}>
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const modal = useMemo(
    () =>
      showModalChangePass && (
        <ModalChangePassword
          isModalVisible={showModalChangePass}
          closeModal={closeModal}
          handleChangePassword={() => {}}
        />
      ),
    [showModalChangePass]
  );
  return (
    <>
      <Header className="header">
        <div className="header--logo">
          <a href={'/dashboard'}>
            <Image width="100%" preview={false} src={logo} />
          </a>
        </div>
        <div className="header-title">
          <h3>HỆ THỐNG TỔNG HỢP BỘ CHỈ TIÊU THỰC HIỆN KẾ HOẠCH</h3>
        </div>
        <div className="header--account">
          <div className="header--account--name">{profile.name}</div>
          <Dropdown overlay={dropdownMenu}>
            <Link to={''} className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {token !== '' ? (
                <Image preview={false} src={avatar} alt="" />
              ) : (
                <a href="/dang-nhap">Đăng nhập</a>
              )}{' '}
              <DownOutlined />
            </Link>
          </Dropdown>
        </div>
      </Header>
      {modal}
    </>
  );
}

export default HeaderSection;
