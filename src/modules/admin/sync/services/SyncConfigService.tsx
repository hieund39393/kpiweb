import HttpService from "../../../../core/infrastructure/services/httpService";

import * as route from '../route'

const httpService = HttpService.instance();

const settingServices = (
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

        async function _getAsync(id: number) {
            let url = route.get + "?ID=" + id;
            return await httpService.get(url, null);
        }

        async function _updateAsync(request) {
            return await httpService.put(route.update, request);
        }

        return {
            instance: _instance,
            list: _listAsync,
            get: _getAsync,
            update: _updateAsync,
        }
    }
)();

export default settingServices;
