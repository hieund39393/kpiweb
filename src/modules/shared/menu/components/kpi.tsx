import { Anchor } from 'antd';
const { Link } = Anchor;

const BoChiTieuMenu = (props) => {
    const { href, title } = props;
    const itemClickHandler = (e) => {
        e.preventDefault();
        let pathname = window.location.pathname;
        if (!pathname.includes("dashboard")) {
            const href = "/dashboard#boChiTieuKyThuat";
            window.location.href = href;
        }
    }

    return (
        <>
            <Anchor affix={false} onClick={itemClickHandler} offsetTop={80}>
                <Link href={href} title={title} />
            </Anchor>
        </>
    )
}

export default BoChiTieuMenu;