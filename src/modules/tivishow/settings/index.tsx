import LocalStorageService from "core/infrastructure/services/localStorageService";
import { getInYesterday } from "core/utils/utility";

const localStorageService = LocalStorageService.instance()
const user = localStorageService.getUser()

export const Settings = {
  donViID: user.donViID,
  ngayBaoCao: getInYesterday(),
  speed: 15000,
}