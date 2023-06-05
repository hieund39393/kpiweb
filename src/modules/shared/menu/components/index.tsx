import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Button, Tooltip, Drawer } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import '../../menu/menu.css';
import { ChucNangItem, MenuItem } from '../model';
import { routes } from '../routes';
import BoChiTieuMenu from './kpi';
import { isTablet } from 'react-device-detect';

import LocalStorageService from '../../../../core/infrastructure/services/localStorageService';
import { _BCT, _BCTKT } from 'constant/chart';
import {
  _BAOCAO,
  _BOCHITIEUKINHDOANH,
  _BOCHITIEUKYTHUAT,
  _BOCHITIEUSUACHUA,
  _BOCHITIEUXAYDUNG,
  _BOCHITIEUQUANTRI,
  _BOCHITIEUTAICHINH,
  _BOCHITIEUANTOAN,
  _BOCHITIEUCHUYENDOISO,
  _BOCHITIEUTHANHTRAKIEMTRA,
  _BOCHITIEUBAOCAODIEUHANH,
  _BOCHITIEUTUDONGHOA,
  _THEOCHITIEU,
  _THEODONVI,
} from 'constant/menu';

const localStorageService = LocalStorageService.instance();

const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const SideBar = () => {
  const [menu] = useState(fetchMenu());
  const [defaultOpenKeys] = useState(setOpenKeyHandler());
  const [defaultSelectedKeys, setSelectedKeys] = useState(setSelectedKeyHandler());
  const [collapsed, setCollapsed] = useState(false);
  const [fixContent, setFixContent] = useState('opened-menu');
  function fetchMenu() {
    const sessionMenu = localStorageService.getMenu();
    var menuData = { chucNangs: [] };

    menuData = JSON.parse(sessionMenu != null ? sessionMenu.toString() : '{}');
    const chucNangs: Array<ChucNangItem> = JSON.parse(JSON.stringify(menuData.chucNangs));
    const menuItems = convertToMenuItem(chucNangs);

    return menuItems;
  }

  function findDevice() {
    if (isTablet) {
      if (window.innerWidth <= 991) {
        setCollapsed(false);
      } else if (window.innerWidth > 991 && window.innerWidth <= 1024) {
        setCollapsed(true);
      } else setCollapsed(false);
    } else if (window.innerWidth >= 1025 && window.innerWidth <= 1366) {
      setFixContent('closed-menu');
      setCollapsed(true);
    } else setCollapsed(false);
  }

  useEffect(() => {
    findDevice();
  }, []);

  function setOpenKeyHandler() {
    let openKey = _BCT;

    menu.forEach((item) => {
      if (item.children.length > 0) {
        item.children.forEach((el) => {
          if (el.path === window.location.pathname) {
            openKey = item.key;

            return openKey;
          }
        });
      }
    });
    return openKey;
  }

  function setSelectedKeyHandler() {
    let selectedKey = _BCTKT;

    menu.forEach((item) => {
      if (item.children.length > 0) {
        item.children.forEach((el) => {
          if (el.path === window.location.pathname) {
            selectedKey = el.key;

            return selectedKey;
          }
        });
      }
    });
    return selectedKey;
  }

  // Covert chức năng trả về sang Menu item
  function convertToMenuItem(chucNangs: Array<ChucNangItem>) {
    var menuItems: MenuItem[] = [];

    // Danh sách chức năng cha
    const chucNangItems = chucNangs.filter((e) => e.chucNangChaID === null && e.chiTieuID === 0);
    const chiTieus = chucNangs.filter((e) => e.chiTieuID > 0);
    // console.log(chiTieus)
    // console.log(chucNangItems)
    // Menu cấp 1
    chucNangItems.forEach((cn) => {
      const route = routes.filter((o) => o.id === cn.chucNangID);
      if (route.length > 0) {
        let menuItem: MenuItem = {
          key: route[0].key,
          title: cn.tenChucNang,
          path: route[0].path,
          icon: route[0].icon,
          component: !!route[0].component ? route[0].component : null,
          children: [],
          enableShow: false,
          chucNangID: cn.chucNangID,
          chiTieuID: 0,
          rootID: 0,
        };

        let children = chucNangs.filter((e) => e.chucNangChaID === cn.chucNangID);
        children.forEach((child) => {
          // console.log(child)
          let childRoute = routes.filter((o) => o.id === child.chucNangID);
          let chiTieuss = chiTieus.filter((e) => e.chucNangChaID === child.chucNangID);

          if (childRoute != null) {
            let chiTieusItems: Array<MenuItem> = [];

            chiTieuss.forEach((chiTieu) => {
              let chiTieuItem: MenuItem = {
                key: `CT_${chiTieu.chiTieuID}`,
                title: chiTieu.tenChucNang,
                path: '',
                icon: null,
                component: null,
                children: [],
                enableShow: false,
                chucNangID: chiTieu.chucNangID,
                chiTieuID: chiTieu.chiTieuID,
                rootID: chiTieu.rootID,
              };

              chiTieusItems.push(chiTieuItem);
            });
            let childItem: MenuItem = {
              key: childRoute[0]?.key,
              title: child.tenChucNang,
              path: childRoute[0]?.path,
              icon: childRoute[0]?.icon,
              component: !!childRoute[0]?.component ? childRoute[0]?.component : null,
              children: chiTieusItems,
              enableShow: false,
              chucNangID: child.chucNangID,
              chiTieuID: child.chiTieuID,
              rootID: child.rootID,
            };
            menuItem.children.push(childItem);
          }
        });

        menuItems.push(menuItem);
      }
    });
    return menuItems;
  }

  // Xử lý colspan
  const openMenu = () => {
    setCollapsed(true);
    setFixContent('closed-menu');
  };

  const closeMenu = () => {
    setCollapsed(false);
    setFixContent('opened-menu');
  };

  const [name, setName] = useState('');

  // eslint-disable-next-line
  const menuItemCickHandler = (e) => {
    setSelectedKeys(e.key);
    window.scrollTo(0, 0);

    if (
      e.key === _BOCHITIEUKYTHUAT ||
      e.key === _BOCHITIEUKINHDOANH ||
      e.key === _BOCHITIEUXAYDUNG ||
      e.key === _BOCHITIEUSUACHUA ||
      e.key === _BOCHITIEUQUANTRI ||
      e.key === _BOCHITIEUTAICHINH ||
      e.key === _BOCHITIEUANTOAN ||
      e.key === _BOCHITIEUCHUYENDOISO ||
      e.Key === _BOCHITIEUTHANHTRAKIEMTRA ||
      e.Key === _BOCHITIEUBAOCAODIEUHANH ||
      e.Key === _BOCHITIEUTUDONGHOA ||
      e.key === _THEODONVI ||
      e.key === _THEOCHITIEU ||
      e.key === _BAOCAO
    ) {
      setName('layout-dashboard');
    } else setName('layout-content');
  };

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const [classMenu, setClassMenu] = useState('fixed-100');

  // Render menu
  const renderMenu = useMemo(
    () => {
      return (
        <Sider
          width={300}
          id="side-bar"
          className={classMenu}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            mode="inline"
            className="side-bar--menu"
            defaultSelectedKeys={[defaultSelectedKeys]}
            defaultOpenKeys={[defaultOpenKeys]}
          >
            {window.innerWidth > 1024 ? (
              collapsed ? (
                <Tooltip title="Đóng menu">
                  <li className="ant-menu-submenu ant-menu-submenu-inline">
                    <Button
                      onClick={closeMenu}
                      className="toggle-sidebar"
                      icon={<DoubleRightOutlined />}
                    ></Button>
                  </li>
                </Tooltip>
              ) : (
                <Tooltip title="Hiển thị menu">
                  <li className="ant-menu-submenu ant-menu-submenu-inline">
                    {' '}
                    <Button
                      onClick={openMenu}
                      className="toggle-sidebar"
                      icon={<DoubleLeftOutlined />}
                    ></Button>
                  </li>
                </Tooltip>
              )
            ) : (
              ''
            )}

            {menu.map((item) => {
              if (item.children.length > 0) {
                return (
                  <SubMenu
                    key={item.key}
                    icon={item.icon}
                    className="submenu-item-lv1"
                    title={
                      <>
                        <span className="private-layout__dot" />
                        {item.title}
                      </>
                    }
                  >
                    {item.children.map((child) => {
                      if (
                        child.key === _BOCHITIEUKYTHUAT ||
                        child.key === _BOCHITIEUKINHDOANH ||
                        child.key === _BOCHITIEUXAYDUNG ||
                        child.key === _BOCHITIEUSUACHUA ||
                        child.key === _BOCHITIEUQUANTRI ||
                        child.key === _BOCHITIEUTAICHINH ||
                        child.key === _BOCHITIEUANTOAN ||
                        child.key === _BOCHITIEUCHUYENDOISO ||
                        child.key === _BOCHITIEUTHANHTRAKIEMTRA ||
                        child.key === _BOCHITIEUBAOCAODIEUHANH ||
                        child.key === _BOCHITIEUTUDONGHOA
                      ) {
                        let href = '#' + child.key;
                        let chiTieus = child.children.sort((a, b) =>
                          a.rootID > b.rootID ? 1 : -1
                        );

                        if (chiTieus.length === 0) {
                          return (
                            <Menu.Item key={child.key} icon={child.icon} className="menu-item-lv2">
                              <BoChiTieuMenu href={href} title={child.title} chiTieus={chiTieus} />
                            </Menu.Item>
                          );
                        } else {
                          return (
                            <SubMenu
                              key={child.key}
                              icon={child.icon}
                              title={child.title}
                              className="submenu-item-lv2"
                            >
                              {chiTieus.map((e) => {
                                let chiTieuHref = '#' + e.key;
                                return (
                                  <Menu.Item key={e.key} className="menu-lv3">
                                    <BoChiTieuMenu
                                      href={chiTieuHref}
                                      title={e.title}
                                      chiTieus={[]}
                                    />
                                  </Menu.Item>
                                );
                              })}
                            </SubMenu>
                          );
                        }
                      } else {
                        return (
                          <Menu.Item
                            key={child.key}
                            icon={child.icon}
                            onClick={menuItemCickHandler}
                          >
                            <Link to={child.path}>{child.title}</Link>
                          </Menu.Item>
                        );
                      }
                    })}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  className="ant-menu-submenu-title side-bar--menu--parent"
                  onClick={menuItemCickHandler}
                >
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collapsed, defaultSelectedKeys, defaultOpenKeys, menuItemCickHandler, menu]
  );

  const menuResponsive = useMemo(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80) setClassMenu('fixed-0');
      else setClassMenu('fixed-unset');
    };
    window.addEventListener('scroll', changeBackground);

    if (window.innerWidth > 1024) {
      return renderMenu;
    } else {
      return (
        <>
          <Button
            className="choice-menu"
            type="default"
            onClick={showDrawer}
            icon={<MenuUnfoldOutlined />}
          ></Button>
          <Drawer title="Danh sách chức năng" placement="left" onClose={onClose} visible={visible}>
            {renderMenu}
          </Drawer>
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, collapsed, name, classMenu]);

  return <>{menuResponsive}</>;
};

export default SideBar;
