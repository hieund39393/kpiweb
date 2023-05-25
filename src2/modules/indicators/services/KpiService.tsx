import { _LAYTHEONAM, _LAYTHEOTHANG } from 'constant';
import HttpService from '../../../core/infrastructure/services/httpService';

import * as route from '../route';

const httpService = HttpService.instance();

const KpiService = (
  function () {
    var _service;

    function _instance() {
      if (!_service) {
        _service = this;
        return _service
      }
      return _service
    }

    async function _listAsync({ data, pageIndex, pageSize }) {
      let url: string = '';
      if (data.loaiChiTieuID === 'null') {
        if (data.thang === null) {
          url = route.list + "?DonViID=" + data.donViID + '&nam=' + data.nam + '&LoaiBaoCao=' + _LAYTHEONAM + '&PageIndex=' + pageIndex + "&PageSize=" + pageSize;
        } else url = route.list + "?DonViID=" + data.donViID + '&Thang=' + data.thang + '&nam=' + data.nam + '&LoaiBaoCao=' + _LAYTHEOTHANG + '&PageIndex=' + pageIndex + "&PageSize=" + pageSize;
      } else {
        if (data.thang === null) {
          url = route.list + "?DonViID=" + data.donViID + '&LoaiChiTieuID=' + data.loaiChiTieuID + '&LoaiBaoCao=' + _LAYTHEONAM + '&nam=' + data.nam + '&PageIndex=' + pageIndex + "&PageSize=" + pageSize;
        } else url = route.list + "?DonViID=" + data.donViID + '&LoaiChiTieuID=' + data.loaiChiTieuID + '&LoaiBaoCao=' + _LAYTHEOTHANG + '&Thang=' + data.thang + '&nam=' + data.nam + '&PageIndex=' + pageIndex + "&PageSize=" + pageSize;
      }

      return await httpService.get(url, null);
    }

    async function _listDonViAsync() {
      return await httpService.get(route.listDonVi, null);
    }

    async function _updateAsync(request) {
      return await httpService.put(route.update, request);
    }

    async function _listThucHienAsync({ data, pageIndex, pageSize }) {
      let url: string = '';
      if (data.loaiChiTieuID === 'null') {
        if (data.thang === null) {
          url = route.listThucHien + "?DonViID=" + data.donViID + '&Nam=' + data.nam + '&LoaiBaoCao=' + data.loaiBaoCao + '&PageIndex=' + pageIndex + "&PageSize=" + pageSize;
        } else url = route.listThucHien + "?DonViID=" + data.donViID + '&Thang=' + data.thang + '&Nam=' + data.nam + '&LoaiBaoCao=' + data.loaiBaoCao + '&PageIndex=' + pageIndex + "&PageSize=" + pageSize;
      } else {
        if (data.thang === null) {
          url = route.listThucHien + "?DonViID=" + data.donViID + '&LoaiChiTieuID=' + data.loaiChiTieuID + '&LoaiBaoCao=' + data.loaiBaoCao + '&Nam=' + data.nam + '&PageIndex=' + pageIndex + "&PageSize=" + pageSize;
        } else url = route.listThucHien + "?DonViID=" + data.donViID + '&LoaiChiTieuID=' + data.loaiChiTieuID + '&LoaiBaoCao=' + data.loaiBaoCao + '&Thang=' + data.thang + '&Nam=' + data.nam + '&PageIndex=' + pageIndex + "&PageSize=" + pageSize;
      }

      return await httpService.get(url, null);
    }

    async function _updateThucHienAsync(request) {
      return await httpService.put(route.updateThucHien, request);
    }

    async function _listLoaiChiTieuAsync({ donViID, keHoach }) {
      let url = route.listLoaiChiTieu + "?DonViID=" + donViID + "&CoKeHoach=" + keHoach
      return await httpService.get(url, null);
    }

    async function _listdanhMucChiTieuAsync({ pageIndex, pageSize }) {
      let url = route.listDanhMuc + "?PageIndex=" + pageIndex + '&PageSize=' + pageSize
      return await httpService.get(url, null);
    }

    async function _createDanhMucChiTieuAsync(request) {
      return await httpService.post(route.createDanhMuc, request);
    }

    async function _updateDanhMucChiTieuAsync(request) {
      return await httpService.put(route.updateDanhMuc, request);
    }

    async function _deleteDanhMucChiTieuAsync(ids: string) {
      let url = route.removeDanhMuc + "?IDs=" + ids;
      return await httpService.delete(url, {});
    }

    return {
      instance: _instance,
      list: _listAsync,
      update: _updateAsync,
      listThucHien: _listThucHienAsync,
      updateThucHien: _updateThucHienAsync,
      listLoaiChiTieu: _listLoaiChiTieuAsync,
      listDonVi: _listDonViAsync,
      listDanhMuc: _listdanhMucChiTieuAsync,
      createDanhMuc: _createDanhMucChiTieuAsync,
      updateDanhMuc: _updateDanhMucChiTieuAsync,
      deleteDanhMuc: _deleteDanhMucChiTieuAsync
    }
  }
)();

export default KpiService;