import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import '../../common.css'
import Encryption from "../Encryption/Encryption";

function App() {

    return (
        <Layout className={'h-window'}>
            <Content className={'container'} style={{
                height: '50vh'
            }}>
                <Encryption/>
            </Content>
        </Layout>
    );
}

export default App;
