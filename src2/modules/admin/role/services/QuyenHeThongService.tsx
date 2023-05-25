import HttpService from '../../../../core/infrastructure/services/httpService';

import * as route from '../route';

const httpService = HttpService.instance();

const quyenHeThongService = (
    function () {
        var _service;

        function _instance() {
            if (!_service) {
                _service = this;
                return _service
            }
            return _service
        }

        async function _listAsync({ pageIndex, pageSize }) {
            let url = route.list + "?PageIndex=" + pageIndex + "&PageSize=" + pageSize;
            return await httpService.get(url, null);
        }

        async function _treeChucNangAsync({ pageIndex, pageSize }) {
            let url = route.treeChucNang + "?PageIndex=" + pageIndex + "&PageSize=" + pageSize;
            return await httpService.get(url, null);
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

        async function _searchAsync({ data, pageIndex, pageSize }) {
            let url = route.search + "?keyWord=" + data + '&PageIndex=' + pageIndex + '&PageSize=' + pageSize;
            return await httpService.get(url, {});
        }

        return {
            instance: _instance,
            list: _listAsync,
            get: _getAsync,
            create: _createAsync,
            update: _updateAsync,
            delete: _deleteAsync,
            treeChucNang: _treeChucNangAsync,
            search: _searchAsync
        }
    }
)();

export default quyenHeThongService;
