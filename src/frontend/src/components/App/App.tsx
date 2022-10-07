import React, {FC, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import '../../common.css'
import Encryption from "../Encryption/Encryption";
import Decryption from "../Decryption/Decryption";
import SwitchHeader from "../SwitchHeader/SwitchHeader";
import BackendEncryptorService from "../../services/backendEncryptorService";
import AppProps from "./AppProps";

const App: FC<AppProps> = ({serverUrl}) => {
    const [encrypt, setEncrypt] = useState(true);
    const [encryptor,] = useState(new BackendEncryptorService(serverUrl));
    return (
        <Layout className={'h-window'}>
            <Content className={'container'}>
                <div style={{
                    margin: '50px'
                }}>
                    <SwitchHeader onSwitch={newState => {
                        setEncrypt(newState === 'text')
                    }} fontSize={100}/>
                </div>
                <div style={{height: '50vh'}}>
                    {encrypt
                        ? <Encryption encryptor={encryptor}/>
                        : <Decryption/>}
                </div>
            </Content>
        </Layout>
    );
};

export default App;
