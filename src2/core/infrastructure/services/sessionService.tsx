const SessionService = (function () {
  var _service;

  function _instance() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _setToken(sessionObj) {
    sessionStorage.setItem(`access_token`, sessionObj.token);
    sessionStorage.setItem(
      `menu`,
      JSON.stringify({ donViID: Number(sessionObj.donViID), chucNangs: sessionObj.chucNangs })
    );
    sessionStorage.setItem(`userName`, sessionObj.userName);
    sessionStorage.setItem(`displayName`, sessionObj.hoTen);
    sessionStorage.setItem(`email`, sessionObj.email);
    sessionStorage.setItem(`roleId`, sessionObj.roleId);
    sessionStorage.setItem(`avatar`, sessionObj.avatar);
    sessionStorage.setItem(`userID`, sessionObj.userID);
    sessionStorage.setItem(`donViID`, sessionObj.donViID);
    sessionStorage.setItem(`tenDonVi`, sessionObj.tenDonVi);
    sessionStorage.setItem(`laTongCongTy`, sessionObj.laTongCongTy);
    sessionStorage.setItem(`isAdmin`, sessionObj.isAdmin);
  }
  function _getAvatar(defaultValue) {
    var avatarImage = sessionStorage.getItem('avatar');
    if (avatarImage != null && avatarImage !== 'null') return avatarImage;
    return defaultValue;
  }

  function _getRefreshToken() {
    return sessionStorage.getItem(`refresh_token`);
  }

  function _getEmail() {
    return sessionStorage.getItem('email');
  }

  function _getDisplayName() {
    return sessionStorage.getItem('displayName');
  }

  function _getRoleId() {
    return sessionStorage.getItem(`roleId`);
  }
  function _getMenu() {
    return sessionStorage.getItem(`menu`);
  }
  function _getUserID() {
    return sessionStorage.getItem(`userID`);
  }
  function _getDonViID() {
    return sessionStorage.getItem(`donViID`);
  }
  function _getTenDonVi() {
    return sessionStorage.getItem(`tenDonVi`);
  }
  function _getlaTongCongTy() {
    return sessionStorage.getItem(`tongCongTy`);
  }
  function _getIsAdmin() {
    return sessionStorage.getItem(`isAdmin`);
  }

  const setUser = (user) => {
    sessionStorage.setItem('userName', user.userName);
    sessionStorage.setItem('password', user.password);
  };

  const getUser = () => {
    return {
      userName: sessionStorage.getItem('userName'),
      password: sessionStorage.getItem('password'),
    };
  };

  function _clearToken() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem(`menu`);
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('displayName');
    sessionStorage.removeItem('roleId');
    sessionStorage.removeItem(`avatar`);
    sessionStorage.removeItem(`userID`);
  }

  return {
    instance: _instance,
    setToken: _setToken,
    getAvatar: _getAvatar,
    getRefreshToken: _getRefreshToken,
    getEmail: _getEmail,
    getDisplayName: _getDisplayName,
    getRoleId: _getRoleId,
    clearToken: _clearToken,
    getMenu: _getMenu,
    getUserID: _getUserID,
    getDonVi: _getDonViID,
    getTenDonVi: _getTenDonVi,
    getTongCongTy: _getlaTongCongTy,
    getIsAdmin: _getIsAdmin,
    setUser,
    getUser,
  };
})();

export default SessionService;
