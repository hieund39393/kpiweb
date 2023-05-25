import HttpService from "../../../core/infrastructure/services/httpService";
import * as route from '../route';
import axios from 'axios';

import { _KIEUBAOCAODONVI, _LAYTHEONGAY, _LAYTHEOTHANG } from "constant";
import LocalStorageService from "core/infrastructure/services/localStorageService";
const localStorageService = LocalStorageService.instance()
const httpService = HttpService.instance();
const reportService = (
  function () {
    var _service;

    function instance() {
      if (!_service) {
        _service = this;
        return _service
      }
      return _service
    }

    const reportByDepartment = async ({ data }) => {
      let url: string = '';

      if (data.loaiChiTieuID === null) {

        if (data.loaiBaoCao === _LAYTHEONGAY) {
          url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiBaoCao=' + data.loaiBaoCao + "&Ngay=" + data.ngay + "&Thang=" + data.thang + "&Nam=" + data.nam;
        } else if (data.loaiBaoCao === _LAYTHEOTHANG) {
          url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiBaoCao=' + data.loaiBaoCao + "&Thang=" + data.thang + "&Nam=" + data.nam;
        } else url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiBaoCao=' + data.loaiBaoCao + "&Nam=" + data.nam;
      } else {
        if (data.loaiBaoCao === _LAYTHEONGAY) {
          url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiChiTieuID=' + data.loaiChiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Ngay=" + data.ngay + "&Thang=" + data.thang + "&Nam=" + data.nam;
        } else if (data.loaiBaoCao === _LAYTHEOTHANG) {
          url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiChiTieuID=' + data.loaiChiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Thang=" + data.thang + "&Nam=" + data.nam;
        } else url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiChiTieuID=' + data.loaiChiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Nam=" + data.nam;
      }
      return await httpService.get(url, null);
    };

    const reportByIndicator = async (data) => {
      let url: string = ''
      if (data.chiTieuID === 'null') {
        if (data.loaiBaoCao === _LAYTHEONGAY) {
          url = route.reportByIndicator + '?loaiBaoCao=' + data.loaiBaoCao + "&Ngay=" + data.ngay + "&Thang=" + data.thang + "&Nam=" + data.nam + '&PageIndex=' + data.pageIndex;
        } else if (data.loaiBaoCao === _LAYTHEOTHANG) {
          url = route.reportByIndicator + '?loaiBaoCao=' + data.loaiBaoCao + "&Thang=" + data.thang + "&Nam=" + data.nam + '&PageIndex=' + data.pageIndex;
        } else url = route.reportByIndicator + '?loaiBaoCao=' + data.loaiBaoCao + "&Nam=" + data.nam + '&PageIndex=' + data.pageIndex;
      } else {
        if (data.loaiBaoCao === _LAYTHEONGAY) {
          url = route.reportByIndicator + "?ChiTieuID=" + data.chiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Ngay=" + data.ngay + "&Thang=" + data.thang + "&Nam=" + data.nam + '&PageIndex=' + data.pageIndex;
        } else if (data.loaiBaoCao === _LAYTHEOTHANG) {
          url = route.reportByIndicator + "?ChiTieuID=" + data.chiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Thang=" + data.thang + "&Nam=" + data.nam + '&PageIndex=' + data.pageIndex;
        } else url = route.reportByIndicator + "?ChiTieuID=" + data.chiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Nam=" + data.nam + '&PageIndex=' + data.pageIndex;
      }
      return await httpService.get(url, null);
    };
    ////////// get loại chi tiêu level 2 /////////////////
    const getListIndicator = async ({ laMucDonVi }) => {
      const url = route.getListIndicator + '?LaMucDonVi=' + laMucDonVi;
      return await httpService.get(url, null);
    };
    async function _getIndicatorsLevelAsync({ boChiTieu, level, laMucDonVi }) {
      let url = route.getIndicatorsLevel + '?BoChiTieuID=' + boChiTieu + '&Level=' + level + '&LaMucDonVi=' + laMucDonVi
      return await httpService.get(url, {});
    }
    const listLoaiChiTieu = async () => {
      return await httpService.get(route.listLoaiChiTieu, null);
    };

    function formatTwoNumber(values: number) {
      if (values < 10) {
        return '0' + values
      }
      return values
    }

    let fileName: string = ''

    async function apiDownloadRequest(exportExcel: any, baoCao: string, type: number) {
      let token = localStorageService.getToken()
      let url: string = ''
      let routes: string = ''
      if (type === _KIEUBAOCAODONVI) routes = route.exportDepartment
      else routes = route.exportIndicator
      if (exportExcel.donViID) {
        if (exportExcel.loaiChiTieuID === null) {
          if (exportExcel.loaiBaoCao === _LAYTHEONGAY) {
            fileName = 'Ngay' + formatTwoNumber(exportExcel.ngay) + formatTwoNumber(exportExcel.thang) + exportExcel.nam
            url = routes + "?DonViID=" + exportExcel.donViID + '&loaiBaoCao=' + exportExcel.loaiBaoCao + "&Ngay=" + exportExcel.ngay + "&Thang=" + exportExcel.thang + "&Nam=" + exportExcel.nam;
          } else if (exportExcel.loaiBaoCao === _LAYTHEOTHANG) {
            fileName = 'Thang' + formatTwoNumber(exportExcel.thang) + exportExcel.nam
            url = routes + "?DonViID=" + exportExcel.donViID + '&loaiBaoCao=' + exportExcel.loaiBaoCao + "&Thang=" + exportExcel.thang + "&Nam=" + exportExcel.nam;
          } else {
            fileName = 'Nam' + exportExcel.nam;
            url = routes + "?DonViID=" + exportExcel.donViID + '&loaiBaoCao=' + exportExcel.loaiBaoCao + "&Nam=" + exportExcel.nam;
          }
        } else {
          if (exportExcel.loaiBaoCao === _LAYTHEONGAY) {
            fileName = 'Ngay' + formatTwoNumber(exportExcel.ngay) + formatTwoNumber(exportExcel.thang) + exportExcel.nam
            url = routes + "?DonViID=" + exportExcel.donViID + '&loaiChiTieuID=' + exportExcel.loaiChiTieuID + '&loaiBaoCao=' + exportExcel.loaiBaoCao + "&Ngay=" + exportExcel.ngay + "&Thang=" + exportExcel.thang + "&Nam=" + exportExcel.nam;
          } else if (exportExcel.loaiBaoCao === _LAYTHEOTHANG) {
            fileName = 'Thang' + formatTwoNumber(exportExcel.thang) + exportExcel.nam
            url = routes + "?DonViID=" + exportExcel.donViID + '&loaiChiTieuID=' + exportExcel.loaiChiTieuID + '&loaiBaoCao=' + exportExcel.loaiBaoCao + "&Thang=" + exportExcel.thang + "&Nam=" + exportExcel.nam;
          } else {
            fileName = 'Nam' + exportExcel.nam;
            url = routes + "?DonViID=" + exportExcel.donViID + '&loaiChiTieuID=' + exportExcel.loaiChiTieuID + '&loaiBaoCao=' + exportExcel.loaiBaoCao + "&Nam=" + exportExcel.nam;
          }
        }

      } else {
        if (exportExcel.chiTieuID === 'null') {
          if (exportExcel.loaiBaoCao === _LAYTHEONGAY) {
            fileName = 'Ngay' + formatTwoNumber(exportExcel.ngay) + formatTwoNumber(exportExcel.thang) + exportExcel.nam
            url = routes + '?LoaiBaoCao=' + exportExcel.loaiBaoCao + "&Ngay=" + exportExcel.ngay + "&Thang=" + exportExcel.thang + "&Nam=" + exportExcel.nam;
          } else if (exportExcel.loaiBaoCao === _LAYTHEOTHANG) {
            fileName = 'Thang' + formatTwoNumber(exportExcel.thang) + exportExcel.nam
            url = routes + '?LoaiBaoCao=' + exportExcel.loaiBaoCao + "&Thang=" + exportExcel.thang + "&Nam=" + exportExcel.nam;
          } else {
            fileName = 'Nam' + exportExcel.nam;
            url = routes + '?LoaiBaoCao=' + exportExcel.loaiBaoCao + "&Nam=" + exportExcel.nam;
          }
        } else {
          if (exportExcel.loaiBaoCao === _LAYTHEONGAY) {
            fileName = 'Ngay' + formatTwoNumber(exportExcel.ngay) + formatTwoNumber(exportExcel.thang) + exportExcel.nam
            url = routes + "?ChiTieuID=" + exportExcel.chiTieuID + '&LoaiBaoCao=' + exportExcel.loaiBaoCao + "&Ngay=" + exportExcel.ngay + "&Thang=" + exportExcel.thang + "&Nam=" + exportExcel.nam;
          } else if (exportExcel.loaiBaoCao === _LAYTHEOTHANG) {
            fileName = 'Thang' + formatTwoNumber(exportExcel.thang) + exportExcel.nam
            url = routes + "?ChiTieuID=" + exportExcel.chiTieuID + '&LoaiBaoCao=' + exportExcel.loaiBaoCao + "&Thang=" + exportExcel.thang + "&Nam=" + exportExcel.nam;
          } else {
            fileName = 'Nam' + exportExcel.nam;
            url = routes + "?ChiTieuID=" + exportExcel.chiTieuID + '&LoaiBaoCao=' + exportExcel.loaiBaoCao + "&Nam=" + exportExcel.nam;
          }

        }
      }

      await axios({
        url: url, //your url
        method: 'GET',
        responseType: 'blob', // important
        headers: {
          'Content-Type': 'blob',
          'Authorization': 'Bearer ' + token
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${baoCao}_${fileName}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    }

    async function _listDonViAsync() {
      return await httpService.get(route.listDonVi, null);
    }

    async function _listLoaiChiTieuBaoCaoAsync({ donViID, keHoach }) {
      let url = route.listLoaiChiTieuBaoCao + "?DonViID=" + donViID + "&CoKeHoach=" + keHoach
      return await httpService.get(url, null);
    }

    async function _sortDuLieuBaoCaoDonViAsync(data) {
      let url: string = '';

      if (data.loaiChiTieuID === null) {

        if (data.loaiBaoCao === _LAYTHEONGAY) {
          url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiBaoCao=' + data.loaiBaoCao + "&Ngay=" + data.ngay + "&Thang=" + data.thang + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc;
        } else if (data.loaiBaoCao === _LAYTHEOTHANG) {
          url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiBaoCao=' + data.loaiBaoCao + "&Thang=" + data.thang + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc;
        } else url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiBaoCao=' + data.loaiBaoCao + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc;
      } else {
        if (data.loaiBaoCao === _LAYTHEONGAY) {
          url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiChiTieuID=' + data.loaiChiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Ngay=" + data.ngay + "&Thang=" + data.thang + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc;
        } else if (data.loaiBaoCao === _LAYTHEOTHANG) {
          url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiChiTieuID=' + data.loaiChiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Thang=" + data.thang + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc;
        } else url = route.reportByDepartment + "?DonViID=" + data.donViID + '&loaiChiTieuID=' + data.loaiChiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc;
      }
      return await httpService.get(url, null);
    }

    async function _sortDuLieuBaoCaoChiTieuAsync(data) {
      let url: string = ''
      if (data.chiTieuID === 'null') {
        if (data.loaiBaoCao === _LAYTHEONGAY) {
          url = route.reportByIndicator + '?loaiBaoCao=' + data.loaiBaoCao + "&Ngay=" + data.ngay + "&Thang=" + data.thang + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc + "&PageIndex=" + data.pageIndex;
        } else if (data.loaiBaoCao === _LAYTHEOTHANG) {
          url = route.reportByIndicator + '?loaiBaoCao=' + data.loaiBaoCao + "&Thang=" + data.thang + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc + "&PageIndex=" + data.pageIndex;
        } else url = route.reportByIndicator + '?loaiBaoCao=' + data.loaiBaoCao + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc + "&PageIndex=" + data.pageIndex;
      } else {
        if (data.loaiBaoCao === _LAYTHEONGAY) {
          url = route.reportByIndicator + "?ChiTieuID=" + data.chiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Ngay=" + data.ngay + "&Thang=" + data.thang + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc + "&PageIndex=" + data.pageIndex;
        } else if (data.loaiBaoCao === _LAYTHEOTHANG) {
          url = route.reportByIndicator + "?ChiTieuID=" + data.chiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Thang=" + data.thang + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc + "&PageIndex=" + data.pageIndex;
        } else url = route.reportByIndicator + "?ChiTieuID=" + data.chiTieuID + '&loaiBaoCao=' + data.loaiBaoCao + "&Nam=" + data.nam + "&SortType=" + data.sortType + "&Asc=" + data.asc + "&PageIndex=" + data.pageIndex;
      }
      return await httpService.get(url, null);
    };

    return {
      getIndicatorsLevel: _getIndicatorsLevelAsync,
      instance,
      reportByDepartment,
      reportByIndicator,
      getListIndicator,
      listLoaiChiTieu,
      apiDownloadRequest,
      listDonVi: _listDonViAsync,
      listLoaiChiTieuBaoCao: _listLoaiChiTieuBaoCaoAsync,
      sortDuLieuBaoCaoDonVi: _sortDuLieuBaoCaoDonViAsync,
      sortDuLieuBaoCaoChiTieu: _sortDuLieuBaoCaoChiTieuAsync
    };
  }
)();

export default reportService;
