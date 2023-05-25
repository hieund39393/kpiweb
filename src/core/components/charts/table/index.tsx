import { Table } from 'antd';

function TableChart(props) {
  const { dataTable } = props;
  return (
    <div className="table-wrap" id="table-dashboard">
      <div className="table-wrap--item">
        <div className="table-wrap--item--content">
          <Table
            columns={dataTable.col}
            dataSource={dataTable.data}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
}

export default TableChart;
