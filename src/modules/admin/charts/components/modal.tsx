import { Button, Col, Form, Input, Modal, Row, Select, TreeSelect } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { _FALSE, _KHONGCODULIEUSELECT, _MABIEUDOREQUIRED, _NUTCAPNHAT, _NUTDONGLAI, _NUTTAOMOI, _TRUE } from 'constant';
import { _TABLESTRING } from 'constant/chart';
import { useEffect, useRef, useState } from 'react';
// import listChartService from '../services/ListChartService';

const { Option } = Select
const { TreeNode } = TreeSelect

function ModalAction({ groupID, rowKey, boChiTieu, chiTieuLV3, isShowModal, closeModal, createUpdateHandler }) {
  const [keHoach, setKeHoach] = useState(rowKey.giaTriKeHoach)
  const [thucTe, setThucTe] = useState(rowKey.giaTriThucTe)
  const [luyKe, setLuyKe] = useState(rowKey.giaTriLuyKe)
  const [theoNgay, setTheoNgay] = useState(rowKey.bieuDoThongKeTheoNgay)
  const inputRef = useRef<typeof Input>(null);
  const [form] = Form.useForm();

  //thay đổi kế hoạch
  const changeKeHoach = (e: any) => {
    setKeHoach(e.target.checked)
  };

  //thay đổi thực tế
  const changeThucTe = (e: any) => {
    setThucTe(e.target.checked)
  };

  //thay đổi lũy kế
  const changeLuyKe = (e: any) => {
    setLuyKe(e.target.checked)
  };

  //thay đổi theo ngay
  const changeTheoNgay = (e: any) => {
    setTheoNgay(e.target.checked)
  };

  function submitHandler(values: any) {
    const newData = {
      ...values,
      giaTriThucTe: thucTe,
      giaTriLuyKe: luyKe
    }

    if (rowKey.isRow !== undefined) {
      if (rowKey.order !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
          order: parseInt(rowKey.order)
        })
      } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
        })
      } else if (rowKey.align !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
          align: rowKey.align
        })
      } else if (rowKey.showAdditionalTitle !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle)
        })
      } else if (rowKey.unit !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
          unit: rowKey.unit
        })
      } else if (rowKey.showDetails !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
          showDetails: parseInt(rowKey.showDetails)
        })
      } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      } else if (rowKey.index !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
          index: rowKey.index,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow)
        })
      }
    } else if (rowKey.order !== undefined) {
      if (rowKey.isRow !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
          order: parseInt(rowKey.order)
        })
      } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          order: parseInt(rowKey.order),
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
        })
      } else if (rowKey.align !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          order: parseInt(rowKey.order),
          align: rowKey.align,
        })
      } else if (rowKey.showAdditionalTitle !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          order: parseInt(rowKey.order),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle)
        })
      } else if (rowKey.unit !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          order: parseInt(rowKey.order),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit
        })
      } else if (rowKey.showDetails !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          order: parseInt(rowKey.order),
          layout: parseInt(rowKey.layout),
          showDetails: parseInt(rowKey.showDetails)
        })
      } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          order: parseInt(rowKey.order),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      } else if (rowKey.index !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          order: parseInt(rowKey.order),
          index: rowKey.index,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          order: parseInt(rowKey.order)
        })
      }
    } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
      if (rowKey.isRow !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          isRow: parseInt(rowKey.isRow),
        })
      } else if (rowKey.order !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          order: parseInt(rowKey.order),
        })
      } else if (rowKey.align !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          align: rowKey.align
        })
      } else if (rowKey.showAdditionalTitle !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle)
        })
      } else if (rowKey.unit !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit
        })
      } else if (rowKey.showDetails !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          showDetails: parseInt(rowKey.showDetails)
        })
      } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      } else if (rowKey.index !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
          layout: parseInt(rowKey.layout),
        })
      }
    } else if (rowKey.align !== undefined) {
      if (rowKey.isRow !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          isRow: parseInt(rowKey.isRow)
        })
      } else if (rowKey.order !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          order: parseInt(rowKey.order),
        })
      } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
        })
      } else if (rowKey.showAdditionalTitle !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle)
        })
      } else if (rowKey.unit !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          unit: rowKey.unit
        })
      } else if (rowKey.showDetails !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          showDetails: parseInt(rowKey.showDetails)
        })
      } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      } else if (rowKey.index !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          index: rowKey.index,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align
        })
      }
    } else if (rowKey.showAdditionalTitle !== undefined) {
      if (rowKey.isRow !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
          isRow: parseInt(rowKey.isRow)
        })
      } else if (rowKey.order !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
          order: parseInt(rowKey.order),
        })
      } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
        })
      } else if (rowKey.align !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle)
        })
      } else if (rowKey.unit !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          unit: rowKey.unit
        })
      } else if (rowKey.showDetails !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          showDetails: parseInt(rowKey.showDetails)
        })
      } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      } else if (rowKey.index !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
          index: rowKey.index,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
        })
      }
    } else if (rowKey.unit !== undefined) {
      if (rowKey.isRow !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit,
          isRow: parseInt(rowKey.isRow)
        })
      } else if (rowKey.order !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit,
          order: parseInt(rowKey.order),
        })
      } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit,
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
        })
      } else if (rowKey.align !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          unit: rowKey.unit,
        })
      } else if (rowKey.showAdditionalTitle !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
          unit: rowKey.unit
        })
      } else if (rowKey.showDetails !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit,
          showDetails: parseInt(rowKey.showDetails)
        })
      } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit,
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      } else if (rowKey.index !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit,
          index: rowKey.index,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit,
        })
      }
    } else if (rowKey.showDetails !== undefined) {
      if (rowKey.isRow !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showDetails: parseInt(rowKey.unit),
          isRow: parseInt(rowKey.isRow)
        })
      } else if (rowKey.order !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showDetails: parseInt(rowKey.unit),
          order: parseInt(rowKey.order),
        })
      } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showDetails: parseInt(rowKey.unit),
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
        })
      } else if (rowKey.align !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          align: rowKey.align,
          showDetails: parseInt(rowKey.showDetails),
        })
      } else if (rowKey.showAdditionalTitle !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
          showDetails: parseInt(rowKey.unit),
        })
      } else if (rowKey.unit !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          unit: rowKey.unit,
          showDetails: parseInt(rowKey.showDetails)
        })
      } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showDetails: parseInt(rowKey.showDetails),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      } else if (rowKey.index !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showDetails: parseInt(rowKey.showDetails),
          index: rowKey.index,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          showDetails: parseInt(rowKey.showDetails),
        })
      }
    } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
      if (rowKey.isRow !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
          isRow: parseInt(rowKey.isRow)
        })
      } else if (rowKey.order !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
          order: parseInt(rowKey.order),
        })
      } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
        })
      } else if (rowKey.align !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
          align: rowKey.align,
        })
      } else if (rowKey.showAdditionalTitle !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
        })
      } else if (rowKey.unit !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
          unit: rowKey.unit,
        })
      } else if (rowKey.showDetails !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
          showDetails: parseInt(rowKey.showDetails),
        })
      } else if (rowKey.index !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
          index: rowKey.index,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      }
    } else if (rowKey.index !== undefined) {
      if (rowKey.isRow !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
          isRow: parseInt(rowKey.isRow)
        })
      } else if (rowKey.order !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
          order: parseInt(rowKey.order),
        })
      } else if (rowKey.chiTieuIDs !== undefined && rowKey.columns !== undefined && rowKey.title !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
          title: rowKey.title,
          columns: rowKey.columns,
          chiTieuIDs: rowKey.chiTieuIDs,
        })
      } else if (rowKey.align !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
          align: rowKey.align,
        })
      } else if (rowKey.showAdditionalTitle !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
          showAdditionalTitle: parseInt(rowKey.showAdditionalTitle),
        })
      } else if (rowKey.unit !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
          unit: rowKey.unit,
        })
      } else if (rowKey.showDetails !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
          showDetails: parseInt(rowKey.showDetails),
        })
      } else if (rowKey.parentTitle !== undefined && rowKey.duLieuBCStr !== undefined) {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
          parentTitle: rowKey.parentTitle,
          duLieuBCStr: rowKey.duLieuBCStr,
        })
      } else {
        newData.cauHinhBieuDo = JSON.stringify({
          summary: parseInt(values.summary),
          formula: parseInt(rowKey.formula),
          layout: parseInt(rowKey.layout),
          index: rowKey.index,
        })
      }
    } else {
      newData.cauHinhBieuDo = JSON.stringify({
        summary: parseInt(values.summary),
        formula: parseInt(rowKey.formula),
        layout: parseInt(rowKey.layout)
      })
    }

    delete newData.summary

    if (rowKey && rowKey.id) {
      newData.id = rowKey.id;
    }

    createUpdateHandler(newData);
    form.resetFields();

    closeModal();
  }

  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        // eslint-disable-next-line
        item.children.map(chil => {
          if (chil.children) {
            return (
              <TreeNode title={chil.tenDanhMuc} value={chil.id} >
                {renderTreeNodes(chil.children)}
              </TreeNode>
            )
          }
        })
        return (
          <TreeNode title={item.tenDanhMuc} value={item.id} >
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode value={item.id} title={item.tenDanhMuc} {...item} />
    })

  const typeBieuDo = [
    {
      id: 1,
      cauHinhBieuDo: 'Hiển thị thông tin summary'
    },
    {
      id: 2,
      cauHinhBieuDo: 'Không hiển thị thông tin summary'
    }
  ]

  useEffect(() => {
    if (isShowModal) {
      //inputRef.current!.focus();
    }
  }, [isShowModal])

  return (
    <Modal
      title={rowKey && rowKey.id ? "Sửa biểu đồ" : "Tạo mới biểu đồ"}
      visible={isShowModal}
      onCancel={closeModal}
      className="modal-chart"
      footer={[
        <Button key="back" className="button-closed" onClick={closeModal}>
          {_NUTDONGLAI}
        </Button>,
        <Button key="submit" type="default" htmlType="submit" className="button-primary" form="form-list-charts">
          {rowKey.id ? _NUTCAPNHAT : _NUTTAOMOI}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="form-list-charts"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={submitHandler}
        initialValues={{
          ...rowKey,
          summary: rowKey.summary.toString()
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="groupID"
              label="Bộ chỉ tiêu"
            >
              <Select placeholder="Chọn bộ chỉ tiêu" defaultValue={groupID} disabled={true} notFoundContent={_KHONGCODULIEUSELECT}>
                {
                  boChiTieu && boChiTieu.length ?
                    boChiTieu.map(item => (
                      <Option value={item.groupID}>{item.groupName}</Option>
                    ))
                    : null
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="chiTieuID"
              label="Chỉ tiêu"
            >
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Chọn loại chỉ tiêu"
                allowClear
                treeDefaultExpandAll
                disabled={true}
              >
                {renderTreeNodes(chiTieuLV3)}
              </TreeSelect>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="tenBieuDo"
              label="Tên biểu đồ"
              rules={[{ required: _TRUE, message: _MABIEUDOREQUIRED }]}
            >
              {/*<Input placeholder="Nhập tên biểu đồ" ref={inputRef} />*/}
            </Form.Item>
            <Form.Item
              name="summary"
              label="Cấu hình"
            >
              <Select placeholder="Chọn cấu hình biểu đồ"
                defaultValue={rowKey.summary}
                notFoundContent={_KHONGCODULIEUSELECT}
                disabled={rowKey.loaiBieuDo === _TABLESTRING ? _TRUE : _FALSE}
              >
                {
                  typeBieuDo && typeBieuDo.length ?
                    typeBieuDo.map((item) => (
                      <Option value={item.id.toString()}>{item.cauHinhBieuDo}</Option>
                    ))
                    : null
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name="giaTriThucTe"
              className="center mr-70"
            >
              <Checkbox onChange={changeThucTe} checked={thucTe} >Giá trị thực tế</Checkbox>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="giaTriLuyKe"
              className="center"
            >
              <Checkbox onChange={changeLuyKe} checked={luyKe} >Giá trị lũy kế</Checkbox>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name="giaTriKeHoach"
              className="center mr-70"
            >
              <Checkbox onChange={changeKeHoach} checked={keHoach} disabled={true}>Giá trị kế hoạch</Checkbox>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="bieuDoThongKeTheoNgay"
              className="center"
            >
              <Checkbox onChange={changeTheoNgay} checked={theoNgay} disabled={true}>TK theo ngày</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalAction;