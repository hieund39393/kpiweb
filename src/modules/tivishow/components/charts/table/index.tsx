import { Table } from 'antd';

function TableChart(props) {
  const { dataTable, length } = props;

  return (
    <div className="content-full-width">
      <div className={`table-wrap--item chart-content ${length === 1 ? 'chart-table' : ''}`}>
        <Table columns={dataTable.col} dataSource={dataTable.data} pagination={false} />
      </div>
    </div>
  );
}

export default TableChart;
