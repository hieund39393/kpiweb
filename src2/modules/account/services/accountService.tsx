import HttpService from '../../../core/infrastructure/services/httpService';
import * as accountRoute from '../route';

const httpService = HttpService.instance();

const accountService = (
    function () {
        var _service;

        function _instance() {
            if (!_service) {
                _service = this;
                return _service
            }
            return _service
        }

        async function _loginAsync(request) {            
            return await httpService.post(accountRoute.login, request, true);
        }

        async function _logoutAsync() {
            var request = {};   //{tocken: sessionService.getAccessToken()};
            //try{
            var response = await httpService.post(accountRoute.logout, request, true);
            return response;
            /* }
             catch(exception){
                 var jsonValue = JSON.parse(exception.request.response);
                 return {statusCode:exception.request.status,
                         error:!!jsonValue.message?jsonValue.message: exception.request.response };
             }
             */
        }
        async function _fogotAsync(tenDangNhap) {
            var request = { tenDangNhap: tenDangNhap };
            return await httpService.post(accountRoute.forgot, request, true);
        }

        async function _loginWithRefreshTokenAsync(request) {
            return await httpService.post(accountRoute.loginWithRefreshToken, request, true);
        }

        const changePassword = async (request) => {
            return await httpService.put(accountRoute.changePassword, request);
        }
        async function _checkManifestMenuAsync(user) {
            return await httpService.get(accountRoute.menuManifest + "?NguoiDungID=" + user, {}, true);
        }


        return {
            instance: _instance,
            login: _loginAsync,
            logout: _logoutAsync,
            forgot: _fogotAsync,
            loginWithRefreshToken: _loginWithRefreshTokenAsync,
            changePassword,
            checkManifestMenuAsync: _checkManifestMenuAsync
        }
    }
)();

export default accountService;
