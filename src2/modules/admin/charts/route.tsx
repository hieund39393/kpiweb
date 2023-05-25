import { BASE_URL } from "configs/config";

export const list = BASE_URL + 'bieu-do/list'
export const get = BASE_URL + 'bieu-do/get'
export const create = BASE_URL + 'bieu-do/create'
export const update = BASE_URL + 'bieu-do/update'
export const remove = BASE_URL + 'bieu-do/delete'
export const search = BASE_URL + 'bieu-do/search'
export const listBoChiTieu = BASE_URL + 'bieu-do/list-bo-chi-tieu'
export const listChiTieu = BASE_URL + 'nguoi-dung-chi-tieu/list';
export const listChiTieuLv3 = BASE_URL + 'bieu-do/list-chi-tieu';
export const getIndicatorsLevel = BASE_URL + 'danh-muc-chi-tieu/get-by-bo-chi-tieu-level'
export const createAuto = BASE_URL + 'bieu-do/auto-create'