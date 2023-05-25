import { useEffect, useMemo, useState } from "react";
import { Button, Space, notification, Table, Tooltip, ConfigProvider } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";

import {
	_ARGS,
	_FONT,
	_KHONGCODULIEU,
	_NOIDUNGCONFRIM,
	_NOIDUNGSUATHANHCONG,
	_NOIDUNGTAOTHANHCONG,
	_NOIDUNGXOATHANHCONG,
	_NUTDONGY,
	_NUTHUY,
	_PAGEINDEX,
	_PAGESIZE,
	_STATUSCODE200,
	_TIEUDECONFIRM,
	_TIEUDESUATHANHCONG,
	_TIEUDESUATHATBAI,
	_TIEUDETAOTHANHCONG,
	_TIEUDETAOTHATBAI,
	_TIEUDEXOATHANHCONG,
	_TIEUDEXOATHATBAI
} from "constant";

import Confirm from "core/components/modal/confirm";
import ConfigService from "../services/ConfigService";
import ModalCauHinh from "./modal";
import { ConfigProps } from '../dtos/responses/ConfigResponse';
import viVN from 'antd/lib/locale/vi_VN';

const configService = ConfigService.instance()

function BangCauHinhChung() {

	const [data, setData] = useState<ConfigProps[]>([])
	const [rowKey, setRowKey] = useState({})
	const [isShowModal, setIsShowModal] = useState(false)

	//fetch cấu hình
	async function fetchCauHinh() {
		const response = await configService.list({ pageIndex: _PAGEINDEX, pageSize: _PAGESIZE });
		if (response.data) setData(response.data.cauHinhs)
		else setData([])
	}

	const columns = [
		{
			title: "Tên cấu hình",
			dataIndex: "tenCauHinh",
			key: "tenCauHinh",
			width: '20%',
			sorter: data && data.length > 0 ? (a, b) => { return a.tenCauHinh.length - b.tenCauHinh.length } : false,
		},
		{
			title: "Giá trị",
			dataIndex: "giaTri",
			key: "giaTri",
			width: '25%',
			className: 'text-right',
		},
		{
			title: "Mô tả",
			dataIndex: "mota",
			key: "mota",
			width: '35%',
			sorter: data && data.length > 0 ? (a, b) => { return a.mota.length - b.mota.length } : false,
		},
		{
			title: "Tác vụ",
			key: "action",
			width: '20%',
			render: row => {
				if (row.tenCauHinh.toLowerCase().indexOf(_FONT) > -1) {
					return <></>
				} else {
					return (
						<Space size="middle">
							<Tooltip title="Sửa dữ liệu">
								<Button type="default" className="action-table" icon={<FormOutlined />} onClick={() => showModal(row)} ></Button>
							</Tooltip>
							<Tooltip title="Xóa dữ liệu">
								<Button type="default" className="action-table" icon={<DeleteOutlined />} onClick={() => confirmDelete(row.cauHinhID)}></Button>
							</Tooltip>
						</Space>
					)
				}

			}
		}
	]

	//xử lý tạo/sửa quyền tài khoản
	async function createUpdateHandler(data) {
		if (data.cauHinhID) {
			//sửa
			const response = await configService.update(data);
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
			//tạo
			const response = await configService.create(data);
			if (response.statusCode === _STATUSCODE200) {
				_ARGS.message = _TIEUDETAOTHANHCONG
				_ARGS.description = _NOIDUNGTAOTHANHCONG
				notification.success(_ARGS)
			} else {
				_ARGS.message = _TIEUDETAOTHATBAI
				_ARGS.description = response.message
				notification.error(_ARGS)
			}
		}

		fetchCauHinh()
	};

	//set hiển thị modal
	const showModal = (data: any) => {
		if (data.cauHinhID) {
			setRowKey(data)
		} else {
			setRowKey({})
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
			rowKey={rowKey}
			isShowModal={isShowModal}
			closeModal={closeModal}
			createUpdateHandler={createUpdateHandler}
		/>
		// eslint-disable-next-line
	), [isShowModal])

	async function deleteData(cauHinhID: string) {
		const response = await configService.delete(cauHinhID);
		if (response.statusCode === _STATUSCODE200) {
			_ARGS.message = _TIEUDEXOATHANHCONG
			_ARGS.description = _NOIDUNGXOATHANHCONG
			notification.success(_ARGS)
		} else {
			_ARGS.message = _TIEUDEXOATHATBAI
			_ARGS.description = response.message
			notification.error(_ARGS)
		}
		fetchCauHinh()
	}

	//xóa dữ liệu
	function confirmDelete(cauHinhID: string) {
		const textModal = {
			title: _TIEUDECONFIRM,
			icon: <ExclamationCircleOutlined />,
			content: _NOIDUNGCONFRIM,
			okText: _NUTDONGY,
			cancelText: _NUTHUY,
			onOk: () => { deleteData(cauHinhID) },
			onCancel: () => { },
			className: 'modal-confirm'
		};

		Confirm(textModal)
	}

	//tìm kiếm
	// async function filterHandler(value: any) {
	// 	if (value.timKiem === undefined || value.timKiem === '') return fetchCauHinh();
	// 	let response = await configService.search({ data: value.timKiem, pageIndex: _PAGEINDEX, pageSize: _PAGESIZE })
	// 	if (response.statusCode === _STATUSCODE200) {
	// 		_ARGS.message = _TIEUDETIMKIEM
	// 		_ARGS.description = _NOIDUNGTIMKIEMTHANHCONG
	// 		notification.success(_ARGS)
	// 		setData(response.data)
	// 	} else {
	// 		_ARGS.message = _TIEUDETIMKIEM
	// 		_ARGS.description = response.message
	// 		notification.error(_ARGS)
	// 	}
	// };

	useEffect(() => {
		fetchCauHinh();
	}, []);

	return (
		<div className="page-admin page-layout-content" id='page-admin'>
			<div className="page-admin--header">
				<div className="page-admin--header--title">
					<h2>Cấu hình chung</h2>
				</div>
				<div className="page-admin--header--form">
					{/* <Form
						name="filter"
						layout="inline"
						form={form}
						className="filter"
						onFinish={filterHandler}
					>
						<Form.Item
							name="timKiem"
							className="filter-input-value"
							style={{ margin: '0' }}
						>
							<Input placeholder="Tìm theo từ khóa, giá trị" suffix={<SearchOutlined />} allowClear />
						</Form.Item>
					</Form> */}
					<div className="button-flex button-add ml-16">
						<Button className="button-primary" icon={<PlusOutlined />} onClick={() => showModal({})}>
							Tạo mới
						</Button>
					</div>
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

export default BangCauHinhChung;