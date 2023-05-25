import HttpService from '../../../../core/infrastructure/services/httpService';

import * as route from '../route';

const httpService = HttpService.instance();

const listChartService = (
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
            let url = route.list + '?GroupID=' + data.groupID + '&ChiTieuID=' + data.chiTieuLV3 + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize;
            return await httpService.get(url, null);
        }

        async function _listBoChiTieuAsync({ pageIndex, pageSize }) {
            let url = route.listBoChiTieu + "?PageIndex=" + pageIndex + "&PageSize=" + pageSize;
            return await httpService.get(url, null);
        }

        async function _listLoaiChiTieuLv3Async(groupID) {
            let url = route.listChiTieuLv3 + "?GroupID=" + groupID;
            return await httpService.get(url, null);
        }

        async function _listChucNangNguoiDungAsync(ids: string) {
            let url = route.listChiTieu + "?NguoiDungID=" + ids;
            return await httpService.get(url, {});
        }

        async function _getAsync(request) {
            return await httpService.get(route.get, request);
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
            let url = route.search + "?keyWord=" + data.value + '&GroupID=' + data.groupID + '&ChiTieuID=' + data.chiTieuID + '&PageIndex=' + pageIndex + '&PageSize=' + pageSize;
            return await httpService.get(url, null);
        }

        async function _getIndicatorsLevelAsync({ boChiTieu, level }) {
            let url = route.getIndicatorsLevel + '?BoChiTieuID=' + boChiTieu + '&Level=' + level
            return await httpService.get(url, {});
        }

        async function _createAutoAsync() {
            return await httpService.post(route.createAuto, null);
        }
        return {
            instance: _instance,
            list: _listAsync,
            get: _getAsync,
            create: _createAsync,
            update: _updateAsync,
            delete: _deleteAsync,
            search: _searchAsync,
            getIndicatorsLevel: _getIndicatorsLevelAsync,
            listBoChiTieu: _listBoChiTieuAsync,
            listChiTieu: _listChucNangNguoiDungAsync,
            listLoaiChiTieuLv3: _listLoaiChiTieuLv3Async,
            createAuto: _createAutoAsync
        }
    }
)();


export default listChartService;
