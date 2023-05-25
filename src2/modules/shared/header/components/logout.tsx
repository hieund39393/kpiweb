import { Link } from 'react-router-dom';
import React from 'react';
import { Modal, notification, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import LocalStorageService from '../../../../core/infrastructure/services/localStorageService';
import AccountService from '../../../account/services/accountService';

const accountService = AccountService.instance();
const localStorageService = LocalStorageService.instance();

function HeaderLogout() {
  const [visible, setVisible] = React.useState(false);
  const onLogout = async () => {
    setVisible(true);
  };

  const logoutHandler = async () => {
    const response = await accountService.logout();
    if (response.statusCode === 200) {
      localStorageService.clearToken();
      localStorageService.clearLocalStorage();

      window.location.href = '/dang-nhap';
    } else {
      const args = {
        message: 'Đăng xuất thất bại',
        description: response.message,
        duration: 0,
      };
      notification.error(args);
    }

    setVisible(false);
  };

  const cancelLogout = async () => {
    setVisible(false);
  };

  return (
    <>
      <Link
        to={'/'}
        onClick={onLogout}
        rel="noopener noreferrer"
        className="link-text-images logout"
      >
        <LogoutOutlined /> Đăng xuất
      </Link>
      <Modal
        title="Đăng xuất"
        visible={visible}
        onCancel={cancelLogout}
        footer={[
          <Button key="back" className="button-closed" onClick={cancelLogout}>
            Hủy
          </Button>,
          <Button
            key="submit"
            onClick={logoutHandler}
            type="default"
            htmlType="submit"
            className="button-primary"
            form="form-question"
          >
            Đồng ý
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn đăng xuất?</p>
      </Modal>
    </>
  );
}

export default HeaderLogout;
