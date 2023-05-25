import { BASE_URL } from '../../../configs/config';

export const listNguoiDung = BASE_URL + 'nguoi-dung/list';
export const getNguoiDung = BASE_URL + 'quyen-he-thong/get';
export const taoNguoiDung = BASE_URL + 'nguoi-dung/create';
export const suaNguoiDung = BASE_URL + `nguoi-dung/update`;
export const xoaNguoiDung = BASE_URL + `nguoi-dung/delete`;
export const timKiemNguoiDung = BASE_URL + 'nguoi-dung/search';

export const listDonVi = BASE_URL + 'don-vi/list';
export const listQuyen = BASE_URL + 'quyen-he-thong/list';

export const listRoles = BASE_URL + 'quyen-he-thong/list';
export const getByIdRole = BASE_URL + 'quyen-he-thong/get';
export const createRole = BASE_URL + 'quyen-he-thong/create';
export const updateRole = BASE_URL + `quyen-he-thong/update`;
export const removeRole = BASE_URL + `quyen-he-thong/delete`;
export const importExcelRole = BASE_URL + 'quyen-he-thong/import-excel';
export const searchRole = BASE_URL + 'quyen-he-thong/search';

export const listFuncRole = BASE_URL + 'nguoi-dung-chuc-nang/list';
export const saveFuncRole = BASE_URL + 'nguoi-dung-chuc-nang/save';
export const createFuncRole = BASE_URL + 'nguoi-dung-chuc-nang/create';
export const updateFuncRole = BASE_URL + `nguoi-dung-chuc-nang/update`;
export const removeFuncRole = BASE_URL + `nguoi-dung-chuc-nang/delete`;

export const listDataRole = BASE_URL + 'nguoi-dung-chi-tieu/list';
export const createDataRole = BASE_URL + 'nguoi-dung-chi-tieu/create';
export const saveDataRole = BASE_URL + 'nguoi-dung-chi-tieu/save';
export const updateDataRole = BASE_URL + `nguoi-dung-chi-tieu/update`;
export const removeDataRole = BASE_URL + `nguoi-dung-chi-tieu/delete`;

export const listDataChucNang = BASE_URL + 'chuc-nang/list';
export const treeChucNang = BASE_URL + 'chuc-nang/tree';

export const listDanhMucChiTieu = BASE_URL + 'danh-muc-chi-tieu/tree';

export const resetPassword = BASE_URL + 'nguoi-dung/reset-password';
