import HttpService from '../../../core/infrastructure/services/httpService';

import * as route from '../route';

const httpService = HttpService.instance();

const ChartService = (function () {
  var _service;

  function _instance() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  async function _getChartAsync(request) {
    return await httpService.post(route.getChart, request);
  }

  async function _listDetailAsync({
    chiTieuID,
    chiTieuEVNID,
    donViID,
    ngay,
    layNgayGanNhat,
    pageIndex,
    pageSize,
  }) {
    let url =
      route.listDetail +
      '?chiTieuID=' +
      chiTieuID +
      '&ChiTieuEVNID=' +
      chiTieuEVNID +
      '&DonViID=' +
      donViID +
      '&Ngay=' +
      ngay +
      '&layNgayGanNhat=' +
      layNgayGanNhat +
      '&PageIndex=' +
      pageIndex +
      '&pageSize=' +
      pageSize;
    return await httpService.get(url, {});
  }

  async function _listIndicatorsAsync() {
    return await httpService.get(route.listIndicators, null);
  }

  async function _getIndicatorsLevelAsync({ boChiTieuID, level }) {
    let url = route.getIndicatorsLevel + '?BoChiTieuID=' + boChiTieuID + '&Level=' + level;
    return await httpService.get(url, {});
  }

  const getDataChartLevel2 = (request) => {
    return httpService.post(route.getDataChartLevel2, request);
  };

  const getTableLevel2 = (request) => {
    return httpService.post(route.getTableLevel2, request);
  };

  async function _listNgaySuCoAsync({ chiTieuID, chiTieuEVNID, donViID, ngay }) {
    let url =
      route.listNgaySuCo +
      '?ChiTieuID=' +
      chiTieuID +
      '&ChiTieuEVNID=' +
      chiTieuEVNID +
      '&DonViID=' +
      donViID +
      '&Ngay=' +
      ngay;
    return await httpService.get(url, {});
  }

  async function _listGiaiQuyetAsync({ donViID, ngayBaoCao, thang, chiTieuID }) {
    let url =
      route.listGiaiQuyet +
      '?DonViID=' +
      donViID +
      '&NgayBaoCao=' +
      ngayBaoCao +
      '&Thang=' +
      thang +
      '&ChiTieuID=' +
      chiTieuID;
    return await httpService.get(url, {});
  }

  async function _listSliderShowAsync(request) {
    return await httpService.post(route.listSliderShow, request);
  }

  async function _danhSachCongTrinhAsync({ chiTieuID, donViID, thang, nam }) {
    let url =
      route.getDanhSachCongTrinh +
      '?chiTieuId=' +
      chiTieuID +
      '&donViId=' +
      donViID +
      '&thang=' +
      thang +
      '&nam=' +
      nam;
    return await httpService.get(url, {});
  }

  return {
    instance: _instance,
    get: _getChartAsync,
    listDetail: _listDetailAsync,
    listIndicators: _listIndicatorsAsync,
    getIndicatorsLevel: _getIndicatorsLevelAsync,
    getDataChartLevel2,
    getTableLevel2,
    listNgaySuCo: _listNgaySuCoAsync,
    listGiaiQuyetAsync: _listGiaiQuyetAsync,
    listSliderShow: _listSliderShowAsync,
    danhSachCongTrinhAsync: _danhSachCongTrinhAsync,
  };
})();

export default ChartService;
