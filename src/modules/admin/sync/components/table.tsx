import { useEffect, useMemo, useState } from "react";
import { Button, Space, notification, Table, Tooltip, ConfigProvider } from 'antd';
import { FormOutlined } from "@ant-design/icons";

import {
	_ARGS,
	_KHONGCODULIEU,
	_NOIDUNGSUATHANHCONG,
	_STATUSCODE200,
	_TIEUDESUATHANHCONG,
	_TIEUDESUATHATBAI,
} from "../../../../constant";

import SyncConfigService from "../services/SyncConfigService";
import ModalCauHinh from "./modal";
import { ConfigProps } from '../dtos/responses/ConfigResponse';
import viVN from 'antd/lib/locale/vi_VN';

const syncConfigService = SyncConfigService.instance()

function SynConfigTable() {

	const [data, setData] = useState<ConfigProps[]>([])
	const [rowKey, setRowKey] = useState({})
	const [getField, setGetField] = useState({})
	const [isShowModal, setIsShowModal] = useState(false)

	//fetch cấu hình
	async function fetchCauHinh() {
		const response = await syncConfigService.list();
		if (response.data) setData(response.data.cauHinhs)
		else setData([])
	}

	const columns = [
		{
			title: "Tên cấu hình",
			dataIndex: "tenCauHinh",
			key: "tenCauHinh",
			width: '35%',
			sorter: data && data.length > 0 ? (a, b) => { return a.tenCauHinh.length - b.tenCauHinh.length } : false,
		},
		{
			title: "Mô tả",
			dataIndex: "moTa",
			key: "moTa",
			width: '35%',
			sorter: data && data.length > 0 ? (a, b) => { return a.moTa.length - b.moTa.length } : false,
		},
		{
			title: "Tác vụ",
			key: "action",
			width: '30%',
			render: row => (
				<Space size="middle">
					<Tooltip title="Sửa dữ liệu">
						<Button type="default" className="action-table" icon={<FormOutlined />} onClick={() => showModal(row)} ></Button>
					</Tooltip>
				</Space>
			)
		}
	]

	//xử lý tạo/sửa quyền tài khoản
	async function updateHandler(data) {
		if (data.id) {
			//sửa
			const response = await syncConfigService.update(data);
			if (response.statusCode === _STATUSCODE200) {
				_ARGS.message = _TIEUDESUATHANHCONG
				_ARGS.description = _NOIDUNGSUATHANHCONG
				notification.success(_ARGS)
			} else {
				_ARGS.message = _TIEUDESUATHATBAI
				_ARGS.description = response.message
				notification.error(_ARGS)
			}
		} else {
			_ARGS.message = 'Lỗi'
			_ARGS.description = 'Lỗi'
			notification.error(_ARGS)
		}

		// fetchCauHinh()
	};

	//set hiển thị modal
	async function showModal(data: any) {
		if (data.id) {
			setGetField(data)
			const response = await syncConfigService.get(data.id)
			if (response.data) setRowKey(response.data)
			else setRowKey({})
		} else {
			setGetField({})
			_ARGS.message = 'Lấy dữ liệu thất bại'
			_ARGS.description = 'Không có dữ liệu'
			notification.error(_ARGS)
		}
		setIsShowModal(true);
	};

	//đóng modal
	const closeModal = () => {
		setIsShowModal(false);
	};

	//hiển thị modal quyền tài khoản
	const modal = useMemo(() => (
		isShowModal &&
		<ModalCauHinh
			getField={getField}
			rowKey={rowKey}
			isShowModal={isShowModal}
			closeModal={closeModal}
			updateHandler={updateHandler}
		/>
	), [isShowModal, rowKey, getField])

	useEffect(() => {
		fetchCauHinh();
	}, []);

	return (
		<div className="page-admin page-layout-content" id='page-admin'>
			<div className="page-admin--header">
				<div className="page-admin--header--title">
					<h2>Cấu hình đồng bộ</h2>
				</div>
			</div>
			<div className="page-admin--body">
				<ConfigProvider locale={viVN}>
					<Table
						columns={columns}
						dataSource={data}
						pagination={{ defaultPageSize: 20, showSizeChanger: true }}
						locale={_KHONGCODULIEU}
						className="page--table"
					/>
				</ConfigProvider>
			</div>
			{modal}
		</div>
	)
}

export default SynConfigTable;