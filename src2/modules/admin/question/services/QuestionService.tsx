import HttpService from '../../../../core/infrastructure/services/httpService';

import * as route from '../route';

const httpService = HttpService.instance();

const questionService = (
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

        return {
            instance: _instance,
            list: _listAsync,
            get: _getAsync,
            create: _createAsync,
            update: _updateAsync,
            delete: _deleteAsync
        }
    }
)();

export default questionService;
