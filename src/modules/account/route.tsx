import { BASE_URL } from "../../configs/config";

export const login = BASE_URL + 'nguoi-dung/dang-nhap';
export const loginPages = window.location.protocol + window.location.href + ":" + window.location.port + '/dang-nhap/';
export const logout = BASE_URL + 'nguoi-dung/dang-xuat';
export const forgot = BASE_URL + 'nguoi-dung/quen-mat-khau';
export const loginWithRefreshToken = 'account/login-with-refresh-token';
export const changePassword = BASE_URL + 'nguoi-dung/doi-mat-khau';
export const menuManifest = BASE_URL + 'nguoi-dung-chuc-nang/list';

