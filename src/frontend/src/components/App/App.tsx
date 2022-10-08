import React, {FC, useState} from 'react';
import 'antd/dist/antd.min.css';
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import '../../common.css'
import Encryption from "../Encryption/Encryption";
import Decryption from "../Decryption/Decryption";
import Header from "../Header/Header";
import BackendEncryptorService from "../../services/backendEncryptorService";
import AppProps from "./AppProps";
import HalfArrow from "../Header/SwitchArrows/HalfArrow/HalfArrow";

const App: FC<AppProps> = ({serverUrl}) => {
    const [encrypt, setEncrypt] = useState(true);
    const [encryptor,] = useState(new BackendEncryptorService(serverUrl));
    return (
        <Layout className={'h-window'}>
            <Content className={'container'}>
                <div style={{
                    margin: '50px'
                }}>
                    <Header onSwitch={newState => {
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
