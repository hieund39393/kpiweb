import { BASE_URL } from "../../configs/config";

export const reportByDepartment = BASE_URL + 'bao-cao-chi-tieu/don-vi';
export const exportDepartment = BASE_URL + 'bao-cao-chi-tieu/export-don-vi'
export const reportByIndicator = BASE_URL + 'bao-cao-chi-tieu/chi-tieu';
export const exportIndicator = BASE_URL + 'bao-cao-chi-tieu/export-chi-tieu'
export const getListIndicator = BASE_URL + 'bao-cao-chi-tieu/list-chi-tieu';

export const listDonVi = BASE_URL + 'don-vi/list';

export const listLoaiChiTieu = BASE_URL + 'bao-cao-chi-tieu/list-chi-tieu';

export const listLoaiChiTieuBaoCao = BASE_URL + 'gia-tri-chi-tieu/list-chi-tieu';
////////// api get loại chi tiêu level 2 /////////////////
export const getIndicatorsLevel = BASE_URL + 'danh-muc-chi-tieu/get-by-bo-chi-tieu-level'