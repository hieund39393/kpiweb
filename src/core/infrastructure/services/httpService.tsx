import HttpUtil from '../../utils/httpUtil'

const httpService = (
    function () {
        let response;
        var _service;

        function _instance() {
            if (!_service) {
                _service = this;
                return _service
            }
            return _service
        }

        async function getAsync(url, data) {
            response = await HttpUtil.get(url, data);
            return response.data;
        };

        async function postAsync(url, data) {
            // try {
                
            // }
            // catch (exception) {
            //     var jsonValue = JSON.parse(exception.request.response);
            //     return {
            //         statusCode: exception.request.status,
            //         error: !!jsonValue.message ? jsonValue.message : exception.request.response
            //     };
            // }

            response = await HttpUtil.post(url, data);
                return response.data;
        };

        async function putAsync(url, data) {
            response = await HttpUtil.put(url, data);
            return response.data;
        };
        
        async function deleteAsync(url, data) {
            const response = await HttpUtil.delete(url, data);
            return response.data;
        };

        return {
            instance: _instance,
            get: getAsync,
            post: postAsync,
            put: putAsync,
            delete: deleteAsync
        }
    }
)();

export default httpService;
