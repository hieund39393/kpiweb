import HttpService from '../../../../core/infrastructure/services/httpService';

import * as route from '../route';

const httpService = HttpService.instance();

const taiKhoanService = (function () {
  var _service;

  function _instance() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  async function _resettAsync({ userId }) {
    let url = route.resetPassword + '?userId=' + userId;
    return await httpService.get(url, null);
  }

  async function _listAsync({ pageIndex, pageSize }) {
    let url = route.listNguoiDung + '?PageIndex=' + pageIndex + '&PageSize=' + pageSize;
    return await httpService.get(url, null);
  }

  async function _listDonViAsync() {
    return await httpService.get(route.listDonVi, null);
  }

  async function _listQuyenAsync() {
    return await httpService.get(route.listQuyen, null);
  }

  async function _listChucNangNguoiDungAsync(ids: string) {
    let url = route.listFuncRole + '?NguoiDungID=' + ids;
    return await httpService.get(url, {});
  }

  async function _saveChucNangNguoiDungAsync(request) {
    return await httpService.post(route.saveFuncRole, request);
  }

  async function _listChucNangAsync() {
    return await httpService.get(route.listDataChucNang, null);
  }

  async function _listChiTieuNguoiDungAsync(id: number) {
    let url = route.listDataRole + '?NguoiDungID=' + id;
    return await httpService.get(url, {});
  }

  async function _saveChiTieuNguoiDungAsync(request) {
    return await httpService.post(route.saveDataRole, request);
  }

  async function _getQuyenHeThongAsync(id: string) {
    let url = route.getByIdRole + '?ID=' + id;
    return await httpService.get(url, {});
  }

  async function _getAsync(request) {
    return await httpService.get(route.getNguoiDung, request);
  }

  async function _createAsync(request) {
    return await httpService.post(route.taoNguoiDung, request);
  }

  async function _updateAsync(request) {
    return await httpService.put(route.suaNguoiDung, request);
  }

  async function _deleteAsync(ids: string) {
    let url = route.xoaNguoiDung + '?IDs=' + ids;
    return await httpService.delete(url, {});
  }

  async function _searchUserAsync({ data, pageIndex, pageSize }) {
    let url =
      route.timKiemNguoiDung +
      '?keyWord=' +
      data.timKiem +
      '&PageIndex=' +
      pageIndex +
      '&PageSize=' +
      pageSize;
    return await httpService.get(url, null);
  }

  async function _listCategoryAsync({ pageIndex, pageSize }) {
    let url = route.listDanhMucChiTieu + '?PageIndex=' + pageIndex + '&PageSize=' + pageSize;
    return await httpService.get(url, null);
  }

  return {
    instance: _instance,
    list: _listAsync,
    get: _getAsync,
    create: _createAsync,
    update: _updateAsync,
    delete: _deleteAsync,
    listDonVi: _listDonViAsync,
    listQuyen: _listQuyenAsync,
    listFuncRole: _listChucNangAsync,
    saveChucNangNguoiDung: _saveChucNangNguoiDungAsync,
    listChucNangNguoiDung: _listChucNangNguoiDungAsync,
    getQuyenHeThong: _getQuyenHeThongAsync,
    listCategory: _listCategoryAsync,
    saveChiTieuNguoiDung: _saveChiTieuNguoiDungAsync,
    listChiTieuNguoiDung: _listChiTieuNguoiDungAsync,
    searchUser: _searchUserAsync,
    resettAsync: _resettAsync,
  };
})();

export default taiKhoanService;
