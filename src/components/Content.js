import { Outlet } from "react-router-dom";
import { Layout } from 'antd';

const { Content } = Layout;

function ContentMain() {
    return (
        <Layout>
            <Content style={{padding: "15px"}}>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default ContentMain;