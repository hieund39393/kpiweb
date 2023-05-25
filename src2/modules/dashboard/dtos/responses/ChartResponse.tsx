import { Component } from 'react';
export interface RouteAdmin {
  _key: string;
  _title: string;
  _path: string;
  _icon: Component;
  _component: Component;
  _submenu: Array<any>;
}

export interface DonVi {
  id: number;
  maDonVi: string;
  tenDonVi: string;
  laTongCongTy: boolean;
}

export interface BoChiTieu {
  id: number;
  rootID: number;
  tenDanhMuc: string;
  isChecked: boolean;
  children: [];
}

export type Series = {
  name: string;
  color: string;
  yValues: number[];
};

export type IDK = {
  name: string;
  xValues: string;
  yValues: number;
};

export type Input = {
  type: string;
  title: string;
  xValues: string[];
  series: Series[];
};

export type Output = {
  type: string;
  title: string;
  color: string[];
  data: IDK[];
  legend: object | boolean;
  tooltip: object;
};

export interface ChartData {
  type: string;
  title: string;
  xValues: [];
  series: [];
}

export interface PeriodsData {
  pName: string
  pValue: number
  pPositive: boolean
  pRate: string
}

export interface DataChiTietGiaiQuyet {
  tenChiTieu: string
  giaTriThucHien: string
  luyKe: string
}