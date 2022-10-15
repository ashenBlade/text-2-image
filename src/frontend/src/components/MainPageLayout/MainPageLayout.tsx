import React, {FC} from 'react';
import {Layout, Menu, Space} from "antd";
import Sider from "antd/es/layout/Sider";
import {MainPageLayoutProps} from "./MainPageLayoutProps";
import {Content} from "antd/es/layout/layout";

const MainPageLayout: FC<MainPageLayoutProps> = (
    {
        actionButtons,
        selectedMenuKeys,
        menuItems,
        children}) => {
    return (
        <Layout>
            <Sider style={{
                backgroundColor: 'white',
                width: 200
            }}>
                <Space direction={'vertical'}
                       style={{
                           display: 'flex',
                           justifyContent: 'center',
                           width: '100%',
                           padding: 10
                       }}>
                    {actionButtons}
                </Space>
                <Menu mode={'inline'}
                      selectedKeys={selectedMenuKeys}
                      items={menuItems}/>
            </Sider>
            <Content style={{
                marginLeft: 10,
                display: 'block',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: 'white'
            }}>
                {children}
            </Content>
        </Layout>
    );
};

export default MainPageLayout;
