import { notification } from 'antd';
import LocalStorageService from 'core/infrastructure/services/localStorageService';
import HttpService from '../../../../core/infrastructure/services/httpService';

import * as route from '../route';

const httpService = HttpService.instance();
const localStorageService = LocalStorageService.instance()
const donViService = (
  function () {
    var _service;

    function _instance() {
      if (!_service) {
        _service = this;
        return _service
      }
      return _service
    }

    async function _listAsync() {
      return await httpService.get(route.list, null);
    }

    async function _getAsync(request) {
      return await httpService.get(route.getById, request);
    }

    async function _createAsync(request) {
      return await httpService.post(route.create, request);
    }

    async function _updateAsync(request) {
      return await httpService.put(route.update, request);
    }

    async function _deleteAsync(ids: string) {
      let url = route.remove + "?IDs=" + ids;
      return await httpService.delete(url, {});
    }

    async function _importAsync(request) {
      return await httpService.post(route.importExcel, request);
    }

    async function _searchDonViAsync({ data, pageIndex, pageSize }) {
      let url = route.search + "?keyWord=" + data + '&PageIndex=' + pageIndex + '&PageSize=' + pageSize;
      return await httpService.get(url, null);
    }

    const token = localStorageService.getToken();
    const configUpload = {
      name: "FileExcel",
      accept: ".xlsx",
      multiple: true,
      maxCount: 1,
      headers: {
        "Authorization": "Bearer " + token,
      },
      action: route.importExcel,
      onChange(info) {
        const status = info.file.status;
        if (status === "done") {
          const args = {
            message: 'Nhập dữ liệu thành công',
            description: info.file.response.message + ' ' + info.file.name,
            duration: 5,
          };
          notification.success(args);
        } else if (status === "error") {
          const args = {
            message: 'Nhập dữ liệu thất bại',
            description: info.file.response.message + ' ' + info.file.name,
            duration: 5,
          };
          notification.error(args);
        }
      }
    };

    return {
      instance: _instance,
      list: _listAsync,
      get: _getAsync,
      create: _createAsync,
      update: _updateAsync,
      delete: _deleteAsync,
      import: _importAsync,
      search: _searchDonViAsync,
      configUpload
    }
  }
)();

export default donViService;
