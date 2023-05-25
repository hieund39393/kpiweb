import { DualAxes } from '@ant-design/charts';

function ManyLineOneColumns(props) {
    const { config, title } = props;

    return (
        <div className="line-box">
            <div className="content-title">{title}</div>
            <DualAxes {...config} />
        </div>
    );
}

export default ManyLineOneColumns;