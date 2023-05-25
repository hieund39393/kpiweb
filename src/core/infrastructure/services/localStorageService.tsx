const localStorageService = (function () {
  var _service;

  function _instance() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _setUser(user) {

    console.log("localST: ", user)

    localStorage.setItem(`access_token`, user.token);
    localStorage.setItem(`userID`, user.userID);
    localStorage.setItem(`userName`, user.userName);
    localStorage.setItem(`displayName`, user.hoTen);
    localStorage.setItem(`email`, user.email);
    localStorage.setItem(`roleId`, user.roleId);
    localStorage.setItem(`avatar`, user.avatar);
    localStorage.setItem(`donViID`, user.donViID);
    localStorage.setItem(`tenDonVi`, user.tenDonVi);
    localStorage.setItem(`isTongCongTy`, user.laTongCongTy);
    localStorage.setItem(`isAdmin`, user.isAdmin);
    localStorage.setItem(`coBieuDoQuanTam`, user.coBieuDoQuanTam);
    localStorage.setItem(
      `menu`,
      JSON.stringify({ donViID: Number(user.donViID), chucNangs: user.chucNangs })
    );
  }

  // function _getAvatar(defaultAvatar) {
  //   var avatarImage = localStorage.getItem('avatar');
  //   if (avatarImage != null && avatarImage !== 'null') return avatarImage;
  //   return defaultAvatar;
  // }

  function _getUserName() {
    return localStorage.getItem('userName');
  }

  function _getBieuDoQuanTam() {
    return localStorage.getItem('coBieuDoQuanTam');
  }

  function _getEmail() {
    return localStorage.getItem('email');
  }

  function _getDisplayName() {
    return localStorage.getItem('displayName');
  }

  function _getRoleId() {
    return localStorage.getItem(`roleId`);
  }
  function _getMenu() {
    return localStorage.getItem(`menu`);
  }
  function _getUserID() {
    return localStorage.getItem(`userID`);
  }
  function _getDonViID() {
    return localStorage.getItem(`donViID`);
  }
  function _getTenDonVi() {
    return localStorage.getItem(`tenDonVi`);
  }
  function _getIsTongCongTy() {
    return localStorage.getItem(`isTongCongTy`);
  }
  function _getIsAdmin() {
    return localStorage.getItem(`isAdmin`);
  }

  function _getToken() {
    return localStorage.getItem(`access_token`);
  }

  function _getUser() {
    var user = {
      userID: _getUserID,
      userName: _getUserName(),
      displayName: _getDisplayName(),
      email: _getEmail(),
      roleId: _getRoleId(),
      donViID: _getDonViID(),
      tenDonVi: _getTenDonVi(),
      isTongCongTy: _getIsTongCongTy(),
      isAdmin: _getIsAdmin(),
      coBieuDoQuanTam: _getBieuDoQuanTam()
    };

    return user;
  }

  function _clearToken() {
    localStorage.removeItem('access_token');
  }

  function _clearLocalStorage() {
    const isRememberMe = localStorage.getItem('rememberMe')!;
    localStorage.clear();
    localStorage.setItem('rememberMe', isRememberMe);
  }

  const setRememberMe = (isRememberMe) => {
    localStorage.setItem('rememberMe', isRememberMe);
  };

  const getRememberMe = () => {
    return localStorage.getItem('rememberMe');
  };

  return {
    instance: _instance,
    getToken: _getToken,
    getDisplayName: _getDisplayName,
    setUser: _setUser,
    getMenu: _getMenu,
    getUser: _getUser,
    clearToken: _clearToken,
    clearLocalStorage: _clearLocalStorage,
    setRememberMe,
    getRememberMe,
  };
})();

export default localStorageService;
